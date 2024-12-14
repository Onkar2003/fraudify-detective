import React from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export const TransactionForm = ({ onAnalyze }: { onAnalyze: (data: any) => void }) => {
  const [formData, setFormData] = React.useState({
    upiId: "",
    accountHolder: "",
    merchantName: "",
    amount: "",
    timestamp: new Date().toISOString().slice(0, 16),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Analyzing transaction:", formData);
    onAnalyze(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="upiId">UPI ID</Label>
          <Input
            id="upiId"
            name="upiId"
            value={formData.upiId}
            onChange={handleChange}
            placeholder="example@upi"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="accountHolder">Account Holder</Label>
          <Input
            id="accountHolder"
            name="accountHolder"
            value={formData.accountHolder}
            onChange={handleChange}
            placeholder="Full Name"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="merchantName">Merchant Name</Label>
          <Input
            id="merchantName"
            name="merchantName"
            value={formData.merchantName}
            onChange={handleChange}
            placeholder="Merchant Name"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="amount">Amount (₹)</Label>
          <Input
            id="amount"
            name="amount"
            type="number"
            value={formData.amount}
            onChange={handleChange}
            placeholder="0.00"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="timestamp">Transaction Time</Label>
          <Input
            id="timestamp"
            name="timestamp"
            type="datetime-local"
            value={formData.timestamp}
            onChange={handleChange}
            required
          />
        </div>

        <Button type="submit" className="w-full">
          Analyze Transaction
        </Button>
      </form>
    </Card>
  );
};