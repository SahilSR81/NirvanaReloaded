import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain } from "lucide-react";
import { ChartContainer } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import { format } from "date-fns";

interface WeeklyMoodOverviewProps {
  data: any[];
}

export function WeeklyMoodOverview({ data }: WeeklyMoodOverviewProps) {
  const chartData = data.slice(0, 7).map(day => ({
    date: format(new Date(day.date), 'EEE'),
    score: day.moodScore,
    mood: day.mood || 'neutral'
  })).reverse();

  return (
    <Card className="h-full bg-card/80 backdrop-blur-sm border border-border">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-lg font-medium text-foreground">
          <Brain className="w-4 h-4 text-primary" />
          Weekly Mood Overview
        </CardTitle>
      </CardHeader>
      <CardContent className="h-[calc(100%-5rem)]">
        <ChartContainer
          config={{
            score: {
              theme: {
                light: 'hsl(var(--primary))',
                dark: 'hsl(var(--primary))'
              }
            }
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
              <XAxis 
                dataKey="date" 
                tick={{ fill: 'currentColor' }}
                stroke="currentColor"
                tickLine={{ stroke: 'currentColor' }}
                axisLine={{ stroke: 'currentColor' }}
              />
              <YAxis 
                domain={[0, 10]}
                tick={{ fill: 'currentColor' }}
                stroke="currentColor"
                tickLine={{ stroke: 'currentColor' }}
                axisLine={{ stroke: 'currentColor' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--background)',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                }}
                labelStyle={{ color: 'var(--foreground)' }}
                itemStyle={{ color: 'var(--foreground)' }}
              />
              <Bar 
                dataKey="score"
                fill="currentColor"
                radius={[4, 4, 0, 0]}
                className="fill-primary"
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}