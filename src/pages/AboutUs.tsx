import { useState, useEffect } from "react";
import Navigation from "@/components/about/Navigation";
import Header from "@/components/about/Header";
import Mission from "@/components/about/Mission";
import PersonalNotes from "@/components/about/PersonalNotes";
import Contact from "@/components/about/Contact";
import Footer from "@/components/shared/Footer";
import PageNavigation from "@/components/shared/PageNavigation";
import { Feedback } from "@/components/about/Feedback";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const AboutUs = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "dark");

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation theme={theme} toggleTheme={toggleTheme} />
      
      <div className="pt-24 px-6 pb-16">
        <div className="max-w-6xl mx-auto space-y-8">
          <Header />
          <Mission />
          <PersonalNotes />
          <Contact />
          <Feedback />
        </div>
      </div>

      <div className="text-center py-4 border-t border-border">
        <p className="text-muted-foreground text-sm">Designed by Sahil, with you in every thought.</p>
      </div>

      <PageNavigation
        prevPage={{ name: "Personalized Help", path: "/personalized-help" }}
      />
      <Footer />

      {/* Navigation buttons */}
      <div className="flex justify-center gap-4 mt-8">
        <Button onClick={() => navigate("/")} variant="outline">
          Back to Home
        </Button>
        
        {user && (  // Only show if user is logged in
          <Button 
            onClick={() => navigate("/personalized-help")}
            className="gradient-bg text-white"
          >
            Get Personalized Help
          </Button>
        )}
      </div>
    </div>
  );
};

export default AboutUs;