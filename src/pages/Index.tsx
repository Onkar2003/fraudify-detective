import React from "react";
import { TransactionForm } from "@/components/TransactionForm";
import { RiskScore } from "@/components/RiskScore";
import { TransactionHistory } from "@/components/TransactionHistory";
import { toast } from "@/components/ui/use-toast";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";

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

  const handleAnalyze = (data: any) => {
    console.log("Analyzing transaction data:", data);
    
    // Mock analysis with more detailed results
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
          <h1 className="text-3xl font-bold text-gray-900">Transaction Analysis</h1>
          <Button onClick={() => navigate("/dataset-upload")}>
            <Upload className="mr-2 h-4 w-4" />
            Upload Dataset
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-xl font-semibold mb-4">Analyze Transaction</h2>
            <TransactionForm onAnalyze={handleAnalyze} />
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-xl font-semibold mb-4">Analysis Results</h2>
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
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <TransactionHistory transactions={transactions} />
        </div>
      </div>
    </div>
  );
};

export default Index;
