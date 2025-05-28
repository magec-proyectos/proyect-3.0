
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, TrendingUp, BarChart3, Target, Sparkles } from 'lucide-react';
import { PremiumButton } from '@/components/ui/premium-button';
import { PremiumCard, PremiumStatCard } from '@/components/ui/premium-card';

const Hero = () => {
  const backgroundPattern = "data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E";

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.8,
        ease: "easeOut"
      }
    })
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      rotate: [-1, 1, -1],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      {/* Fondo con patrón mejorado */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{ backgroundImage: `url("${backgroundPattern}")` }}
      />
      
      {/* Gradiente de overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background/40" />
      
      {/* Elementos flotantes decorativos */}
      <motion.div 
        className="absolute top-20 left-10 w-40 h-40 glass-card rounded-full opacity-30"
        variants={floatingVariants}
        animate="animate"
      />
      <motion.div 
        className="absolute bottom-20 right-10 w-56 h-56 glass-card rounded-full opacity-20"
        variants={floatingVariants}
        animate="animate"
        style={{ animationDelay: '2s' }}
      />
      
      {/* Efectos de luz de fondo */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse-premium" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl animate-pulse-premium" style={{ animationDelay: '3s' }} />
      
      <div className="relative container mx-auto px-6 py-20 md:py-28">
        <motion.div 
          initial="hidden"
          animate="visible"
          className="text-center max-w-6xl mx-auto space-y-12"
        >
          
          {/* Badge premium */}
          <motion.div 
            className="flex justify-center"
            custom={0}
            variants={fadeInUp}
          >
            <div className="glass-button px-6 py-3 rounded-full flex items-center gap-3 border border-white/20">
              <Sparkles className="h-5 w-5 text-blue-400" />
              <span className="text-sm font-semibold text-white uppercase tracking-wider">
                IA Revolucionaria
              </span>
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            </div>
          </motion.div>
          
          {/* Título principal mejorado */}
          <motion.div 
            custom={1}
            variants={fadeInUp}
            className="space-y-6"
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight">
              <span className="text-white">Apuestas</span>
              <br />
              <span className="gradient-text-premium">Inteligentes</span>
              <br />
              <span className="text-white">con IA</span>
            </h1>
            
            <motion.div 
              className="w-32 h-1 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full mx-auto"
              initial={{ width: 0 }}
              animate={{ width: 128 }}
              transition={{ delay: 1.5, duration: 1 }}
            />
          </motion.div>
          
          {/* Subtítulo mejorado */}
          <motion.p 
            custom={2}
            variants={fadeInUp}
            className="text-xl md:text-2xl text-white/80 max-w-4xl mx-auto leading-relaxed text-pretty"
          >
            Maximiza tus ganancias con predicciones impulsadas por IA. 
            <span className="text-emerald-400 font-semibold"> 20+ ligas</span>, 
            <span className="text-blue-400 font-semibold"> análisis en tiempo real</span>, 
            y estrategias ganadoras.
          </motion.p>
          
          {/* Botones de acción premium */}
          <motion.div 
            custom={3}
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <PremiumButton 
              size="xl" 
              variant="premium"
              animation="glow"
              icon={<Target className="h-6 w-6" />}
              className="text-lg font-bold shadow-2xl"
            >
              Ver Predicciones Hoy
            </PremiumButton>
            
            <PremiumButton 
              variant="glass" 
              size="xl" 
              icon={<BarChart3 className="h-6 w-6" />}
              iconPosition="right"
              className="text-lg"
            >
              Explorar Análisis
            </PremiumButton>
          </motion.div>
          
          {/* Stats cards mejoradas */}
          <motion.div 
            custom={4}
            variants={fadeInUp}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
          >
            <PremiumStatCard
              title="Ligas"
              value="20+"
              description="Cobertura global"
              icon={<BarChart3 className="h-5 w-5" />}
              color="blue"
              trend="up"
              trendValue="5+ nuevas"
            />
            
            <PremiumStatCard
              title="Precisión"
              value="87%"
              description="IA avanzada"
              icon={<Target className="h-5 w-5" />}
              color="emerald"
              trend="up"
              trendValue="+3%"
            />
            
            <PremiumStatCard
              title="Cuotas"
              value="En Vivo"
              description="Tiempo real"
              icon={<Zap className="h-5 w-5" />}
              color="amber"
              trend="neutral"
              trendValue="24/7"
            />
            
            <PremiumStatCard
              title="Análisis"
              value="Real-time"
              description="IA continua"
              icon={<TrendingUp className="h-5 w-5" />}
              color="purple"
              trend="up"
              trendValue="100%"
            />
          </motion.div>
          
          {/* CTA secundario */}
          <motion.div 
            custom={5}
            variants={fadeInUp}
            className="pt-12"
          >
            <PremiumCard variant="glass" className="max-w-2xl mx-auto">
              <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
                <div className="flex-1 space-y-3">
                  <h3 className="text-2xl font-bold text-white">
                    ¿Listo para ganar más?
                  </h3>
                  <p className="text-white/70">
                    Únete a miles de apostadores que ya están ganando con nuestra IA
                  </p>
                </div>
                <PremiumButton 
                  variant="secondary"
                  size="lg"
                  icon={<ArrowRight className="h-5 w-5" />}
                  iconPosition="right"
                  animation="shimmer"
                >
                  Comenzar Gratis
                </PremiumButton>
              </div>
            </PremiumCard>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full p-1">
          <motion.div 
            className="w-1 h-3 bg-white/60 rounded-full mx-auto"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;
