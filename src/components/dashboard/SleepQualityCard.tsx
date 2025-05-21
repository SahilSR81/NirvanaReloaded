import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain } from "lucide-react";
import { ChartContainer } from "@/components/ui/chart";
import { PieChart, Pie, Cell } from "recharts";

interface SleepQualityCardProps {
  sleepQuality: number;
}

export function SleepQualityCard({ sleepQuality }: SleepQualityCardProps) {
  const getSleepQualityText = (quality: number) => {
    const texts = ["Very Poor", "Poor", "Average", "Good", "Excellent"];
    return texts[Math.floor(quality)] || "No data";
  };

  const getProgressColor = (quality: number) => {
    const colors = {
      0: "#EF4444",
      1: "#F97316",
      2: "#EAB308",
      3: "#22C55E",
      4: "#00F5D4",
    };
    return colors[Math.floor(quality)] || "#94A3B8";
  };

  return (
    <Card className="h-full bg-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-primary flex items-center gap-2 text-lg">
          <Brain className="w-4 h-4" />
          Sleep Quality
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center h-[200px] relative">
          <ChartContainer
            config={{
              sleep: {
                theme: {
                  light: getProgressColor(sleepQuality),
                  dark: getProgressColor(sleepQuality),
                },
              },
            }}
          >
            <PieChart width={160} height={160}>
              <Pie
                data={[
                  { name: "Sleep Progress", value: sleepQuality ? ((sleepQuality + 1) * 20) : 0 },
                  { name: "Remaining", value: sleepQuality ? (100 - ((sleepQuality + 1) * 20)) : 100 }
                ]}
                cx={80}
                cy={80}
                innerRadius={60}
                outerRadius={75}
                startAngle={90}
                endAngle={-270}
                dataKey="value"
              >
                <Cell fill={getProgressColor(sleepQuality)} stroke="transparent" />
                <Cell fill="hsl(var(--muted))" stroke="transparent" />
              </Pie>
            </PieChart>
          </ChartContainer>
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-2xl font-bold text-foreground">
              {getSleepQualityText(sleepQuality)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}