import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

interface ActivityData {
  name: string;
  value: number;
  color: string;
}

interface ActivityPieChartProps {
  data: ActivityData[];
}

export const ActivityPieChart = ({ data }: ActivityPieChartProps) => {
  // Sort data by value in descending order and filter out 0 values
  const sortedData = [...data]
    .filter(item => item.value > 0)
    .sort((a, b) => b.value - a.value);

  if (sortedData.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground">
        No activities recorded today
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={sortedData}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={90}
          paddingAngle={2}
          dataKey="value"
          nameKey="name"
          label={({
            cx,
            cy,
            midAngle,
            innerRadius,
            outerRadius,
            value,
            name
          }) => {
            const RADIAN = Math.PI / 180;
            const radius = 25 + innerRadius + (outerRadius - innerRadius);
            const x = cx + radius * Math.cos(-midAngle * RADIAN);
            const y = cy + radius * Math.sin(-midAngle * RADIAN);

            return value > 10 ? (
              <text
                x={x}
                y={y}
                className="text-xs"
                fill="currentColor"
                textAnchor={x > cx ? 'start' : 'end'}
                dominantBaseline="central"
              >
                {`${name} (${value}%)`}
              </text>
            ) : null;
          }}
        >
          {sortedData.map((entry, index) => (
            <Cell 
              key={`cell-${index}`}
              fill={entry.color}
              stroke="var(--background)"
              strokeWidth={2}
            />
          ))}
        </Pie>
        <Tooltip
          formatter={(value: number) => `${value}%`}
          contentStyle={{
            backgroundColor: 'var(--background)',
            border: '1px solid var(--border)',
            borderRadius: '8px',
            padding: '8px'
          }}
          itemStyle={{ color: 'var(--foreground)' }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};