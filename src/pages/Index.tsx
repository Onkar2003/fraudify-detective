import React from "react";
import { TransactionForm } from "@/components/TransactionForm";
import { RiskScore } from "@/components/RiskScore";
import { TransactionHistory } from "@/components/TransactionHistory";
import { toast } from "@/components/ui/use-toast";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Upload, Activity, TrendingUp, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Card } from "@/components/ui/card";

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [analysisResult, setAnalysisResult] = React.useState<{
    score: number;
    factors: string[];
    analysis: {
      legitimate: string[];
      fraudulent: string[];
    };
  } | null>(null);

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

  // Mock statistics
  const statistics = {
    totalTransactions: 156,
    averageAmount: "₹2,500",
    riskLevel: "Medium",
    fraudulentCount: 12,
  };

  const handleAnalyze = (data: any) => {
    console.log("Analyzing transaction data:", data);
    
    const mockAnalysis = {
      score: Math.floor(Math.random() * 100),
      factors: [
        "Transaction amount pattern analysis",
        "Merchant reputation check",
        "Location-based risk assessment",
        "Transaction frequency analysis",
      ],
      analysis: {
        legitimate: [
          "Transaction amount within historical range",
          "Known merchant with good reputation",
          "Regular transaction location",
          "Normal transaction frequency",
        ],
        fraudulent: [
          "Unusual transaction timing",
          "Multiple transactions in short period",
          "Different device than usual",
          "New beneficiary account",
        ],
      },
    };

    setAnalysisResult(mockAnalysis);
    
    toast({
      title: "Analysis Complete",
      description: "Transaction has been analyzed for fraud patterns.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-1">Welcome back, {user?.name}</p>
          </div>
          <Button onClick={() => navigate("/dataset-upload")} className="bg-primary hover:bg-primary/90">
            <Upload className="mr-2 h-4 w-4" />
            Upload Dataset
          </Button>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center gap-3">
              <Activity className="h-8 w-8 text-primary" />
              <div>
                <p className="text-sm text-gray-600">Total Transactions</p>
                <p className="text-2xl font-bold">{statistics.totalTransactions}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-8 w-8 text-green-500" />
              <div>
                <p className="text-sm text-gray-600">Average Amount</p>
                <p className="text-2xl font-bold">{statistics.averageAmount}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-8 w-8 text-yellow-500" />
              <div>
                <p className="text-sm text-gray-600">Risk Level</p>
                <p className="text-2xl font-bold">{statistics.riskLevel}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-8 w-8 text-red-500" />
              <div>
                <p className="text-sm text-gray-600">Fraudulent</p>
                <p className="text-2xl font-bold">{statistics.fraudulentCount}</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">Analyze Transaction</h2>
            <TransactionForm onAnalyze={handleAnalyze} />
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Analysis Results</h2>
            <Card className="p-6 h-full">
              {analysisResult ? (
                <RiskScore
                  score={analysisResult.score}
                  factors={analysisResult.factors}
                  analysis={analysisResult.analysis}
                />
              ) : (
                <div className="h-full flex items-center justify-center text-gray-500">
                  Submit a transaction to see analysis results
                </div>
              )}
            </Card>
          </div>
        </div>

        <Card className="p-6">
          <TransactionHistory transactions={transactions} />
        </Card>
      </div>
    </div>
  );
};

export default Index;