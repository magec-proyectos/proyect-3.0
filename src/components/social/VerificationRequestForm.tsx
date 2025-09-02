import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Crown, 
  Target, 
  CheckCircle, 
  Trophy, 
  Users, 
  TrendingUp,
  Calendar,
  Star,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

interface VerificationRequirements {
  meets_requirements: boolean;
  requirements: {
    min_predictions?: number;
    min_win_rate?: number;
    min_followers?: number;
    min_level?: number;
    min_streak?: number;
    min_reputation?: number;
    account_age_days?: number;
  };
  current_stats: {
    predictions: number;
    win_rate: number;
    followers: number;
    level: number;
    best_streak: number;
    reputation: number;
    account_age_days: number;
  };
}

interface VerificationRequest {
  id: string;
  requested_tier: string;
  reason: string;
  status: string;
  created_at: string;
  admin_notes?: string;
}

const VerificationRequestForm: React.FC = () => {
  const { user } = useAuth();
  const [selectedTier, setSelectedTier] = useState<'verified' | 'expert' | 'legend'>('verified');
  const [reason, setReason] = useState('');
  const [portfolioUrl, setPortfolioUrl] = useState('');
  const [socialLinks, setSocialLinks] = useState('');
  const [requirements, setRequirements] = useState<VerificationRequirements | null>(null);
  const [existingRequest, setExistingRequest] = useState<VerificationRequest | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (user) {
      loadRequirements();
      loadExistingRequest();
    }
  }, [user, selectedTier]);

  const loadRequirements = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .rpc('check_verification_requirements', {
          user_uuid: user.id,
          tier: selectedTier
        });

      if (error) throw error;
      setRequirements(data as unknown as VerificationRequirements);
    } catch (error) {
      console.error('Error loading requirements:', error);
      toast.error('Error al cargar requisitos');
    } finally {
      setLoading(false);
    }
  };

  const loadExistingRequest = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('verification_requests')
        .select('*')
        .eq('user_id', user.id)
        .eq('status', 'pending')
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      setExistingRequest(data);
    } catch (error) {
      console.error('Error loading existing request:', error);
    }
  };

  const handleSubmit = async () => {
    if (!user || !reason.trim()) {
      toast.error('Por favor completa todos los campos requeridos');
      return;
    }

    try {
      setSubmitting(true);
      
      const supportingEvidence = {
        portfolio_url: portfolioUrl,
        social_links: socialLinks.split('\n').filter(link => link.trim()),
        submitted_at: new Date().toISOString()
      };

      const { error } = await supabase
        .from('verification_requests')
        .insert({
          user_id: user.id,
          requested_tier: selectedTier,
          reason: reason.trim(),
          supporting_evidence: supportingEvidence,
          meets_requirements: requirements?.meets_requirements || false,
          requirements_details: requirements || {}
        });

      if (error) throw error;

      toast.success('Solicitud de verificación enviada', {
        description: 'Revisaremos tu solicitud en 3-5 días hábiles'
      });

      // Reload to show the new request
      loadExistingRequest();
      
      // Reset form
      setReason('');
      setPortfolioUrl('');
      setSocialLinks('');
    } catch (error) {
      console.error('Error submitting verification request:', error);
      toast.error('Error al enviar solicitud');
    } finally {
      setSubmitting(false);
    }
  };

  const getTierInfo = (tier: string) => {
    switch (tier) {
      case 'verified':
        return {
          icon: <CheckCircle className="w-6 h-6 text-blue-400" />,
          name: 'Verificado',
          color: 'from-blue-500 to-cyan-500',
          description: 'Usuario verificado con historial comprobado'
        };
      case 'expert':
        return {
          icon: <Target className="w-6 h-6 text-purple-400" />,
          name: 'Experto',
          color: 'from-purple-500 to-pink-500',
          description: 'Analista experto con alto rendimiento'
        };
      case 'legend':
        return {
          icon: <Crown className="w-6 h-6 text-yellow-400" />,
          name: 'Leyenda',
          color: 'from-yellow-500 to-orange-500',
          description: 'Elite de predictores con historial excepcional'
        };
    }
  };

  const getRequirementIcon = (met: boolean) => {
    return met ? (
      <CheckCircle className="w-4 h-4 text-green-400" />
    ) : (
      <AlertCircle className="w-4 h-4 text-red-400" />
    );
  };

  const formatRequirement = (key: string, value: number) => {
    switch (key) {
      case 'min_predictions': return `${value} predicciones mínimas`;
      case 'min_win_rate': return `${value}% win rate mínimo`;
      case 'min_followers': return `${value} seguidores mínimos`;
      case 'min_level': return `Nivel ${value} mínimo`;
      case 'min_streak': return `Racha de ${value} victorias`;
      case 'min_reputation': return `${value} puntos de reputación`;
      case 'account_age_days': return `${value} días de antigüedad`;
      default: return `${key}: ${value}`;
    }
  };

  if (!user) {
    return (
      <Card className="bg-dark-card border-dark-border">
        <CardContent className="p-8 text-center">
          <AlertCircle className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
          <p className="text-gray-400">Inicia sesión para solicitar verificación</p>
        </CardContent>
      </Card>
    );
  }

  if (existingRequest) {
    return (
      <Card className="bg-dark-card border-dark-border">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-400" />
            Solicitud de Verificación Pendiente
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-400">Tier solicitado:</span>
            <Badge className={`bg-gradient-to-r ${getTierInfo(existingRequest.requested_tier)?.color} text-white`}>
              {getTierInfo(existingRequest.requested_tier)?.name}
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-400">Estado:</span>
            <Badge variant="outline" className="border-yellow-500 text-yellow-400">
              Pendiente
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-400">Enviada:</span>
            <span className="text-white">
              {new Date(existingRequest.created_at).toLocaleDateString('es-ES')}
            </span>
          </div>
          <Separator className="bg-dark-border" />
          <div>
            <h4 className="text-white font-medium mb-2">Razón enviada:</h4>
            <p className="text-gray-300 text-sm bg-dark p-3 rounded border border-dark-border">
              {existingRequest.reason}
            </p>
          </div>
          {existingRequest.admin_notes && (
            <div>
              <h4 className="text-white font-medium mb-2">Notas del administrador:</h4>
              <p className="text-gray-300 text-sm bg-dark p-3 rounded border border-dark-border">
                {existingRequest.admin_notes}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Tier Selection */}
      <Card className="bg-dark-card border-dark-border">
        <CardHeader>
          <CardTitle className="text-white">Selecciona el Tier de Verificación</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {(['verified', 'expert', 'legend'] as const).map((tier) => {
              const tierInfo = getTierInfo(tier)!;
              return (
                <motion.div
                  key={tier}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card 
                    className={`cursor-pointer transition-all ${
                      selectedTier === tier 
                        ? 'bg-gradient-to-br ' + tierInfo.color + ' border-transparent' 
                        : 'bg-dark border-dark-border hover:border-gray-600'
                    }`}
                    onClick={() => setSelectedTier(tier)}
                  >
                    <CardContent className="p-4 text-center">
                      <div className="mb-3">{tierInfo.icon}</div>
                      <h3 className={`font-bold mb-2 ${selectedTier === tier ? 'text-white' : 'text-gray-300'}`}>
                        {tierInfo.name}
                      </h3>
                      <p className={`text-sm ${selectedTier === tier ? 'text-gray-100' : 'text-gray-400'}`}>
                        {tierInfo.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Requirements Check */}
      {loading ? (
        <Card className="bg-dark-card border-dark-border">
          <CardContent className="p-8 text-center">
            <Loader2 className="w-8 h-8 animate-spin text-neon-blue mx-auto mb-4" />
            <p className="text-gray-400">Verificando requisitos...</p>
          </CardContent>
        </Card>
      ) : requirements && (
        <Card className="bg-dark-card border-dark-border">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-400" />
              Requisitos para {getTierInfo(selectedTier)?.name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`p-4 rounded-lg mb-4 ${
              requirements.meets_requirements 
                ? 'bg-green-500/10 border border-green-500/20' 
                : 'bg-red-500/10 border border-red-500/20'
            }`}>
              <div className="flex items-center gap-2 mb-2">
                {getRequirementIcon(requirements.meets_requirements)}
                <span className={`font-medium ${
                  requirements.meets_requirements ? 'text-green-400' : 'text-red-400'
                }`}>
                  {requirements.meets_requirements 
                    ? '¡Cumples todos los requisitos!' 
                    : 'No cumples algunos requisitos'
                  }
                </span>
              </div>
              {!requirements.meets_requirements && (
                <p className="text-sm text-gray-400">
                  Puedes enviar una solicitud manual explicando tus méritos especiales.
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(requirements.requirements).map(([key, required]) => {
                const current = requirements.current_stats[key.replace('min_', '') as keyof typeof requirements.current_stats];
                const met = current >= required;
                
                return (
                  <div key={key} className="flex items-center justify-between p-3 bg-dark rounded border border-dark-border">
                    <div className="flex items-center gap-2">
                      {getRequirementIcon(met)}
                      <span className="text-sm text-gray-300">
                        {formatRequirement(key, required)}
                      </span>
                    </div>
                    <span className={`text-sm font-medium ${met ? 'text-green-400' : 'text-red-400'}`}>
                      {current} / {required}
                    </span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Application Form */}
      <Card className="bg-dark-card border-dark-border">
        <CardHeader>
          <CardTitle className="text-white">Solicitud de Verificación</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              ¿Por qué mereces ser verificado como {getTierInfo(selectedTier)?.name}? *
            </label>
            <Textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Explica tu experiencia, logros en predicciones, contribuciones a la comunidad..."
              className="bg-dark border-dark-border text-white min-h-[120px]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Portfolio / Página web (opcional)
            </label>
            <Input
              value={portfolioUrl}
              onChange={(e) => setPortfolioUrl(e.target.value)}
              placeholder="https://tu-portfolio.com"
              className="bg-dark border-dark-border text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Redes sociales / Enlaces adicionales (opcional)
            </label>
            <Textarea
              value={socialLinks}
              onChange={(e) => setSocialLinks(e.target.value)}
              placeholder="Un enlace por línea&#10;https://twitter.com/tu-usuario&#10;https://youtube.com/tu-canal"
              className="bg-dark border-dark-border text-white"
            />
          </div>

          <Separator className="bg-dark-border" />

          <Button
            onClick={handleSubmit}
            disabled={submitting || !reason.trim()}
            className="w-full bg-gradient-to-r from-neon-blue to-blue-600 hover:from-neon-blue/90 hover:to-blue-600/90 text-black font-medium"
          >
            {submitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Enviando solicitud...
              </>
            ) : (
              <>
                <Star className="w-4 h-4 mr-2" />
                Enviar Solicitud de Verificación
              </>
            )}
          </Button>

          <p className="text-xs text-gray-500 text-center">
            Las solicitudes se revisan en 3-5 días hábiles. Recibirás una notificación con el resultado.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default VerificationRequestForm;