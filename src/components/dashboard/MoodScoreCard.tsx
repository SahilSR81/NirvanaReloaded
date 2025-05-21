import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HeartPulse } from "lucide-react";

interface MoodScoreCardProps {
  mood: string;
  score: number;
  weather: string;
}

const getMoodEmoji = (score: number) => {
  if (score >= 8) return "😊"; // Happy
  if (score >= 6) return "😌"; // Calm
  if (score >= 4) return "😐"; // Neutral
  if (score >= 2) return "😢"; // Sad
  return "😰"; // Stressed
};

const getMoodText = (score: number) => {
  if (score >= 8) return "Happy";
  if (score >= 6) return "Calm";
  if (score >= 4) return "Neutral";
  if (score >= 2) return "Sad";
  return "Stressed";
};

const MoodScoreCard = ({ mood, score, weather }: MoodScoreCardProps) => {
  return (
    <Card className="glass-card h-[300px]">
      <CardHeader className="pb-2">
        <CardTitle className="gradient-text flex items-center gap-2 text-lg font-medium">
          <HeartPulse className="w-4 h-4 text-gradient-start" />
          Today's Mood
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-4">
          <div className="flex items-start gap-3">
            <span className="text-4xl">{getMoodEmoji(score)}</span>
            <div>
              <p className="text-2xl font-bold">{score.toFixed(2)}/10</p>
              <p className="text-sm text-muted-foreground capitalize">{getMoodText(score)}</p>
            </div>
          </div>
          <div className="space-y-1.5">
            <p className="text-sm text-muted-foreground">Weather</p>
            <p className="text-base capitalize">{weather}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MoodScoreCard;