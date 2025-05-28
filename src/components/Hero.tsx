
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, TrendingUp, Shield, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { EnhancedTooltip } from '@/components/ui/tooltip-enhanced';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-dark via-dark-lighter to-dark">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('/pattern-football.svg')] bg-repeat opacity-20"></div>
      </div>
      
      <div className="container px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
            data-onboarding="hero-title"
          >
            <span className="gradient-text">Bet3.0</span>
            <br />
            <span className="text-white">AI-Powered Predictions</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Toma decisiones inteligentes con nuestras predicciones deportivas y estrategias de casino potenciadas por inteligencia artificial.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <EnhancedTooltip
              content="Accede a predicciones en tiempo real para múltiples deportes"
              variant="tip"
              showIcon
            >
              <Button asChild size="lg" className="bg-soft-blue hover:bg-soft-blue/90 text-white px-8">
                <Link to="/sports">
                  Explorar Deportes
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </EnhancedTooltip>
            
            <EnhancedTooltip
              content="Estrategias avanzadas para blackjack y ruleta"
              variant="info"
              showIcon
            >
              <Button asChild variant="outline" size="lg" className="border-soft-blue text-soft-blue hover:bg-soft-blue hover:text-white px-8">
                <Link to="/casino">
                  Casino IA
                </Link>
              </Button>
            </EnhancedTooltip>
          </div>
          
          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            <div className="text-center p-6 rounded-lg bg-dark-lighter/50 border border-dark-border">
              <TrendingUp className="w-8 h-8 text-soft-blue mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Predicciones IA</h3>
              <p className="text-gray-400 text-sm">Algoritmos avanzados analizan millones de datos en tiempo real</p>
            </div>
            
            <div className="text-center p-6 rounded-lg bg-dark-lighter/50 border border-dark-border">
              <Shield className="w-8 h-8 text-soft-blue mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Seguro & Confiable</h3>
              <p className="text-gray-400 text-sm">Datos verificados y algoritmos transparentes</p>
            </div>
            
            <div 
              className="text-center p-6 rounded-lg bg-dark-lighter/50 border border-dark-border"
              data-onboarding="social-section"
            >
              <Users className="w-8 h-8 text-soft-blue mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Comunidad</h3>
              <p className="text-gray-400 text-sm">Únete a miles de usuarios exitosos</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-soft-blue/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-purple-500/20 rounded-full blur-xl animate-pulse delay-1000"></div>
    </section>
  );
};

export default Hero;
