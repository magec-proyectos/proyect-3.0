import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  Eye,
  Crown,
  Target,
  Shield,
  User,
  Calendar,
  MessageSquare
} from 'lucide-react';
import { toast } from 'sonner';
import VerificationBadge from '@/components/ui/verification-badge';

interface VerificationRequest {
  id: string;
  user_id: string;
  requested_tier: string;
  reason: string;
  supporting_evidence: any;
  status: string;
  meets_requirements: boolean;
  requirements_details: any;
  created_at: string;
  user_profiles?: {
    display_name: string;
    avatar_url: string;
    win_rate: number;
    total_predictions: number;
    followers_count: number;
    level: number;
  };
}

const AdminVerificationManagement: React.FC = () => {
  const [requests, setRequests] = useState<VerificationRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState<VerificationRequest | null>(null);
  const [adminNotes, setAdminNotes] = useState('');
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('verification_requests')
        .select(`
          *,
          user_profiles!inner(
            display_name,
            avatar_url,
            win_rate,
            total_predictions,
            followers_count,
            level
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRequests((data || []) as unknown as VerificationRequest[]);
    } catch (error) {
      console.error('Error loading verification requests:', error);
      toast.error('Error al cargar solicitudes');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async () => {
    if (!selectedRequest) return;

    try {
      setProcessing(true);
      const { error } = await supabase
        .rpc('approve_verification_request', {
          request_id: selectedRequest.id,
          admin_user_id: (await supabase.auth.getUser()).data.user?.id,
          notes: adminNotes.trim() || null
        });

      if (error) throw error;

      toast.success('Solicitud aprobada exitosamente');
      setSelectedRequest(null);
      setAdminNotes('');
      loadRequests();
    } catch (error) {
      console.error('Error approving request:', error);
      toast.error('Error al aprobar solicitud');
    } finally {
      setProcessing(false);
    }
  };

  const handleReject = async () => {
    if (!selectedRequest || !adminNotes.trim()) {
      toast.error('Debes proporcionar una razón para el rechazo');
      return;
    }

    try {
      setProcessing(true);
      const { error } = await supabase
        .from('verification_requests')
        .update({
          status: 'rejected',
          reviewed_by: (await supabase.auth.getUser()).data.user?.id,
          reviewed_at: new Date().toISOString(),
          admin_notes: adminNotes.trim()
        })
        .eq('id', selectedRequest.id);

      if (error) throw error;

      toast.success('Solicitud rechazada');
      setSelectedRequest(null);
      setAdminNotes('');
      loadRequests();
    } catch (error) {
      console.error('Error rejecting request:', error);
      toast.error('Error al rechazar solicitud');
    } finally {
      setProcessing(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="border-yellow-500 text-yellow-400"><Clock className="w-3 h-3 mr-1" />Pendiente</Badge>;
      case 'approved':
        return <Badge variant="outline" className="border-green-500 text-green-400"><CheckCircle className="w-3 h-3 mr-1" />Aprobada</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="border-red-500 text-red-400"><XCircle className="w-3 h-3 mr-1" />Rechazada</Badge>;
      case 'under_review':
        return <Badge variant="outline" className="border-blue-500 text-blue-400"><Eye className="w-3 h-3 mr-1" />En Revisión</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const pendingRequests = requests.filter(r => r.status === 'pending');
  const reviewedRequests = requests.filter(r => r.status !== 'pending');

  return (
    <div className="space-y-6">
      <Card className="bg-dark-card border-dark-border">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Shield className="w-5 h-5 text-blue-400" />
            Gestión de Verificaciones
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-dark p-4 rounded border border-dark-border text-center">
              <div className="text-2xl font-bold text-yellow-400 mb-1">
                {pendingRequests.length}
              </div>
              <div className="text-sm text-gray-400">Pendientes</div>
            </div>
            <div className="bg-dark p-4 rounded border border-dark-border text-center">
              <div className="text-2xl font-bold text-green-400 mb-1">
                {reviewedRequests.filter(r => r.status === 'approved').length}
              </div>
              <div className="text-sm text-gray-400">Aprobadas</div>
            </div>
            <div className="bg-dark p-4 rounded border border-dark-border text-center">
              <div className="text-2xl font-bold text-red-400 mb-1">
                {reviewedRequests.filter(r => r.status === 'rejected').length}
              </div>
              <div className="text-sm text-gray-400">Rechazadas</div>
            </div>
          </div>

          <Tabs defaultValue="pending" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-dark-card border border-dark-border">
              <TabsTrigger value="pending" className="data-[state=active]:bg-neon-blue data-[state=active]:text-black">
                Pendientes ({pendingRequests.length})
              </TabsTrigger>
              <TabsTrigger value="reviewed" className="data-[state=active]:bg-neon-blue data-[state=active]:text-black">
                Revisadas ({reviewedRequests.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="pending" className="mt-6">
              <div className="space-y-4">
                {pendingRequests.length === 0 ? (
                  <div className="text-center text-gray-400 py-8">
                    <Clock className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No hay solicitudes pendientes</p>
                  </div>
                ) : (
                  pendingRequests.map((request) => (
                    <Card key={request.id} className="bg-dark border-dark-border">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <Avatar className="w-12 h-12">
                              <AvatarImage src={request.user_profiles?.avatar_url} />
                              <AvatarFallback>
                                <User className="w-6 h-6" />
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="text-white font-medium">
                                {request.user_profiles?.display_name || 'Usuario'}
                              </h3>
                              <div className="flex items-center gap-2 mt-1">
                                <VerificationBadge tier={request.requested_tier} size="sm" />
                                {getStatusBadge(request.status)}
                              </div>
                            </div>
                          </div>
                          <div className="text-right text-sm text-gray-400">
                            <div className="flex items-center gap-1 mb-1">
                              <Calendar className="w-3 h-3" />
                              {formatDate(request.created_at)}
                            </div>
                            <div className={`text-xs px-2 py-1 rounded ${
                              request.meets_requirements 
                                ? 'bg-green-500/10 text-green-400' 
                                : 'bg-red-500/10 text-red-400'
                            }`}>
                              {request.meets_requirements ? 'Cumple requisitos' : 'No cumple requisitos'}
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                          <div className="text-center">
                            <div className="text-white font-medium">{request.user_profiles?.win_rate.toFixed(1)}%</div>
                            <div className="text-gray-400">Win Rate</div>
                          </div>
                          <div className="text-center">
                            <div className="text-white font-medium">{request.user_profiles?.total_predictions}</div>
                            <div className="text-gray-400">Predicciones</div>
                          </div>
                          <div className="text-center">
                            <div className="text-white font-medium">{request.user_profiles?.followers_count}</div>
                            <div className="text-gray-400">Seguidores</div>
                          </div>
                          <div className="text-center">
                            <div className="text-white font-medium">{request.user_profiles?.level}</div>
                            <div className="text-gray-400">Nivel</div>
                          </div>
                        </div>

                        <div className="bg-dark p-3 rounded border border-dark-border mb-4">
                          <h4 className="text-white font-medium mb-2 flex items-center gap-2">
                            <MessageSquare className="w-4 h-4" />
                            Razón de la solicitud:
                          </h4>
                          <p className="text-gray-300 text-sm">{request.reason}</p>
                        </div>

                        <div className="flex gap-2">
                          <Button
                            onClick={() => setSelectedRequest(request)}
                            variant="outline"
                            size="sm"
                            className="border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white"
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            Revisar
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>

            <TabsContent value="reviewed" className="mt-6">
              <div className="space-y-4">
                {reviewedRequests.length === 0 ? (
                  <div className="text-center text-gray-400 py-8">
                    <CheckCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No hay solicitudes revisadas</p>
                  </div>
                ) : (
                  reviewedRequests.map((request) => (
                    <Card key={request.id} className="bg-dark border-dark-border">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Avatar className="w-10 h-10">
                              <AvatarImage src={request.user_profiles?.avatar_url} />
                              <AvatarFallback>
                                <User className="w-5 h-5" />
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="text-white font-medium">
                                {request.user_profiles?.display_name || 'Usuario'}
                              </h3>
                              <div className="flex items-center gap-2 mt-1">
                                <VerificationBadge tier={request.requested_tier} size="sm" />
                                {getStatusBadge(request.status)}
                              </div>
                            </div>
                          </div>
                          <div className="text-right text-sm text-gray-400">
                            {formatDate(request.created_at)}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Review Modal */}
      {selectedRequest && (
        <Card className="bg-dark-card border-dark-border">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Eye className="w-5 h-5 text-blue-400" />
              Revisar Solicitud de Verificación
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-4">
              <Avatar className="w-16 h-16">
                <AvatarImage src={selectedRequest.user_profiles?.avatar_url} />
                <AvatarFallback>
                  <User className="w-8 h-8" />
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-white text-xl font-bold">
                  {selectedRequest.user_profiles?.display_name || 'Usuario'}
                </h3>
                <div className="flex items-center gap-2 mt-2">
                  <VerificationBadge tier={selectedRequest.requested_tier} />
                  <Badge className={`${
                    selectedRequest.meets_requirements 
                      ? 'bg-green-500/10 text-green-400 border-green-500/20' 
                      : 'bg-red-500/10 text-red-400 border-red-500/20'
                  }`}>
                    {selectedRequest.meets_requirements ? 'Cumple requisitos' : 'No cumple requisitos'}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="bg-dark p-4 rounded border border-dark-border">
              <h4 className="text-white font-medium mb-3">Razón de la solicitud:</h4>
              <p className="text-gray-300">{selectedRequest.reason}</p>
            </div>

            {selectedRequest.supporting_evidence && (
              <div className="bg-dark p-4 rounded border border-dark-border">
                <h4 className="text-white font-medium mb-3">Evidencia de apoyo:</h4>
                {selectedRequest.supporting_evidence.portfolio_url && (
                  <div className="mb-2">
                    <span className="text-gray-400">Portfolio: </span>
                    <a 
                      href={selectedRequest.supporting_evidence.portfolio_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-neon-blue hover:underline"
                    >
                      {selectedRequest.supporting_evidence.portfolio_url}
                    </a>
                  </div>
                )}
                {selectedRequest.supporting_evidence.social_links && selectedRequest.supporting_evidence.social_links.length > 0 && (
                  <div>
                    <span className="text-gray-400">Redes sociales:</span>
                    <ul className="mt-1">
                      {selectedRequest.supporting_evidence.social_links.map((link: string, index: number) => (
                        <li key={index}>
                          <a 
                            href={link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-neon-blue hover:underline text-sm"
                          >
                            {link}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Notas del administrador:
              </label>
              <Textarea
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                placeholder="Escribe notas sobre esta solicitud..."
                className="bg-dark border-dark-border text-white"
              />
            </div>

            <div className="flex gap-3">
              <Button
                onClick={handleApprove}
                disabled={processing}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Aprobar
              </Button>
              <Button
                onClick={handleReject}
                disabled={processing || !adminNotes.trim()}
                variant="destructive"
                className="flex-1"
              >
                <XCircle className="w-4 h-4 mr-2" />
                Rechazar
              </Button>
              <Button
                onClick={() => {
                  setSelectedRequest(null);
                  setAdminNotes('');
                }}
                variant="outline"
                className="border-gray-600 text-gray-300"
              >
                Cancelar
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AdminVerificationManagement;