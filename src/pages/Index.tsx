import React from "react";
import { TransactionForm } from "@/components/TransactionForm";
import { RiskScore } from "@/components/RiskScore";
import { TransactionHistory } from "@/components/TransactionHistory";
import { toast } from "@/components/ui/use-toast";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

const Index = () => {
  const { logout, user } = useAuth();
  const [analysisResult, setAnalysisResult] = React.useState<{
    score: number;
    factors: string[];
  } | null>(null);

  // Mock transaction history
  const [transactions] = React.useState([
    {
      id: "1",
      upiId: "john@upi",
      amount: 1000,
      timestamp: "2024-03-20T10:30:00",
      riskScore: 15,
    },
    {
      id: "2",
      upiId: "merchant@upi",
      amount: 5000,
      timestamp: "2024-03-20T11:45:00",
      riskScore: 45,
    },
    {
      id: "3",
      upiId: "suspicious@upi",
      amount: 50000,
      timestamp: "2024-03-20T12:15:00",
      riskScore: 85,
    },
  ]);

  const handleAnalyze = (data: any) => {
    // Mock analysis - in a real app, this would call an AI model
    console.log("Analyzing transaction data:", data);
    
    const mockAnalysis = {
      score: Math.floor(Math.random() * 100),
      factors: [
        "Transaction amount is significantly higher than user average",
        "New merchant interaction detected",
        "Transaction location differs from usual pattern",
        "Multiple transactions in short time window",
      ],
    };

    setAnalysisResult(mockAnalysis);
    
    toast({
      title: "Analysis Complete",
      description: "Transaction has been analyzed for fraud patterns.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-primary">FraudifyDetective</h1>
            <span className="ml-4 text-gray-600">Welcome, {user?.name}</span>
          </div>
          <Button variant="ghost" onClick={logout}>
            <LogOut className="mr-2" />
            Logout
          </Button>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Analyze Transaction</h2>
            <TransactionForm onAnalyze={handleAnalyze} />
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Analysis Results</h2>
            {analysisResult ? (
              <RiskScore
                score={analysisResult.score}
                factors={analysisResult.factors}
              />
            ) : (
              <div className="h-full flex items-center justify-center text-gray-500">
                Submit a transaction to see analysis results
              </div>
            )}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Transaction History</h2>
          <TransactionHistory transactions={transactions} />
        </div>
      </div>
    </div>
  );
};

export default Index;