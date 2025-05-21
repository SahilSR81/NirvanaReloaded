import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const Mission = () => (
  <Card className="glass-card mb-12">
    <CardContent className="p-6">
      <div className="flex items-center gap-4 mb-4">
        <Star className="w-8 h-8 text-gradient-start" />
        <h2 className="text-2xl font-semibold gradient-text">Our Mission</h2>
      </div>
      <p className="text-muted-foreground leading-relaxed">
        At Nirvana, we believe in the power of understanding and nurturing mental wellness. 
        Our platform is designed to provide a safe, supportive space for individuals to explore 
        their mental health journey, find peace, and discover their inner strength.
      </p>
    </CardContent>
  </Card>
);

export default Mission;