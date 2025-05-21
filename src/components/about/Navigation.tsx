import { Button } from "@/components/ui/button";
import { Home, Sun, Moon } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface NavigationProps {
  theme: string;
  toggleTheme: () => void;
}

const Navigation = ({ theme, toggleTheme }: NavigationProps) => {
  const navigate = useNavigate();
  
  return (
    <nav className="fixed top-0 w-full nav-glass z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-4">
            <img 
              src="/lovable-uploads/6c1df936-4b2b-42ea-af81-c66f17443ac9.png" 
              alt="Nirvana" 
              className="w-16 h-16 rounded-lg animate-pulse cursor-pointer"
              onClick={() => navigate("/")}
            />
            <span className="text-2xl font-bold gradient-text">
              Nirvana
            </span>
          </div>
          
          <div className="flex items-center space-x-6">
            <Button
              variant="ghost"
              onClick={() => navigate("/")}
              className="text-foreground hover:text-gradient-start transition-colors"
            >
              <Home className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="text-foreground hover:text-gradient-start transition-colors"
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Button
              onClick={() => navigate("/signup")}
              className="gradient-bg hover:opacity-90 text-white px-6 py-2 rounded-lg transform hover:scale-105 transition-all duration-300"
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;