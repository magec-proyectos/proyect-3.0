
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';

const TipItem = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="mb-4"
  >
    <h4 className="text-md font-medium text-neon-blue mb-1">{title}</h4>
    <div className="text-sm text-gray-300">{children}</div>
  </motion.div>
);

const BlackjackTips = () => {
  return (
    <Card className="bg-dark-card border-dark-border">
      <CardHeader>
        <CardTitle>Blackjack Strategy & Tips</CardTitle>
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue="basic">
          <TabsList className="mb-6">
            <TabsTrigger value="basic">Basic Strategy</TabsTrigger>
            <TabsTrigger value="advanced">Advanced Tips</TabsTrigger>
            <TabsTrigger value="etiquette">Table Etiquette</TabsTrigger>
          </TabsList>
          
          <TabsContent value="basic">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <TipItem title="Core Strategy Rules">
                  <ul className="space-y-2">
                    <li>• Always hit on hard 8 or less</li>
                    <li>• Always stand on hard 17 or more</li>
                    <li>• Double down on 11 when dealer has 10 or less</li>
                    <li>• Double down on 10 when dealer has 9 or less</li>
                    <li>• Split Aces and 8s</li>
                    <li>• Never split 10s, 5s, or 4s</li>
                    <li>• Always hit soft 17 or less</li>
                    <li>• Always stand on soft 19 or more</li>
                  </ul>
                </TipItem>
                
                <TipItem title="Understanding Hand Values">
                  <ul className="space-y-2">
                    <li>• Hard hands contain no Ace or an Ace counted as 1</li>
                    <li>• Soft hands contain an Ace counted as 11</li>
                    <li>• Face cards (J, Q, K) count as 10</li>
                    <li>• Aces count as either 1 or 11, whichever is better</li>
                    <li>• Blackjack is 21 with exactly two cards (A + 10/face)</li>
                  </ul>
                </TipItem>
              </div>
              
              <div className="space-y-6">
                <TipItem title="Dealer Rules to Remember">
                  <ul className="space-y-2">
                    <li>• Dealer must hit on 16 or less</li>
                    <li>• Dealer must stand on 17 or more</li>
                    <li>• In some casinos, dealer hits soft 17</li>
                    <li>• Dealer has no choices - they follow fixed rules</li>
                    <li>• Dealer doesn't split pairs or double down</li>
                  </ul>
                </TipItem>
                
                <TipItem title="Common Mistakes to Avoid">
                  <ul className="space-y-2">
                    <li>• Never take insurance (long-term losing bet)</li>
                    <li>• Don't base decisions on other players' hands</li>
                    <li>• Don't play tables with 6:5 blackjack payouts</li>
                    <li>• Don't stand on 12-16 against dealer's high cards</li>
                    <li>• Don't split 10s just because it's a pair</li>
                  </ul>
                </TipItem>
              </div>
            </div>
            
            <div className="mt-8 p-4 bg-dark-lighter rounded-lg">
              <p className="text-sm text-gray-400">
                <strong className="text-white">Pro Tip:</strong> Memorize the basic strategy chart to reduce the house edge to as low as 0.5%. This simple step can significantly improve your chances of winning.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="advanced">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <TipItem title="Card Counting Basics">
                  <ul className="space-y-2">
                    <li>• Hi-Lo system: +1 for 2-6, 0 for 7-9, -1 for 10-A</li>
                    <li>• True count = Running count ÷ Decks remaining</li>
                    <li>• Increase bets when true count is positive</li>
                    <li>• Adjust strategy based on true count</li>
                    <li>• Practice counting at home before trying in casino</li>
                  </ul>
                </TipItem>
                
                <TipItem title="Bankroll Management">
                  <ul className="space-y-2">
                    <li>• Set a loss limit before playing</li>
                    <li>• Base bet should be 1/100th of your bankroll</li>
                    <li>• Take profits when ahead by 50%</li>
                    <li>• Never chase losses</li>
                    <li>• Consider win goals for each session</li>
                  </ul>
                </TipItem>
              </div>
              
              <div className="space-y-6">
                <TipItem title="Advanced Strategy Adjustments">
                  <ul className="space-y-2">
                    <li>• Stand on 16 vs 10 when true count {`>`} 0</li>
                    <li>• Stand on 15 vs 10 when true count {`>`} 4</li>
                    <li>• Take insurance when true count {`>`} 3</li>
                    <li>• Double hard 9 vs 2 when true count ≥ 1</li>
                    <li>• Surrender 15 vs A when available</li>
                  </ul>
                </TipItem>
                
                <TipItem title="Game Selection">
                  <ul className="space-y-2">
                    <li>• Look for 3:2 blackjack payouts</li>
                    <li>• Fewer decks means better player odds</li>
                    <li>• Prefer games where dealer stands on soft 17</li>
                    <li>• Look for tables with surrender option</li>
                    <li>• Check for favorable penetration (% of shoe dealt)</li>
                  </ul>
                </TipItem>
              </div>
            </div>
            
            <div className="mt-8 p-4 bg-dark-lighter rounded-lg">
              <p className="text-sm text-gray-400">
                <strong className="text-white">Advanced Tip:</strong> When counting cards, bet spread is crucial. Your maximum bet should be at least 5-10 times your minimum bet to capitalize on favorable counts. Spread too wide and you risk detection; spread too narrow and you limit your advantage.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="etiquette">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <TipItem title="Table Manners">
                  <ul className="space-y-2">
                    <li>• Wait for the hand to finish before joining a table</li>
                    <li>• Place chips neatly in the betting area</li>
                    <li>• Never touch your cards in a shoe game</li>
                    <li>• Use hand signals along with verbal instructions</li>
                    <li>• Don't touch your bet once the cards are dealt</li>
                    <li>• Keep your phone off the table</li>
                  </ul>
                </TipItem>
                
                <TipItem title="Hand Signals">
                  <ul className="space-y-2">
                    <li>• Hit: Tap the table with your finger</li>
                    <li>• Stand: Wave your hand horizontally over cards</li>
                    <li>• Double: Place additional chips next to original bet</li>
                    <li>• Split: Place additional chips and make a "V" with fingers</li>
                    <li>• Surrender: Draw a line behind your bet</li>
                  </ul>
                </TipItem>
              </div>
              
              <div className="space-y-6">
                <TipItem title="Dealer Interaction">
                  <ul className="space-y-2">
                    <li>• Tip the dealer occasionally (especially when winning)</li>
                    <li>• Place dealer tips as a separate bet or add to your bet</li>
                    <li>• Don't blame the dealer for bad cards</li>
                    <li>• Say "no action" if you want to sit out a hand</li>
                    <li>• Ask questions between hands, not during play</li>
                  </ul>
                </TipItem>
                
                <TipItem title="Other Players">
                  <ul className="space-y-2">
                    <li>• Don't give unsolicited advice to other players</li>
                    <li>• Don't critique others' playing decisions</li>
                    <li>• Don't blame others for dealer's good hands</li>
                    <li>• Keep conversation light and positive</li>
                    <li>• Be mindful of the pace of play</li>
                  </ul>
                </TipItem>
              </div>
            </div>
            
            <div className="mt-8 p-4 bg-dark-lighter rounded-lg">
              <p className="text-sm text-gray-400">
                <strong className="text-white">Etiquette Tip:</strong> Remember that each table has its own atmosphere. Some are social and talkative, others more serious. Match your behavior to the table tone, and always be respectful to dealers and other players regardless of your results.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default BlackjackTips;
