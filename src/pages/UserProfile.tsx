
import React from 'react';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { User, Settings, CreditCard, Bell, Shield, History, Heart } from 'lucide-react';

const UserProfile = () => {
  // Sample user data
  const user = {
    name: 'Alex Johnson',
    username: 'alexj',
    email: 'alex@example.com',
    joined: 'June 2023',
    balance: 523.50,
    avatar: null,
    stats: {
      totalBets: 246,
      winRate: 68,
      favoriteLeague: 'Premier League',
      favoriteTeam: 'Liverpool'
    }
  };

  // Sample betting history
  const bettingHistory = [
    {
      id: 1,
      date: '2023-05-10',
      match: 'Liverpool vs Manchester United',
      bet: 'Home Win',
      odds: 1.85,
      stake: 50,
      result: 'Won',
      profit: 42.5
    },
    {
      id: 2,
      date: '2023-05-07',
      match: 'Arsenal vs Chelsea',
      bet: 'Over 2.5 Goals',
      odds: 1.70,
      stake: 30,
      result: 'Lost',
      profit: -30
    },
    {
      id: 3,
      date: '2023-05-05',
      match: 'Manchester City vs Tottenham',
      bet: 'BTTS',
      odds: 1.65,
      stake: 40,
      result: 'Won',
      profit: 26
    },
  ];

  return (
    <div className="min-h-screen bg-dark text-white pb-16">
      <Navbar />
      
      <main className="container px-4 pt-24">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row gap-6 mb-8">
            <div className="md:w-1/3">
              <Card className="bg-dark-card border-dark-border">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <Avatar className="w-24 h-24 mb-4">
                      <AvatarImage src={user.avatar || undefined} />
                      <AvatarFallback className="bg-neon-blue/20 text-neon-blue text-2xl">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <h2 className="text-2xl font-bold">{user.name}</h2>
                    <p className="text-gray-400">@{user.username}</p>
                    <Badge className="mt-2 bg-dark-lighter">Premium Member</Badge>
                    
                    <div className="mt-6 w-full">
                      <div className="flex items-center justify-between py-3 border-b border-dark-border">
                        <span className="text-gray-400">Balance</span>
                        <span className="font-medium text-neon-lime">${user.balance.toFixed(2)}</span>
                      </div>
                      <div className="flex items-center justify-between py-3 border-b border-dark-border">
                        <span className="text-gray-400">Win Rate</span>
                        <span className="font-medium">{user.stats.winRate}%</span>
                      </div>
                      <div className="flex items-center justify-between py-3">
                        <span className="text-gray-400">Member Since</span>
                        <span className="font-medium">{user.joined}</span>
                      </div>
                    </div>
                    
                    <Button className="w-full mt-6 gap-2" variant="outline">
                      <CreditCard size={16} />
                      Add Funds
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="md:w-2/3">
              <Tabs defaultValue="history" className="w-full">
                <TabsList className="bg-dark-lighter border-dark-border mb-6 w-full grid grid-cols-4">
                  <TabsTrigger value="history">
                    <History className="mr-2 h-4 w-4" />
                    History
                  </TabsTrigger>
                  <TabsTrigger value="favorites">
                    <Heart className="mr-2 h-4 w-4" />
                    Favorites
                  </TabsTrigger>
                  <TabsTrigger value="settings">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </TabsTrigger>
                  <TabsTrigger value="security">
                    <Shield className="mr-2 h-4 w-4" />
                    Security
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="history" className="mt-0">
                  <Card className="bg-dark-card border-dark-border">
                    <CardHeader>
                      <CardTitle>Betting History</CardTitle>
                      <CardDescription className="text-gray-400">Your recent betting activity</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead className="border-b border-dark-border">
                            <tr className="text-left">
                              <th className="pb-3 text-gray-400">Date</th>
                              <th className="pb-3 text-gray-400">Match</th>
                              <th className="pb-3 text-gray-400">Bet</th>
                              <th className="pb-3 text-gray-400">Odds</th>
                              <th className="pb-3 text-gray-400">Result</th>
                              <th className="pb-3 text-gray-400">Profit</th>
                            </tr>
                          </thead>
                          <tbody>
                            {bettingHistory.map((bet) => (
                              <tr key={bet.id} className="border-b border-dark-border">
                                <td className="py-3">{bet.date}</td>
                                <td className="py-3">{bet.match}</td>
                                <td className="py-3">{bet.bet}</td>
                                <td className="py-3">{bet.odds}</td>
                                <td className="py-3">
                                  <Badge className={bet.result === 'Won' ? 'bg-green-600' : 'bg-red-600'}>
                                    {bet.result}
                                  </Badge>
                                </td>
                                <td className={`py-3 ${bet.profit > 0 ? 'text-green-500' : 'text-red-500'}`}>
                                  {bet.profit > 0 ? `+$${bet.profit}` : `-$${Math.abs(bet.profit)}`}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      
                      <div className="mt-4 flex justify-center">
                        <Button variant="outline">Load More</Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="favorites" className="mt-0">
                  <Card className="bg-dark-card border-dark-border">
                    <CardHeader>
                      <CardTitle>Favorite Teams & Leagues</CardTitle>
                      <CardDescription className="text-gray-400">Track your favorite teams and leagues for quick access</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-6">
                        <h3 className="text-lg font-medium mb-3">Favorite Teams</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div className="flex items-center gap-3 bg-dark-lighter p-3 rounded-lg">
                            <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">LP</div>
                            <div>
                              <p className="font-medium">Liverpool</p>
                              <p className="text-sm text-gray-400">Premier League</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 bg-dark-lighter p-3 rounded-lg">
                            <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">MC</div>
                            <div>
                              <p className="font-medium">Manchester City</p>
                              <p className="text-sm text-gray-400">Premier League</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium mb-3">Favorite Leagues</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div className="flex items-center gap-3 bg-dark-lighter p-3 rounded-lg">
                            <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">PL</div>
                            <div>
                              <p className="font-medium">Premier League</p>
                              <p className="text-sm text-gray-400">England</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 bg-dark-lighter p-3 rounded-lg">
                            <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">LL</div>
                            <div>
                              <p className="font-medium">La Liga</p>
                              <p className="text-sm text-gray-400">Spain</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="settings" className="mt-0">
                  <Card className="bg-dark-card border-dark-border">
                    <CardHeader>
                      <CardTitle>Account Settings</CardTitle>
                      <CardDescription className="text-gray-400">Manage your account preferences</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-gray-400">Display Name</label>
                        <input 
                          type="text" 
                          className="w-full bg-dark-lighter border border-dark-border rounded-md p-2 text-white"
                          defaultValue={user.name}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-gray-400">Email Address</label>
                        <input 
                          type="email" 
                          className="w-full bg-dark-lighter border border-dark-border rounded-md p-2 text-white"
                          defaultValue={user.email}
                        />
                      </div>
                      <div className="space-y-2">
                        <h3 className="font-medium">Notification Preferences</h3>
                        <div className="flex items-center justify-between bg-dark-lighter p-3 rounded-md">
                          <div>
                            <p>Match Reminders</p>
                            <p className="text-sm text-gray-400">Get notified when matches you're interested in are about to start</p>
                          </div>
                          <div className="w-12 h-6 bg-neon-blue rounded-full relative cursor-pointer">
                            <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                          </div>
                        </div>
                      </div>
                      <Button className="w-full">Save Changes</Button>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="security" className="mt-0">
                  <Card className="bg-dark-card border-dark-border">
                    <CardHeader>
                      <CardTitle>Security Settings</CardTitle>
                      <CardDescription className="text-gray-400">Manage your account security</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <h3 className="font-medium">Change Password</h3>
                        <div className="space-y-2">
                          <label className="text-gray-400">Current Password</label>
                          <input 
                            type="password" 
                            className="w-full bg-dark-lighter border border-dark-border rounded-md p-2 text-white"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-gray-400">New Password</label>
                          <input 
                            type="password" 
                            className="w-full bg-dark-lighter border border-dark-border rounded-md p-2 text-white"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-gray-400">Confirm New Password</label>
                          <input 
                            type="password" 
                            className="w-full bg-dark-lighter border border-dark-border rounded-md p-2 text-white"
                          />
                        </div>
                      </div>
                      <Button className="w-full">Update Password</Button>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserProfile;
