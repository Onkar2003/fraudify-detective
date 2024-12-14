import React from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Upload, FileText, AlertCircle, CheckCircle2, XCircle } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { useAuth } from "@/context/AuthContext";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

const DatasetUpload = () => {
  const { user } = useAuth();
  const [files, setFiles] = React.useState<File[]>([]);
  const [analyzing, setAnalyzing] = React.useState(false);
  const [analysisResults, setAnalysisResults] = React.useState<any>(null);
  const [progress, setProgress] = React.useState(0);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileList = Array.from(e.target.files);
      setFiles(fileList);
      console.log("Files selected:", fileList);
      toast({
        title: "Files Selected",
        description: `${fileList.length} files ready for analysis`,
      });
    }
  };

  const handleAnalyze = async () => {
    setAnalyzing(true);
    setProgress(0);
    
    // Simulate analysis progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, 200);

    // Mock analysis with timeout to simulate processing
    setTimeout(() => {
      const mockResults = {
        summary: {
          totalTransactions: 1000,
          legitimateCount: 850,
          fraudulentCount: 150,
        },
        riskCategories: {
          highRisk: 150,
          mediumRisk: 250,
          lowRisk: 600,
        },
        patterns: {
          legitimate: [
            "Regular transaction amounts",
            "Consistent location patterns",
            "Normal transaction frequency",
            "Known merchant interactions"
          ],
          fraudulent: [
            "Unusual transaction patterns",
            "Multiple high-value transfers",
            "New account activities",
            "Suspicious IP addresses"
          ]
        },
        statistics: {
          averageTransactionAmount: 2500,
          peakTransactionHour: "14:00",
          mostCommonMerchantType: "Retail",
          riskScore: 85
        }
      };
      
      setAnalysisResults(mockResults);
      setAnalyzing(false);
      clearInterval(interval);
      setProgress(100);
      
      toast({
        title: "Analysis Complete",
        description: "Dataset has been processed successfully.",
      });
    }, 4000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Dataset Analysis</h2>
          <span className="text-sm text-gray-600">Welcome, {user?.name}</span>
        </div>

        <div className="space-y-4">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center space-y-4">
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <div>
              <label htmlFor="file-upload" className="cursor-pointer">
                <span className="text-primary font-medium">Upload files</span>
                <span className="text-gray-500"> or drag and drop</span>
                <Input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  multiple
                  accept=".csv,.xlsx,.json"
                  onChange={handleFileUpload}
                />
              </label>
            </div>
            <p className="text-sm text-gray-500">
              Supported formats: CSV, XLSX, JSON
            </p>
          </div>

          {files.length > 0 && (
            <div className="space-y-4">
              <h3 className="font-medium">Selected Files:</h3>
              <div className="space-y-2">
                {files.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-2 text-sm text-gray-600"
                  >
                    <FileText className="h-4 w-4" />
                    <span>{file.name}</span>
                    <span className="text-gray-400">
                      ({(file.size / 1024).toFixed(2)} KB)
                    </span>
                  </div>
                ))}
              </div>
              <Button 
                onClick={handleAnalyze} 
                className="w-full"
                disabled={analyzing}
              >
                {analyzing ? "Analyzing Dataset..." : "Analyze Dataset"}
              </Button>
            </div>
          )}

          {analyzing && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Analysis Progress</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="w-full" />
            </div>
          )}

          {analysisResults && (
            <Card className="p-6 mt-6 space-y-6">
              <h3 className="text-xl font-semibold">Analysis Results</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="text-green-600 h-5 w-5" />
                    <div className="text-green-600 font-semibold">Legitimate</div>
                  </div>
                  <div className="text-2xl font-bold mt-2">
                    {analysisResults.summary.legitimateCount}
                  </div>
                  <div className="text-sm text-green-600 mt-1">
                    {((analysisResults.summary.legitimateCount / analysisResults.summary.totalTransactions) * 100).toFixed(1)}%
                  </div>
                </div>
                
                <div className="p-4 bg-yellow-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="text-yellow-600 h-5 w-5" />
                    <div className="text-yellow-600 font-semibold">Suspicious</div>
                  </div>
                  <div className="text-2xl font-bold mt-2">
                    {analysisResults.riskCategories.mediumRisk}
                  </div>
                  <div className="text-sm text-yellow-600 mt-1">
                    {((analysisResults.riskCategories.mediumRisk / analysisResults.summary.totalTransactions) * 100).toFixed(1)}%
                  </div>
                </div>
                
                <div className="p-4 bg-red-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <XCircle className="text-red-600 h-5 w-5" />
                    <div className="text-red-600 font-semibold">Fraudulent</div>
                  </div>
                  <div className="text-2xl font-bold mt-2">
                    {analysisResults.summary.fraudulentCount}
                  </div>
                  <div className="text-sm text-red-600 mt-1">
                    {((analysisResults.summary.fraudulentCount / analysisResults.summary.totalTransactions) * 100).toFixed(1)}%
                  </div>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium text-green-600">Legitimate Patterns:</h4>
                  <ul className="space-y-2">
                    {analysisResults.patterns.legitimate.map((pattern: string, index: number) => (
                      <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        {pattern}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium text-red-600">Fraudulent Patterns:</h4>
                  <ul className="space-y-2">
                    {analysisResults.patterns.fraudulent.map((pattern: string, index: number) => (
                      <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                        <XCircle className="h-4 w-4 text-red-500" />
                        {pattern}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-1">
                  <div className="text-sm text-gray-500">Avg. Transaction</div>
                  <div className="font-semibold">₹{analysisResults.statistics.averageTransactionAmount}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm text-gray-500">Peak Hour</div>
                  <div className="font-semibold">{analysisResults.statistics.peakTransactionHour}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm text-gray-500">Common Merchant</div>
                  <div className="font-semibold">{analysisResults.statistics.mostCommonMerchantType}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm text-gray-500">Risk Score</div>
                  <div className="font-semibold">{analysisResults.statistics.riskScore}%</div>
                </div>
              </div>
            </Card>
          )}
        </div>
      </Card>
    </div>
  );
};

export default DatasetUpload;