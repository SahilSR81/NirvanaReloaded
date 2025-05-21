import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Droplets } from "lucide-react";

interface WaterIntakeCardProps {
  currentIntake: number;
  dailyGoal: number;
}

const WaterIntakeCard = ({ currentIntake, dailyGoal }: WaterIntakeCardProps) => {
  const progress = Math.min((currentIntake / dailyGoal) * 100, 100);

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="gradient-text flex items-center gap-2">
          <Droplets className="w-5 h-5 text-gradient-middle" />
          Water Intake
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Progress value={progress} className="h-2" />
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">{currentIntake}ml / {dailyGoal}ml</span>
          <span className="text-muted-foreground">{progress.toFixed(2)}%</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default WaterIntakeCard;