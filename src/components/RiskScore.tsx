import React from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { AlertTriangle, CheckCircle, Info, Shield } from "lucide-react";

interface RiskScoreProps {
  score: number;
  factors: string[];
  analysis: {
    legitimate: string[];
    fraudulent: string[];
  };
}

export const RiskScore = ({ score, factors, analysis }: RiskScoreProps) => {
  const getRiskColor = (score: number) => {
    if (score < 30) return "bg-success";
    if (score < 70) return "bg-warning";
    return "bg-danger";
  };

  const getRiskText = (score: number) => {
    if (score < 30) return "Legitimate Transaction";
    if (score < 70) return "Suspicious Transaction";
    return "Likely Fraudulent";
  };

  const getRiskDescription = (score: number) => {
    if (score < 30) return "This transaction appears to be legitimate based on our analysis.";
    if (score < 70) return "This transaction shows some suspicious patterns and requires attention.";
    return "This transaction has high-risk indicators and should be carefully reviewed.";
  };

  return (
    <Card className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Transaction Analysis</h3>
        <Info className="h-5 w-5 text-gray-400" />
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="font-medium">Risk Score</span>
          <span className={`font-bold ${score >= 70 ? 'text-danger' : score >= 30 ? 'text-warning' : 'text-success'}`}>
            {score}%
          </span>
        </div>
        <Progress value={score} className={`h-3 ${getRiskColor(score)}`} />
        <div className="flex items-center gap-2 mt-2">
          {score < 30 ? (
            <CheckCircle className="h-5 w-5 text-success" />
          ) : score < 70 ? (
            <AlertTriangle className="h-5 w-5 text-warning" />
          ) : (
            <Shield className="h-5 w-5 text-danger" />
          )}
          <span className="font-medium">{getRiskText(score)}</span>
        </div>
        <p className="text-sm text-gray-600">{getRiskDescription(score)}</p>
      </div>

      <Separator />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <h4 className="font-medium text-success flex items-center gap-2">
            <CheckCircle className="h-4 w-4" />
            Legitimate Indicators
          </h4>
          <ul className="space-y-2">
            {analysis.legitimate.map((point, index) => (
              <li key={`legitimate-${index}`} className="text-sm text-gray-600 flex items-start gap-2">
                <span className="text-success">•</span>
                {point}
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-3">
          <h4 className="font-medium text-danger flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            Risk Indicators
          </h4>
          <ul className="space-y-2">
            {analysis.fraudulent.map((point, index) => (
              <li key={`fraudulent-${index}`} className="text-sm text-gray-600 flex items-start gap-2">
                <span className="text-danger">•</span>
                {point}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Separator />

      <div className="space-y-3">
        <h4 className="font-medium flex items-center gap-2">
          <Shield className="h-4 w-4 text-primary" />
          Risk Factors Analysis
        </h4>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {factors.map((factor, index) => (
            <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
              <Info className="h-4 w-4 text-primary flex-shrink-0" />
              {factor}
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
};