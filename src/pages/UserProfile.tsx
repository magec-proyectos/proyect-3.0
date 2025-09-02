
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/contexts/AuthContext';
import { useNotifications } from '@/contexts/NotificationContext';
import { toast } from 'sonner';
import VerificationRequestForm from '@/components/social/VerificationRequestForm';
import BadgeSystem from '@/components/social/BadgeSystem';
import UserNotificationSettings from '@/components/notifications/UserNotificationSettings';

const UserProfile = () => {
  const { user, logout } = useAuth();
  const { notifications, clearAllNotifications } = useNotifications();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });

  // Redirect if not logged in
  if (!user) {
    return (
      <div className="min-h-screen bg-dark text-white">
        <Navbar />
        <div className="container mx-auto px-4 pt-24 pb-16">
          <Card className="mx-auto max-w-md bg-dark-card border-dark-border text-white">
            <CardHeader className="text-center">
              <CardTitle>Please Login</CardTitle>
              <CardDescription className="text-gray-400">
                You need to be logged in to view your profile
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  // Demo betting history
  const bettingHistory = [
    { id: 'b1', match: 'Liverpool vs Man Utd', prediction: 'Liverpool Win', odds: 1.85, amount: 20, result: 'Won', payout: 37 },
    { id: 'b2', match: 'Barcelona vs Real Madrid', prediction: 'Draw', odds: 3.5, amount: 15, result: 'Lost', payout: 0 },
    { id: 'b3', match: 'Bayern vs Dortmund', prediction: 'Bayern Win', odds: 1.45, amount: 30, result: 'Won', payout: 43.5 },
    { id: 'b4', match: 'Lakers vs Warriors', prediction: 'Lakers Win', odds: 2.1, amount: 25, result: 'Won', payout: 52.5 },
  ];

  const handleSaveProfile = () => {
    // Would normally save to backend here
    setIsEditing(false);
    toast.success('Profile updated successfully');
  };

  return (
    <div className="min-h-screen bg-dark text-white">
      <Navbar />
      
      <main className="container px-4 pt-24 pb-16">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8 bg-dark-card border border-dark-border rounded-xl p-6 md:p-8">
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
              <div className="relative">
                <Avatar className="w-24 h-24 border-2 border-neon-blue">
                  <AvatarImage src={user.profileImage || `https://placehold.co/200/2f3136/fff?text=${user.name[0]}`} alt={user.name} />
                  <AvatarFallback className="text-3xl">{user.name[0]}</AvatarFallback>
                </Avatar>
                {user.socialProvider && (
                  <div className="absolute -bottom-2 -right-2 bg-neon-blue text-black text-xs px-2 py-1 rounded-full">
                    {user.socialProvider === 'google' ? 'Google' : 
                     user.socialProvider === 'apple' ? 'Apple' : 'Email'}
                  </div>
                )}
              </div>
              
              <div className="flex-1">
                <h1 className="text-2xl font-bold">{user.name}</h1>
                <p className="text-gray-400">{user.email}</p>
                
                <div className="flex flex-wrap gap-4 mt-4">
                  <div className="px-4 py-2 bg-dark rounded-lg border border-dark-border">
                    <span className="block text-sm text-gray-400">Balance</span>
                    <span className="text-lg font-bold text-neon-blue">${user.balance?.toFixed(2)}</span>
                  </div>
                  
                  <div className="px-4 py-2 bg-dark rounded-lg border border-dark-border">
                    <span className="block text-sm text-gray-400">Total Bets</span>
                    <span className="text-lg font-bold">{bettingHistory.length}</span>
                  </div>
                  
                  <div className="px-4 py-2 bg-dark rounded-lg border border-dark-border">
                    <span className="block text-sm text-gray-400">Win Rate</span>
                    <span className="text-lg font-bold text-green-500">75%</span>
                  </div>
                </div>
              </div>
              
              <Button onClick={logout} variant="outline" className="ml-auto">
                Log Out
              </Button>
            </div>
          </div>
          
          <Tabs defaultValue="bets" className="w-full">
            <TabsList className="bg-dark-lighter mb-6">
              <TabsTrigger value="bets">Betting History</TabsTrigger>
              <TabsTrigger value="badges">Badges</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="verification">Verification</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="bets">
              <Card className="bg-dark-card border-dark-border text-white">
                <CardHeader>
                  <CardTitle>Your Betting History</CardTitle>
                  <CardDescription className="text-gray-400">
                    View all your past bets and their outcomes
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-dark-border">
                          <th className="text-left py-3 px-4 text-gray-400 font-medium">Match</th>
                          <th className="text-left py-3 px-4 text-gray-400 font-medium">Prediction</th>
                          <th className="text-left py-3 px-4 text-gray-400 font-medium">Odds</th>
                          <th className="text-left py-3 px-4 text-gray-400 font-medium">Amount</th>
                          <th className="text-left py-3 px-4 text-gray-400 font-medium">Result</th>
                          <th className="text-left py-3 px-4 text-gray-400 font-medium">Payout</th>
                        </tr>
                      </thead>
                      <tbody>
                        {bettingHistory.map(bet => (
                          <tr key={bet.id} className="border-b border-dark-border">
                            <td className="py-3 px-4">{bet.match}</td>
                            <td className="py-3 px-4">{bet.prediction}</td>
                            <td className="py-3 px-4">{bet.odds}</td>
                            <td className="py-3 px-4">${bet.amount}</td>
                            <td className="py-3 px-4">
                              <span className={bet.result === 'Won' ? 'text-green-500' : 'text-red-500'}>
                                {bet.result}
                              </span>
                            </td>
                            <td className="py-3 px-4">${bet.payout}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="badges">
              <BadgeSystem showAllBadges={true} />
            </TabsContent>
            
            <TabsContent value="notifications">
              <Card className="bg-dark-card border-dark-border text-white">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Notifications</CardTitle>
                    <CardDescription className="text-gray-400">
                      View and manage your notifications
                    </CardDescription>
                  </div>
                  {notifications.length > 0 && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={clearAllNotifications}
                    >
                      Clear All
                    </Button>
                  )}
                </CardHeader>
                <CardContent>
                  {notifications.length > 0 ? (
                    <div className="space-y-4">
                      {notifications.map(notification => (
                        <div 
                          key={notification.id} 
                          className={`p-4 rounded-lg border ${
                            notification.read ? 'border-dark-border bg-dark' : 'border-neon-blue/40 bg-dark-lighter'
                          }`}
                        >
                          <div className="flex justify-between">
                            <h4 className="font-medium">{notification.title}</h4>
                            <span className="text-xs text-gray-400">
                              {new Date(notification.timestamp).toLocaleString()}
                            </span>
                          </div>
                          <p className="text-sm text-gray-400 mt-1">{notification.message}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-400">
                      No notifications to display
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="verification">
              <VerificationRequestForm />
            </TabsContent>
            
            <TabsContent value="settings">
              <Card className="bg-dark-card border-dark-border text-white">
                <CardHeader>
                  <CardTitle>Profile Settings</CardTitle>
                  <CardDescription className="text-gray-400">
                    Update your profile information
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isEditing ? (
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="name">Name</Label>
                        <Input 
                          id="name" 
                          value={profileData.name} 
                          onChange={e => setProfileData({...profileData, name: e.target.value})} 
                          className="bg-dark-lighter border-dark-border"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email" 
                          value={profileData.email} 
                          onChange={e => setProfileData({...profileData, email: e.target.value})}
                          className="bg-dark-lighter border-dark-border" 
                          disabled={user.socialProvider !== 'email'}
                        />
                        {user.socialProvider !== 'email' && (
                          <p className="text-xs text-gray-400 mt-1">Email cannot be changed for social logins</p>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div>
                        <span className="block text-sm text-gray-400">Name</span>
                        <span>{profileData.name}</span>
                      </div>
                      <div>
                        <span className="block text-sm text-gray-400">Email</span>
                        <span>{profileData.email}</span>
                      </div>
                      <div>
                        <span className="block text-sm text-gray-400">Account Type</span>
                        <span className="capitalize">{user.socialProvider || 'Email'}</span>
                      </div>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                  {isEditing ? (
                    <>
                      <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                      <Button onClick={handleSaveProfile}>Save Changes</Button>
                    </>
                  ) : (
                    <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
                  )}
                </CardFooter>
              </Card>
              
              
              <UserNotificationSettings />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default UserProfile;
