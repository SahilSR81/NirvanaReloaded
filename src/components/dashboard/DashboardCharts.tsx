import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { getMoodScore } from "@/utils/moodUtils";

interface DashboardChartsProps {
  moodHistory: any[];
  weeklyData: any[];
}

// Update color mapping with darker, more vibrant colors for dark mode
const MOOD_COLORS: { [key: string]: string } = {
  happy: "#4ADE80",    // Brighter green
  HAPPY: "#4ADE80",
  calm: "#38BDF8",     // Brighter blue
  CALM: "#38BDF8",
  neutral: "#A78BFA",  // Brighter purple
  NEUTRAL: "#A78BFA",
  sad: "#FB923C",      // Brighter orange
  SAD: "#FB923C",
  stressed: "#F472B6", // Brighter pink
  STRESSED: "#F472B6"
};

export const DashboardCharts = ({ moodHistory, weeklyData }: DashboardChartsProps) => {
  // Calculate mood distribution
  const moodCounts = moodHistory.reduce((acc: {[key: string]: number}, entry) => {
    acc[entry.mood] = (acc[entry.mood] || 0) + 1;
    return acc;
  }, {});

  const pieData = Object.entries(moodCounts).map(([mood, count]) => ({
    name: mood,
    value: count
  }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="gradient-text">Today's Mood Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  label={({ name, percent, value }) => 
                    `${name} (${getMoodScore(name).toFixed(1)}) ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={100}
                  innerRadius={60}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry) => (
                    <Cell 
                      key={`cell-${entry.name}`} 
                      fill={MOOD_COLORS[entry.name] || "#94A3B8"}
                      strokeWidth={2}
                    />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number, name: string) => [
                    `${value} entries (Score: ${getMoodScore(name).toFixed(1)})`,
                    name
                  ]}
                  contentStyle={{ 
                    backgroundColor: '#1e293b', 
                    border: 'none',
                    borderRadius: '8px',
                    padding: '8px 12px'
                  }}
                  itemStyle={{ 
                    color: '#e2e8f0'  // Light text for dark background
                  }}
                  labelStyle={{
                    color: '#94a3b8'  // Muted text for the label
                  }}
                  wrapperStyle={{
                    outline: 'none'  // Remove focus outline
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Bar Chart remains the same but update gradient */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="gradient-text">Weekly Mood Report</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData}>
                <XAxis 
                  dataKey="date" 
                  stroke="#94a3b8" 
                  fontSize={12}
                />
                <YAxis 
                  stroke="#94a3b8"
                  fontSize={12}
                  domain={[0, 10]}
                  ticks={[0, 2, 4, 6, 8, 10]}
                />
                <Tooltip 
                  cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }}
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      const value = Number(payload[0].value);  // Convert to number
                      return (
                        <div className="bg-[#1e293b] px-3 py-2 rounded-lg border border-border">
                          <p className="text-sm font-medium text-muted-foreground">{label}</p>
                          <p className="text-sm font-bold text-foreground">
                            Score: {value}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {value > 7 ? "Happy" : 
                             value > 5 ? "Calm" : 
                             value > 3 ? "Neutral" : "Sad"}
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar 
                  dataKey="moodScore" 
                  radius={[4, 4, 0, 0]}
                  maxBarSize={50}
                >
                  {weeklyData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.moodScore > 7 ? "#4ADE80" : 
                            entry.moodScore > 5 ? "#38BDF8" : 
                            entry.moodScore > 3 ? "#A78BFA" : "#FB923C"}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}; 