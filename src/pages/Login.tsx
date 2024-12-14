import React from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { LogIn, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      // In a real app, this would integrate with Google OAuth
      console.log("Initiating Google login...");
      // Mock successful login for demonstration
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
      login("mock_token");
      toast({
        title: "Login Successful",
        description: "Welcome to FraudifyDetective!",
      });
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
      toast({
        title: "Login Failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md space-y-6">
        <div className="text-center space-y-4">
          <LogIn className="w-12 h-12 text-primary mx-auto" />
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome to FraudifyDetective
          </h1>
          <p className="text-gray-600">
            Sign in with Google to access your fraud detection dashboard
          </p>
        </div>

        <Button
          onClick={handleGoogleLogin}
          variant="outline"
          className="w-full py-6 flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
        >
          <Mail className="w-5 h-5" />
          Continue with Google
        </Button>

        <div className="text-center space-y-4">
          <p className="text-sm text-gray-500">
            By signing in, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;