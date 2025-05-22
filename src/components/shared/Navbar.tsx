import { ProfileMenu } from "./ProfileMenu";
import NotificationBell from "@/components/ui/NotificationBell";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-sm border-b border-border z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center">
          <img src="/lovable-uploads/6c1df936-4b2b-42ea-af81-c66f17443ac9.png" alt="Nirvana Logo" className="h-10 w-auto mr-3 rounded-full bg-white dark:bg-slate-900 p-1 shadow" />
          <h1 className="text-xl font-bold gradient-text">Nirvana</h1>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle dark mode">
            {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </Button>
          <NotificationBell />
          <ProfileMenu />
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 