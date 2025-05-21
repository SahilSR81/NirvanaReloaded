import { Button } from "@/components/ui/button";
import { Music2, Heart, Play } from "lucide-react";
import PageNavigation from "@/components/shared/PageNavigation";

const Music = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 space-y-8">
        <h1 className="text-4xl font-bold gradient-text">Mood Music</h1>
        <p className="text-muted-foreground text-lg">Personalized music recommendations based on your mood</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-card p-6 space-y-4">
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <Music2 className="w-10 h-10 text-gradient-start" />
                <h3 className="text-xl font-semibold gradient-text">Calming Playlist</h3>
                <p className="text-muted-foreground">Soothing melodies for relaxation</p>
              </div>
              <Button size="icon" variant="ghost">
                <Play className="w-6 h-6" />
              </Button>
            </div>
          </div>

          <div className="glass-card p-6 space-y-4">
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <Heart className="w-10 h-10 text-gradient-middle" />
                <h3 className="text-xl font-semibold gradient-text">Uplifting Beats</h3>
                <p className="text-muted-foreground">Energetic tunes to boost your mood</p>
              </div>
              <Button size="icon" variant="ghost">
                <Play className="w-6 h-6" />
              </Button>
            </div>
          </div>
        </div>

        <PageNavigation
          prevPage={{ name: "Therapist", path: "/therapist" }}
          nextPage={{ name: "Dashboard", path: "/dashboard" }}
        />
      </div>
    </div>
  );
};

export default Music;