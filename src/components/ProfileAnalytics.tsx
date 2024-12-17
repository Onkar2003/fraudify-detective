import React from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { LineChart, BarChart, Shield, AlertTriangle, CheckCircle, TrendingUp } from "lucide-react";

interface ProfileAnalyticsProps {
  stats: {
    totalTransactions: number;
    fraudulentTransactions: number;
    averageAmount: number;
    riskScore: number;
  };
  recentActivity: Array<{
    date: string;
    type: string;
    description: string;
  }>;
}

export const ProfileAnalytics = ({ stats, recentActivity }: ProfileAnalyticsProps) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-2">
            <BarChart className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">Total Transactions</h3>
          </div>
          <p className="text-2xl font-bold mt-2">{stats.totalTransactions}</p>
          <Progress value={100} className="mt-2" />
        </Card>

        <Card className="p-4 hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-danger" />
            <h3 className="font-semibold">Fraudulent</h3>
          </div>
          <p className="text-2xl font-bold mt-2">{stats.fraudulentTransactions}</p>
          <Progress 
            value={(stats.fraudulentTransactions / stats.totalTransactions) * 100} 
            className="mt-2 bg-danger/20"
          />
        </Card>

        <Card className="p-4 hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-success" />
            <h3 className="font-semibold">Average Amount</h3>
          </div>
          <p className="text-2xl font-bold mt-2">₹{stats.averageAmount}</p>
          <Progress value={75} className="mt-2 bg-success/20" />
        </Card>

        <Card className="p-4 hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-warning" />
            <h3 className="font-semibold">Risk Score</h3>
          </div>
          <p className="text-2xl font-bold mt-2">{stats.riskScore}%</p>
          <Progress value={stats.riskScore} className="mt-2 bg-warning/20" />
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <LineChart className="h-5 w-5 text-primary" />
          Recent Activity
        </h3>
        <div className="space-y-4">
          {recentActivity.map((activity, index) => (
            <div key={index} className="flex items-center justify-between border-b pb-4 last:border-0">
              <div className="flex items-start gap-3">
                {activity.type === "Analysis" ? (
                  <Shield className="h-5 w-5 text-primary" />
                ) : (
                  <CheckCircle className="h-5 w-5 text-success" />
                )}
                <div>
                  <p className="font-medium">{activity.type}</p>
                  <p className="text-sm text-gray-600">{activity.description}</p>
                </div>
              </div>
              <span className="text-sm text-gray-500">{activity.date}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};