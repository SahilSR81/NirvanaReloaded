import { Button } from "@/components/ui/button";
import { Moon, Sun, Wind, Stars } from "lucide-react";
import PageNavigation from "@/components/shared/PageNavigation";

const Meditation = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 space-y-8">
        <h1 className="text-4xl font-bold gradient-text">Guided Meditation</h1>
        <p className="text-muted-foreground text-lg">Find peace with our guided meditation sessions</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-card p-6 space-y-4">
            <Moon className="w-10 h-10 text-gradient-start" />
            <h3 className="text-xl font-semibold gradient-text">Sleep Meditation</h3>
            <p className="text-muted-foreground">Calm your mind and prepare for restful sleep</p>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Duration: 15 minutes</p>
              <Button className="w-full gradient-bg text-white">Start Session</Button>
            </div>
          </div>

          <div className="glass-card p-6 space-y-4">
            <Sun className="w-10 h-10 text-gradient-middle" />
            <h3 className="text-xl font-semibold gradient-text">Morning Meditation</h3>
            <p className="text-muted-foreground">Start your day with clarity and purpose</p>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Duration: 10 minutes</p>
              <Button className="w-full gradient-bg text-white">Start Session</Button>
            </div>
          </div>

          <div className="glass-card p-6 space-y-4">
            <Wind className="w-10 h-10 text-gradient-end" />
            <h3 className="text-xl font-semibold gradient-text">Stress Relief</h3>
            <p className="text-muted-foreground">Quick meditation for anxiety and stress</p>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Duration: 5 minutes</p>
              <Button className="w-full gradient-bg text-white">Start Session</Button>
            </div>
          </div>

          <div className="glass-card p-6 space-y-4">
            <Stars className="w-10 h-10 text-gradient-start" />
            <h3 className="text-xl font-semibold gradient-text">Deep Focus</h3>
            <p className="text-muted-foreground">Enhance concentration and mindfulness</p>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Duration: 20 minutes</p>
              <Button className="w-full gradient-bg text-white">Start Session</Button>
            </div>
          </div>
        </div>

        <PageNavigation
          prevPage={{ name: "Community", path: "/community" }}
          nextPage={{ name: "Therapist", path: "/therapist" }}
        />
      </div>
    </div>
  );
};

export default Meditation;