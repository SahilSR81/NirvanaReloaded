import { useState } from "react";
import { format } from "date-fns";
import { MoodEntry } from "@/types/mood";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { getMoodEmoji } from "@/utils/moodUtils";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

interface TodayEntriesProps {
  entries: MoodEntry[];
}

export const TodayEntries = ({ entries }: TodayEntriesProps) => {
  const [showAll, setShowAll] = useState(false);
  const displayEntries = showAll ? entries : entries.slice(0, 5);
  const hasMore = entries.length > 5;

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="gradient-text">Today's Mood Log</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {displayEntries.map((entry, index) => (
          <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
            <div className="flex items-center gap-3">
              <span className="text-gradient-start font-medium">
                {format(new Date(entry.timestamp), 'hh:mm a')}
              </span>
              <span className="capitalize flex items-center gap-2">
                {getMoodEmoji(entry.mood)} {entry.mood}
              </span>
            </div>
            <div className="flex gap-2">
              {entry.activities.map((activity) => (
                <span key={activity} className="text-sm text-muted-foreground">
                  {activity}
                </span>
              ))}
            </div>
          </div>
        ))}

        {hasMore && (
          <Button
            variant="ghost"
            className="w-full mt-2 text-muted-foreground hover:text-foreground"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? (
              <>
                <ChevronUp className="w-4 h-4 mr-2" />
                Show Less
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4 mr-2" />
                View More ({entries.length - 5} more)
              </>
            )}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}; 