
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { X, Calculator, Trash2, Plus, TrendingUp, Download, Copy, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

interface BetSlipItem {
  id: string;
  match: string;
  bet: string;
  odds: number;
  stake?: number;
}

const ImprovedBetBuilder = () => {
  const [betSlip, setBetSlip] = useState<BetSlipItem[]>([
    {
      id: '1',
      match: 'Al Fateh - Al Nassr Riyadh',
      bet: 'Draw Result',
      odds: 6.00
    }
  ]);
  const [totalStake, setTotalStake] = useState(5);
  const [betType, setBetType] = useState<'single' | 'combinada' | 'sistema'>('single');
  const { toast } = useToast();

  const removeBet = (id: string) => {
    setBetSlip(prev => prev.filter(bet => bet.id !== id));
  };

  const calculateTotalOdds = () => {
    return betSlip.reduce((total, bet) => total * bet.odds, 1);
  };

  const calculatePotentialReturn = () => {
    if (betType === 'combinada') {
      return totalStake * calculateTotalOdds();
    }
    return betSlip.reduce((total, bet) => total + (totalStake * bet.odds), 0);
  };

  const exportToClipboard = async () => {
    const betString = betSlip.map(bet => 
      `${bet.match}: ${bet.bet} @ ${bet.odds}`
    ).join('\n');
    
    const exportText = `
🎯 Mi Apuesta ${betType === 'combinada' ? 'Combinada' : betType === 'sistema' ? 'Sistema' : 'Simple'}

${betString}

💰 Stake Total: €${totalStake}
📊 Cuota Total: ${calculateTotalOdds().toFixed(2)}
🎯 Retorno Potencial: €${calculatePotentialReturn().toFixed(2)}
📈 Ganancia: €${(calculatePotentialReturn() - totalStake).toFixed(2)}
`;

    try {
      await navigator.clipboard.writeText(exportText);
      toast({
        title: "Apuesta copiada",
        description: "La apuesta se ha copiado al portapapeles",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo copiar la apuesta",
        variant: "destructive",
      });
    }
  };

  const exportToBetfair = () => {
    // En una implementación real, esto abriría Betfair con las selecciones
    const url = 'https://www.betfair.com/sport';
    window.open(url, '_blank');
    toast({
      title: "Exportando a Betfair",
      description: "Se abrió Betfair en una nueva pestaña",
    });
  };

  const exportToBet365 = () => {
    // En una implementación real, esto abriría Bet365 con las selecciones
    const url = 'https://www.bet365.com';
    window.open(url, '_blank');
    toast({
      title: "Exportando a Bet365",
      description: "Se abrió Bet365 en una nueva pestaña",
    });
  };

  const exportToCSV = () => {
    const headers = ['Partido', 'Apuesta', 'Cuota', 'Tipo'];
    const csvContent = [
      headers.join(','),
      ...betSlip.map(bet => `"${bet.match}","${bet.bet}",${bet.odds},"${betType}"`),
      '',
      `"Total Stake","","${totalStake}",""`,
      `"Cuota Total","","${calculateTotalOdds().toFixed(2)}",""`,
      `"Retorno Potencial","","${calculatePotentialReturn().toFixed(2)}",""`
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `apuesta_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);

    toast({
      title: "CSV descargado",
      description: "La apuesta se ha exportado como archivo CSV",
    });
  };

  const stakeButtons = [2, 5, 10, 20, 'ALL-IN'];

  return (
    <Card className="bg-dark-card/95 backdrop-blur-sm border-dark-border shadow-2xl shadow-neon-blue/5 h-full">
      <CardHeader className="border-b border-dark-border/50 bg-gradient-to-r from-dark-card to-dark-lighter">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-neon-blue/10 rounded-lg">
              <Calculator className="h-4 w-4 text-neon-blue" />
            </div>
            <div>
              <CardTitle className="text-lg gradient-text">Bet Builder</CardTitle>
              <p className="text-xs text-gray-400 mt-1">
                {betSlip.length} selection{betSlip.length !== 1 ? 's' : ''}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setBetSlip([])}
            className="text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        {/* Bet Type Selection */}
        <div className="p-4 border-b border-dark-border/50">
          <div className="grid grid-cols-3 gap-1 bg-dark-darker/50 rounded-lg p-1 backdrop-blur-sm">
            {(['single', 'combinada', 'sistema'] as const).map((type) => (
              <Button
                key={type}
                variant={betType === type ? 'default' : 'ghost'}
                onClick={() => setBetType(type)}
                className={`text-xs py-2 transition-all duration-200 ${
                  betType === type 
                    ? 'bg-gradient-to-r from-neon-blue to-neon-lime text-black font-bold shadow-lg' 
                    : 'bg-transparent hover:bg-dark-card text-gray-300 hover:text-white'
                }`}
              >
                {type === 'single' && 'Single (1)'}
                {type === 'combinada' && 'Combo'}
                {type === 'sistema' && 'System'}
              </Button>
            ))}
          </div>
        </div>

        {/* Bet Slip Items */}
        <div className="p-4 border-b border-dark-border/50 max-h-64 overflow-y-auto">
          <AnimatePresence>
            {betSlip.map((bet, index) => (
              <motion.div
                key={bet.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ delay: index * 0.1 }}
                className="relative bg-gradient-to-r from-neon-lime/5 to-neon-blue/5 rounded-lg p-4 border border-neon-lime/20 hover:border-neon-lime/40 transition-all duration-300 mb-3 last:mb-0 group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-neon-lime/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
                
                <div className="relative flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-neon-lime mb-2 font-medium">
                      {bet.match}
                    </div>
                    <div className="text-sm font-medium text-white mb-2">
                      {bet.bet}
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="border-neon-lime/30 text-neon-lime bg-neon-lime/10">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        {bet.odds.toFixed(2)}
                      </Badge>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeBet(bet.id)}
                    className="text-neon-lime hover:text-red-400 hover:bg-red-500/10 p-1 transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {betSlip.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12 text-gray-500"
            >
              <div className="p-4 bg-dark-lighter/50 rounded-lg border border-dashed border-gray-600">
                <Plus className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                <div className="text-sm font-medium mb-1">No selections yet</div>
                <div className="text-xs text-gray-600">Add bets from matches to get started</div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Stake Section */}
        {betSlip.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4"
          >
            {/* Stake Amount */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-300">Stake Amount</span>
                <div className="flex items-center gap-1">
                  <span className="text-sm text-neon-blue font-medium">EUR</span>
                  <span className="text-xs text-gray-500">(€)</span>
                </div>
              </div>
              <Input
                type="number"
                value={totalStake}
                onChange={(e) => setTotalStake(Number(e.target.value))}
                className="text-center font-bold text-xl border-dark-border bg-dark-darker/50 text-white focus:border-neon-blue focus:ring-1 focus:ring-neon-blue/20 transition-all"
                min="1"
                step="0.01"
              />
            </div>

            {/* Quick Stake Buttons */}
            <div className="grid grid-cols-5 gap-2 mb-6">
              {stakeButtons.map((amount, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => typeof amount === 'number' && setTotalStake(amount)}
                  className="text-xs py-2 border-dark-border/50 hover:bg-dark-lighter hover:border-neon-blue/50 text-gray-300 hover:text-white transition-all duration-200"
                >
                  {amount === 'ALL-IN' ? 'ALL' : `${amount}€`}
                </Button>
              ))}
            </div>

            {/* Potential Winnings */}
            <div className="bg-gradient-to-r from-dark-darker/80 to-dark-card/80 rounded-lg p-4 mb-6 border border-dark-border/50 backdrop-blur-sm">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-400">Total Odds:</span>
                <span className="font-bold text-neon-lime">
                  {calculateTotalOdds().toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300 font-medium">Potential Return</span>
                <div className="text-right">
                  <div className="text-2xl font-bold gradient-text">
                    {calculatePotentialReturn().toFixed(2)}€
                  </div>
                  <div className="text-xs text-green-400">
                    +{(calculatePotentialReturn() - totalStake).toFixed(2)}€ profit
                  </div>
                </div>
              </div>
            </div>

            {/* Export Options */}
            <div className="mb-6 p-4 bg-dark-darker/50 rounded-lg border border-dark-border/30">
              <h4 className="text-sm font-medium text-gray-300 mb-3 flex items-center gap-2">
                <Download className="h-4 w-4 text-neon-blue" />
                Exportar Apuesta
              </h4>
              
              <div className="grid grid-cols-2 gap-2 mb-3">
                <Button
                  onClick={exportToBetfair}
                  variant="outline"
                  size="sm"
                  className="text-xs border-yellow-600/30 text-yellow-400 hover:bg-yellow-600/10"
                >
                  <ExternalLink className="h-3 w-3 mr-1" />
                  Betfair
                </Button>
                
                <Button
                  onClick={exportToBet365}
                  variant="outline"
                  size="sm"
                  className="text-xs border-green-600/30 text-green-400 hover:bg-green-600/10"
                >
                  <ExternalLink className="h-3 w-3 mr-1" />
                  Bet365
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <Button
                  onClick={exportToClipboard}
                  variant="outline"
                  size="sm"
                  className="text-xs border-neon-blue/30 text-neon-blue hover:bg-neon-blue/10"
                >
                  <Copy className="h-3 w-3 mr-1" />
                  Copiar
                </Button>
                
                <Button
                  onClick={exportToCSV}
                  variant="outline"
                  size="sm"
                  className="text-xs border-neon-lime/30 text-neon-lime hover:bg-neon-lime/10"
                >
                  <Download className="h-3 w-3 mr-1" />
                  CSV
                </Button>
              </div>
            </div>

            {/* Place Bet Button */}
            <Button className="w-full bg-gradient-to-r from-neon-blue via-neon-lime to-neon-blue hover:from-neon-blue/80 hover:via-neon-lime/80 hover:to-neon-blue/80 text-black font-bold py-4 text-base rounded-lg shadow-xl shadow-neon-blue/25 hover:shadow-neon-lime/25 transition-all duration-300 relative overflow-hidden group">
              <span className="relative z-10">Login and Bet</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </Button>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
};

export default ImprovedBetBuilder;
