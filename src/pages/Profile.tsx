import { useAuth } from "@/context/AuthContext";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Navbar } from "@/components/Navbar";
import { ProfileAnalytics } from "@/components/ProfileAnalytics";
import { Shield } from "lucide-react";

const Profile = () => {
  const { user } = useAuth();

  // Mock analytics data
  const analytics = {
    stats: {
      totalTransactions: 156,
      fraudulentTransactions: 12,
      averageAmount: 2500,
      riskScore: 85,
    },
    recentActivity: [
      { date: "2024-03-20", type: "Analysis", description: "Dataset Upload & Analysis" },
      { date: "2024-03-19", type: "Transaction", description: "Risk Assessment Completed" },
      { date: "2024-03-18", type: "Analysis", description: "Bulk Transaction Analysis" },
      { date: "2024-03-17", type: "Transaction", description: "Suspicious Activity Detected" },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-6">
          <Card className="p-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <Avatar className="h-24 w-24 ring-4 ring-primary/10">
                <AvatarImage src={user?.profilePicture} alt={user?.name} />
                <AvatarFallback className="text-2xl bg-primary/5">
                  {user?.name?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="text-center md:text-left flex-1">
                <div className="flex items-center gap-2 justify-center md:justify-start">
                  <h2 className="text-2xl font-bold">{user?.name}</h2>
                  <Shield className="h-5 w-5 text-primary" />
                </div>
                <p className="text-gray-600">{user?.email}</p>
                <p className="text-sm text-gray-500 mt-2">Member since March 2024</p>
              </div>
              <div className="text-right hidden md:block">
                <div className="text-sm text-gray-500">Account Status</div>
                <div className="text-success font-medium flex items-center gap-1 justify-end">
                  Active
                </div>
              </div>
            </div>
          </Card>

          <ProfileAnalytics 
            stats={analytics.stats}
            recentActivity={analytics.recentActivity}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;