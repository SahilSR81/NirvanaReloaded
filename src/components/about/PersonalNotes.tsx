import { Card, CardContent } from "@/components/ui/card";
import { Quote, Heart } from "lucide-react";

const PersonalNotes = () => (
  <div className="grid md:grid-cols-2 gap-8 mb-12">
    <Card className="glass-card">
      <CardContent className="p-6">
        <div className="flex items-center gap-4 mb-4">
          <Quote className="w-8 h-8 text-gradient-start" />
          <h3 className="text-xl font-semibold gradient-text">Intrusive Thoughts & Growth</h3>
        </div>
        <p className="text-muted-foreground italic">
          "Through my own journey with intrusive thoughts, I've learned that our minds can be both our greatest challenge and our most powerful ally. This platform is born from the understanding that healing isn't linear, and every step forward, no matter how small, is progress."
        </p>
        <p className="text-right text-gradient-start mt-4">- Sahil</p>
      </CardContent>
    </Card>

    <Card className="glass-card">
      <CardContent className="p-6">
        <div className="flex items-center gap-4 mb-4">
          <Heart className="w-8 h-8 text-gradient-start" />
          <h3 className="text-xl font-semibold gradient-text">Love for Mental Wellness</h3>
        </div>
        <p className="text-muted-foreground">
          My dedication to mental wellness stems from a deep understanding of its importance in our daily lives. I believe that everyone deserves access to tools and resources that support their mental health journey. Through Nirvana, I aim to create a community where healing and growth go hand in hand.
        </p>
      </CardContent>
    </Card>
  </div>
);

export default PersonalNotes;