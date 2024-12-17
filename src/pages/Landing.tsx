import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, AlertCircle, CheckCircle, ArrowRight, LineChart, Lock, Users } from "lucide-react";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-primary flex items-center gap-2">
          <Shield className="h-8 w-8" />
          FraudifyDetective
        </div>
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
          <h1 className="text-5xl font-bold mb-6 text-gray-900 animate-fade-in">
            Secure Your Transactions with
            <span className="text-primary block mt-2">AI-Powered Fraud Detection</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Protect your financial operations with our advanced AI system that
            detects and prevents fraudulent transactions in real-time with 99.9% accuracy.
          </p>
          <div className="flex justify-center gap-4">
            <Button 
              className="text-lg px-8 py-6 bg-primary hover:bg-primary/90"
              onClick={() => navigate('/signup')}
            >
              Get Started <ArrowRight className="ml-2" />
            </Button>
            <Button 
              variant="outline"
              className="text-lg px-8 py-6"
              onClick={() => navigate('/login')}
            >
              Learn More
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-8 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
            <Shield className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Advanced Protection</h3>
            <p className="text-gray-600">
              State-of-the-art AI algorithms to detect suspicious patterns and
              prevent fraud with real-time monitoring.
            </p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
            <LineChart className="w-12 h-12 text-warning mb-4" />
            <h3 className="text-xl font-semibold mb-2">Detailed Analytics</h3>
            <p className="text-gray-600">
              Comprehensive transaction analysis with visual insights and risk scoring.
            </p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
            <Lock className="w-12 h-12 text-success mb-4" />
            <h3 className="text-xl font-semibold mb-2">Secure Integration</h3>
            <p className="text-gray-600">
              Easy integration with UPI payment systems with bank-grade security.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Why Choose FraudifyDetective?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-success flex-shrink-0" />
                <div>
                  <h4 className="font-semibold">Real-time Detection</h4>
                  <p className="text-gray-600">Instant fraud detection during transactions</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Users className="w-6 h-6 text-primary flex-shrink-0" />
                <div>
                  <h4 className="font-semibold">User-Friendly Interface</h4>
                  <p className="text-gray-600">Easy to use dashboard and analytics</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <AlertCircle className="w-6 h-6 text-warning flex-shrink-0" />
                <div>
                  <h4 className="font-semibold">Proactive Alerts</h4>
                  <p className="text-gray-600">Instant notifications for suspicious activities</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Shield className="w-6 h-6 text-primary flex-shrink-0" />
                <div>
                  <h4 className="font-semibold">Advanced Security</h4>
                  <p className="text-gray-600">Enterprise-grade security protocols</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-50 py-8">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-600">© 2024 FraudifyDetective. All rights reserved.</p>
          <p className="text-sm text-gray-500 mt-2">Protecting your transactions with advanced AI technology</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;