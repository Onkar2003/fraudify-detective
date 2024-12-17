import { Home, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const DatasetNavbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="bg-white border-b py-4">
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Button
          variant="ghost"
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-2"
        >
          <Home className="h-5 w-5" />
          Back to Dashboard
        </Button>

        <Button
          variant="ghost"
          onClick={() => navigate("/profile")}
          className="flex items-center gap-2"
        >
          <User className="h-5 w-5" />
          Profile
        </Button>
      </div>
    </nav>
  );
};