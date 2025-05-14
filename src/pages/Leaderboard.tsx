
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Trophy, Award, Star } from 'lucide-react';

// Sample data for the leaderboard
const leaderboardData = [
  { 
    id: 1, 
    rank: 1, 
    name: "John Smith", 
    avatar: "https://placehold.co/40", 
    username: "johnsmith", 
    winRate: 78, 
    profit: 1250, 
    bets: 64, 
    streak: 8 
  },
  { 
    id: 2, 
    rank: 2, 
    name: "Emma Johnson", 
    avatar: "https://placehold.co/40", 
    username: "emmaj", 
    winRate: 74, 
    profit: 980, 
    bets: 52, 
    streak: 5 
  },
  { 
    id: 3, 
    rank: 3, 
    name: "Michael Brown", 
    avatar: "https://placehold.co/40", 
    username: "mikeb", 
    winRate: 71, 
    profit: 875, 
    bets: 68, 
    streak: 3 
  },
  { 
    id: 4, 
    rank: 4, 
    name: "Olivia Davis", 
    avatar: "https://placehold.co/40", 
    username: "oliviad", 
    winRate: 69, 
    profit: 720, 
    bets: 45, 
    streak: 4 
  },
  { 
    id: 5, 
    rank: 5, 
    name: "William Wilson", 
    avatar: "https://placehold.co/40", 
    username: "willw", 
    winRate: 67, 
    profit: 690, 
    bets: 51, 
    streak: 2 
  },
  { 
    id: 6, 
    rank: 6, 
    name: "Sophia Martinez", 
    avatar: "https://placehold.co/40", 
    username: "sophiam", 
    winRate: 65, 
    profit: 580, 
    bets: 42, 
    streak: 0 
  },
  { 
    id: 7, 
    rank: 7, 
    name: "James Taylor", 
    avatar: "https://placehold.co/40", 
    username: "jamest", 
    winRate: 64, 
    profit: 510, 
    bets: 39, 
    streak: 1 
  },
  { 
    id: 8, 
    rank: 8, 
    name: "Isabella Anderson", 
    avatar: "https://placehold.co/40", 
    username: "isabellaa", 
    winRate: 62, 
    profit: 480, 
    bets: 36, 
    streak: 0 
  },
  { 
    id: 9, 
    rank: 9, 
    name: "Logan Thomas", 
    avatar: "https://placehold.co/40", 
    username: "logant", 
    winRate: 60, 
    profit: 450, 
    bets: 40, 
    streak: 0 
  },
  { 
    id: 10, 
    rank: 10, 
    name: "Charlotte White", 
    avatar: "https://placehold.co/40", 
    username: "charlottew", 
    winRate: 59, 
    profit: 420, 
    bets: 35, 
    streak: 2 
  },
];

const Leaderboard = () => {
  const [timeFrame, setTimeFrame] = useState('alltime');

  return (
    <div className="min-h-screen bg-dark text-white">
      <Navbar />
      
      <main className="container px-4 pt-24 pb-16">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Users Leaderboard</h1>
          <p className="text-gray-400 mb-8">See which users have the best betting performance.</p>
          
          <div className="flex justify-between items-center mb-8">
            <Tabs defaultValue="overall" className="w-full">
              <TabsList className="bg-dark-lighter border-dark-border mb-6 w-auto">
                <TabsTrigger value="overall">Overall</TabsTrigger>
                <TabsTrigger value="football">Football</TabsTrigger>
                <TabsTrigger value="basketball">Basketball</TabsTrigger>
                <TabsTrigger value="casino">Casino</TabsTrigger>
              </TabsList>
            </Tabs>
            
            <Select value={timeFrame} onValueChange={setTimeFrame}>
              <SelectTrigger className="w-[180px] bg-dark-lighter border-dark-border">
                <SelectValue placeholder="Time Frame" />
              </SelectTrigger>
              <SelectContent className="bg-dark-lighter border-dark-border">
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
                <SelectItem value="alltime">All Time</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="bg-dark-card border-dark-border rounded-lg overflow-hidden">
            <div className="flex flex-col md:flex-row justify-between p-6 border-b border-dark-border">
              <div className="flex items-center gap-4 mb-4 md:mb-0">
                <div className="bg-gradient-to-r from-neon-blue to-neon-lime p-3 rounded-full">
                  <Trophy className="h-7 w-7 text-dark" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Top Bettors</h2>
                  <p className="text-gray-400 text-sm">Based on profit and win rate</p>
                </div>
              </div>
              <div className="flex gap-2 items-center">
                <div className="text-sm px-2 py-1 bg-dark-lighter rounded-md flex gap-1 items-center">
                  <Trophy size={14} className="text-yellow-400" /> 1st Place
                </div>
                <div className="text-sm px-2 py-1 bg-dark-lighter rounded-md flex gap-1 items-center">
                  <Trophy size={14} className="text-gray-400" /> 2nd Place
                </div>
                <div className="text-sm px-2 py-1 bg-dark-lighter rounded-md flex gap-1 items-center">
                  <Trophy size={14} className="text-amber-700" /> 3rd Place
                </div>
              </div>
            </div>
            
            <Table>
              <TableHeader className="bg-dark-lighter">
                <TableRow>
                  <TableHead className="w-[50px] text-white">Rank</TableHead>
                  <TableHead className="text-white">User</TableHead>
                  <TableHead className="text-white text-right">Win Rate</TableHead>
                  <TableHead className="text-white text-right">Profit</TableHead>
                  <TableHead className="text-white text-right">Bets</TableHead>
                  <TableHead className="text-white text-right">Streak</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leaderboardData.map((user) => (
                  <TableRow key={user.id} className="border-dark-border hover:bg-dark-lighter/50">
                    <TableCell className="font-medium">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full">
                        {user.rank === 1 && <Trophy size={20} className="text-yellow-400" />}
                        {user.rank === 2 && <Trophy size={20} className="text-gray-400" />}
                        {user.rank === 3 && <Trophy size={20} className="text-amber-700" />}
                        {user.rank > 3 && user.rank}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={user.avatar} alt={user.name} />
                          <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-xs text-gray-400">@{user.username}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      <div className="flex items-center justify-end gap-2">
                        {user.winRate >= 75 && <Award size={14} className="text-neon-lime" />}
                        {user.winRate}%
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-medium text-neon-lime">
                      ${user.profit}
                    </TableCell>
                    <TableCell className="text-right">{user.bets}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        {user.streak > 5 && <Star size={14} className="text-yellow-400" />}
                        {user.streak}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          <p className="mt-4 text-gray-400 text-sm text-center">
            Rankings update daily based on user performance. Keep betting to climb the leaderboard!
          </p>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Leaderboard;
