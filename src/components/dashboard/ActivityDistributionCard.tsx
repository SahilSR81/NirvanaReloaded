import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain } from "lucide-react";
import { ActivityPieChart } from "./activities/ActivityPieChart";
import { ActivityLegend } from "./activities/ActivityLegend";

interface ActivityData {
  name: string;
  value: number;
  color: string;
}

interface ActivityDistributionCardProps {
  activities: ActivityData[];
}

const ActivityDistributionCard = ({ activities }: ActivityDistributionCardProps) => {
  return (
    <Card className="h-full bg-card/80 backdrop-blur-sm border border-border/50">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-lg font-medium">
          <Brain className="w-4 h-4 text-primary" />
          Today's Activities
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="w-full md:w-2/3 h-[300px]">
            <ActivityPieChart data={activities} />
          </div>
          <div className="w-full md:w-1/3">
            <ActivityLegend activities={activities} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivityDistributionCard;