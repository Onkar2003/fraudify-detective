import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";

interface Transaction {
  id: string;
  upiId: string;
  amount: number;
  timestamp: string;
  riskScore: number;
}

export const TransactionHistory = ({
  transactions,
}: {
  transactions: Transaction[];
}) => {
  const getRiskBadgeClass = (score: number) => {
    if (score < 30) return "bg-success/20 text-success";
    if (score < 70) return "bg-warning/20 text-warning";
    return "bg-danger/20 text-danger";
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>UPI ID</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Risk Score</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((tx) => (
              <TableRow key={tx.id}>
                <TableCell>{tx.upiId}</TableCell>
                <TableCell>₹{tx.amount.toFixed(2)}</TableCell>
                <TableCell>
                  {new Date(tx.timestamp).toLocaleString()}
                </TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-sm ${getRiskBadgeClass(
                      tx.riskScore
                    )}`}
                  >
                    {tx.riskScore}%
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};