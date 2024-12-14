import React from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Upload, FileText } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { useAuth } from "@/context/AuthContext";

const DatasetUpload = () => {
  const { user } = useAuth();
  const [files, setFiles] = React.useState<File[]>([]);

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

  const handleAnalyze = () => {
    // Mock analysis - in real app, this would process the files
    console.log("Analyzing files:", files);
    toast({
      title: "Analysis Started",
      description: "Your dataset is being processed. This may take a few minutes.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-8">
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
                <Button onClick={handleAnalyze} className="w-full">
                  Analyze Dataset
                </Button>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DatasetUpload;