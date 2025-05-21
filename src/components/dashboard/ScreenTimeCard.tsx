import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Monitor } from "lucide-react";

interface ScreenTimeCardProps {
  screenTime: number;
}

export function ScreenTimeCard({ screenTime }: ScreenTimeCardProps) {
  const getMoodEmoji = (hours: number) => {
    if (hours <= 2) return "😊"; // Happy
    if (hours <= 4) return "😌"; // Calm
    if (hours <= 6) return "😐"; // Neutral
    if (hours <= 12) return "😢"; // Sad
    return "😰"; // Stressed
  };

  const getMoodText = (hours: number) => {
    if (hours <= 2) return "Happy";
    if (hours <= 4) return "Calm";
    if (hours <= 6) return "Neutral";
    if (hours <= 12) return "Sad";
    return "Stressed";
  };

  return (
    <Card className="bg-card">
      <CardHeader>
        <CardTitle className="text-primary flex items-center gap-2">
          <Monitor className="w-6 h-6" />
          Today's Screen Time
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-2">
          <span className="text-muted-foreground">Total Hours</span>
          <div className="flex items-center justify-between">
            <p className="text-4xl font-bold text-foreground">{screenTime} hours</p>
            <div className="text-4xl">
              {getMoodEmoji(screenTime)}
            </div>
          </div>
          <p className="text-muted-foreground">{getMoodText(screenTime)}</p>
        </div>
      </CardContent>
    </Card>
  );
}