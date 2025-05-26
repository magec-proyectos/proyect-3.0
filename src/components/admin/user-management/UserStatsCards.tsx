
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, Users, Calendar, Shield } from 'lucide-react';

interface UserStats {
  total_users: number;
  active_users: number;
  new_this_month: number;
  admin_count: number;
}

interface UserStatsCardsProps {
  userStats?: UserStats;
  isLoading: boolean;
}

const UserStatsCards: React.FC<UserStatsCardsProps> = ({ userStats, isLoading }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card className="bg-dark-card border-dark-border">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Total Users</p>
              <p className="text-xl font-bold text-white">
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  userStats?.total_users || 0
                )}
              </p>
            </div>
            <Users className="h-8 w-8 text-blue-400" />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-dark-card border-dark-border">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Active Users</p>
              <p className="text-xl font-bold text-white">
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  userStats?.active_users || 0
                )}
              </p>
            </div>
            <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-dark-card border-dark-border">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">New This Month</p>
              <p className="text-xl font-bold text-white">
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  userStats?.new_this_month || 0
                )}
              </p>
            </div>
            <Calendar className="h-8 w-8 text-purple-400" />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-dark-card border-dark-border">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Admins</p>
              <p className="text-xl font-bold text-white">
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  userStats?.admin_count || 0
                )}
              </p>
            </div>
            <Shield className="h-8 w-8 text-orange-400" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserStatsCards;
