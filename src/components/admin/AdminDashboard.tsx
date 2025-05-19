
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';

const activityData = [
  { name: 'Mon', users: 120, bets: 240 },
  { name: 'Tue', users: 132, bets: 250 },
  { name: 'Wed', users: 101, bets: 190 },
  { name: 'Thu', users: 134, bets: 270 },
  { name: 'Fri', users: 190, bets: 320 },
  { name: 'Sat', users: 230, bets: 450 },
  { name: 'Sun', users: 210, bets: 400 },
];

const revenueData = [
  { name: 'Jan', revenue: 4000 },
  { name: 'Feb', revenue: 3000 },
  { name: 'Mar', revenue: 5000 },
  { name: 'Apr', revenue: 2780 },
  { name: 'May', revenue: 1890 },
  { name: 'Jun', revenue: 2390 },
  { name: 'Jul', revenue: 3490 },
];

const AdminDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-dark-card border-dark-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,453</div>
            <p className="text-xs text-neon-lime mt-1">+12% from last month</p>
          </CardContent>
        </Card>

        <Card className="bg-dark-card border-dark-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Active Bets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,879</div>
            <p className="text-xs text-neon-lime mt-1">+8% from last month</p>
          </CardContent>
        </Card>

        <Card className="bg-dark-card border-dark-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12,234</div>
            <p className="text-xs text-neon-lime mt-1">+23% from last month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-dark-card border-dark-border">
          <CardHeader>
            <CardTitle>Weekly Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={activityData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 0,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="name" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#222', 
                      border: '1px solid #444',
                      borderRadius: '4px',
                      color: 'white'
                    }}
                  />
                  <Legend />
                  <Bar dataKey="users" name="Active Users" fill="#a3e635" />
                  <Bar dataKey="bets" name="Placed Bets" fill="#38bdf8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-dark-card border-dark-border">
          <CardHeader>
            <CardTitle>Monthly Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={revenueData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 0,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="name" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip
                    contentStyle={{ 
                      backgroundColor: '#222', 
                      border: '1px solid #444',
                      borderRadius: '4px',
                      color: 'white'
                    }}
                    formatter={(value) => [`$${value}`, 'Revenue']}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="revenue" name="Revenue" stroke="#a3e635" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
