
import React from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FilterPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-4 glass-effect rounded-xl border border-dark-border shadow-2xl overflow-hidden"
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold gradient-text">Filtros avanzados</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="text-gray-400 hover:text-white"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Competición</label>
                <select className="w-full p-2 bg-dark-lighter border border-dark-border rounded-lg focus:ring-2 focus:ring-neon-blue focus:border-neon-blue text-white">
                  <option>Todas las competiciones</option>
                  <option>Champions League</option>
                  <option>La Liga</option>
                  <option>Premier League</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Fecha</label>
                <select className="w-full p-2 bg-dark-lighter border border-dark-border rounded-lg focus:ring-2 focus:ring-neon-blue focus:border-neon-blue text-white">
                  <option>Cualquier fecha</option>
                  <option>Hoy</option>
                  <option>Mañana</option>
                  <option>Esta semana</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Tipo de apuesta</label>
                <select className="w-full p-2 bg-dark-lighter border border-dark-border rounded-lg focus:ring-2 focus:ring-neon-blue focus:border-neon-blue text-white">
                  <option>Todos los tipos</option>
                  <option>1X2</option>
                  <option>Más/Menos goles</option>
                  <option>Ambos equipos marcan</option>
                </select>
              </div>
            </div>
            
            <div className="mt-4 flex justify-end gap-2">
              <Button variant="outline" onClick={onClose} className="border-dark-border text-gray-300 hover:bg-dark-lighter">
                Cancelar
              </Button>
              <Button className="bg-neon-blue hover:bg-neon-blue/80 text-black font-bold">
                Aplicar filtros
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FilterPanel;
