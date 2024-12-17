import { useAuth } from "@/context/AuthContext";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Navbar } from "@/components/Navbar";
import { ChartBar, Activity, AlertTriangle, CheckCircle } from "lucide-react";

const Profile = () => {
  const { user } = useAuth();

  // Mock analytics data
  const analytics = {
    totalTransactions: 156,
    fraudulentTransactions: 12,
    averageAmount: 2500,
    riskScore: 85,
    recentActivity: [
      { date: "2024-03-20", type: "Analysis", description: "Dataset Upload" },
      { date: "2024-03-19", type: "Transaction", description: "Risk Analysis" },
      { date: "2024-03-18", type: "Analysis", description: "Bulk Analysis" },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-6">
          <Card className="p-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <Avatar className="h-24 w-24">
                <AvatarImage src={user?.profilePicture} alt={user?.name} />
                <AvatarFallback className="text-2xl">
                  {user?.name?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="text-center md:text-left">
                <h2 className="text-2xl font-bold">{user?.name}</h2>
                <p className="text-gray-600">{user?.email}</p>
                <p className="text-sm text-gray-500 mt-2">Member since March 2024</p>
              </div>
            </div>
          </Card>

          <div className="grid md:grid-cols-4 gap-4">
            <Card className="p-4">
              <div className="flex items-center gap-2">
                <ChartBar className="h-5 w-5 text-blue-500" />
                <h3 className="font-semibold">Total Transactions</h3>
              </div>
              <p className="text-2xl font-bold mt-2">{analytics.totalTransactions}</p>
            </Card>

            <Card className="p-4">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                <h3 className="font-semibold">Fraudulent</h3>
              </div>
              <p className="text-2xl font-bold mt-2">{analytics.fraudulentTransactions}</p>
            </Card>

            <Card className="p-4">
              <div className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-green-500" />
                <h3 className="font-semibold">Average Amount</h3>
              </div>
              <p className="text-2xl font-bold mt-2">₹{analytics.averageAmount}</p>
            </Card>

            <Card className="p-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-purple-500" />
                <h3 className="font-semibold">Risk Score</h3>
              </div>
              <p className="text-2xl font-bold mt-2">{analytics.riskScore}%</p>
            </Card>
          </div>

          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {analytics.recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between border-b pb-2">
                  <div>
                    <p className="font-medium">{activity.type}</p>
                    <p className="text-sm text-gray-500">{activity.description}</p>
                  </div>
                  <p className="text-sm text-gray-500">{activity.date}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;