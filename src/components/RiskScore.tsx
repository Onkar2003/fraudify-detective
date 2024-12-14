import React from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface RiskScoreProps {
  score: number;
  factors: string[];
}

export const RiskScore = ({ score, factors }: RiskScoreProps) => {
  const getRiskColor = (score: number) => {
    if (score < 30) return "bg-success";
    if (score < 70) return "bg-warning";
    return "bg-danger";
  };

  const getRiskText = (score: number) => {
    if (score < 30) return "Low Risk";
    if (score < 70) return "Medium Risk";
    return "High Risk";
  };

  return (
    <Card className="p-6 space-y-4">
      <h3 className="text-lg font-semibold">Risk Assessment</h3>
      
      <div className="space-y-2">
        <div className="flex justify-between">
          <span>Risk Score</span>
          <span className="font-semibold">{score}%</span>
        </div>
        <Progress value={score} className={getRiskColor(score)} />
        <span className="text-sm font-medium">{getRiskText(score)}</span>
      </div>

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