interface ActivityData {
  name: string;
  value: number;
  color: string;
}

interface ActivityLegendProps {
  activities: ActivityData[];
}

export const ActivityLegend = ({ activities }: ActivityLegendProps) => {
  // Sort activities by value in descending order
  const sortedActivities = [...activities]
    .filter(activity => activity.value > 0)
    .sort((a, b) => b.value - a.value);

  if (sortedActivities.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 gap-2">
      {sortedActivities.map((activity, index) => (
        <div 
          key={index} 
          className="flex items-center gap-2 hover:bg-accent/50 p-2 rounded-md transition-colors"
        >
          <div 
            className="w-3 h-3 rounded-full" 
            style={{ backgroundColor: activity.color }}
          />
          <span className="text-sm text-muted-foreground whitespace-nowrap">
            {activity.name} ({activity.value}%)
          </span>
        </div>
      ))}
    </div>
  );
};