import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, AlertCircle, CheckCircle, ArrowRight } from "lucide-react";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-primary">FraudifyDetective</div>
        <div className="space-x-4">
          <Link to="/login">
            <Button variant="ghost">Sign In</Button>
          </Link>
          <Link to="/signup">
            <Button variant="outline">Sign Up</Button>
          </Link>
        </div>
      </nav>

      <main className="container mx-auto px-6 py-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 text-gray-900">
            Secure Your Transactions with AI-Powered Fraud Detection
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Protect your financial operations with our advanced AI system that
            detects and prevents fraudulent transactions in real-time.
          </p>
          <Button 
            className="text-lg px-8 py-6"
            onClick={() => navigate('/signup')}
          >
            Get Started <ArrowRight className="ml-2" />
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <Shield className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Advanced Protection</h3>
            <p className="text-gray-600">
              State-of-the-art AI algorithms to detect suspicious patterns and
              prevent fraud.
            </p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <AlertCircle className="w-12 h-12 text-warning mb-4" />
            <h3 className="text-xl font-semibold mb-2">Real-time Alerts</h3>
            <p className="text-gray-600">
              Instant notifications for suspicious activities and potential threats.
            </p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <CheckCircle className="w-12 h-12 text-success mb-4" />
            <h3 className="text-xl font-semibold mb-2">Easy Integration</h3>
            <p className="text-gray-600">
              Seamlessly integrate with your existing UPI payment systems.
            </p>
          </div>
        </div>
      </main>

      <footer className="bg-gray-50 py-8">
        <div className="container mx-auto px-6 text-center text-gray-600">
          © 2024 FraudifyDetective. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Landing;