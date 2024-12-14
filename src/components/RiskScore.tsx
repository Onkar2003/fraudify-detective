import React from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

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

  return (
    <Card className="p-6 space-y-4">
      <h3 className="text-lg font-semibold">Transaction Analysis</h3>
      
      <div className="space-y-2">
        <div className="flex justify-between">
          <span>Risk Score</span>
          <span className="font-semibold">{score}%</span>
        </div>
        <Progress value={score} className={getRiskColor(score)} />
        <span className="text-sm font-medium">{getRiskText(score)}</span>
      </div>

      <Separator />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <h4 className="font-medium text-success">Legitimate Indicators:</h4>
          <ul className="list-disc list-inside space-y-1">
            {analysis.legitimate.map((point, index) => (
              <li key={`legitimate-${index}`} className="text-sm text-gray-600">
                {point}
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-2">
          <h4 className="font-medium text-danger">Fraudulent Indicators:</h4>
          <ul className="list-disc list-inside space-y-1">
            {analysis.fraudulent.map((point, index) => (
              <li key={`fraudulent-${index}`} className="text-sm text-gray-600">
                {point}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Separator />

      <div className="space-y-2">
        <h4 className="font-medium">Risk Factors:</h4>
        <ul className="list-disc list-inside space-y-1">
          {factors.map((factor, index) => (
            <li key={index} className="text-sm text-gray-600">
              {factor}
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
};