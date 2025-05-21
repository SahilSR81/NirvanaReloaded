import React from "react";
import { SleepQualityCard } from "./SleepQualityCard";
import MoodScoreCard from "./MoodScoreCard";
import { ScreenTimeCard } from "./ScreenTimeCard";
import ActivityDistributionCard from "./ActivityDistributionCard";
import { WeeklyMoodOverview } from "./WeeklyMoodOverview";

interface DashboardGridProps {
  latestData: {
    moodScore: number;
    weather: string;
    activities: any[];
    sleepQuality: number;
    mood?: string;
  };
  aggregatedData: any[];
  currentScreenTime: number;
}

export const DashboardGrid = ({ latestData, aggregatedData, currentScreenTime }: DashboardGridProps) => {
  return (
    <div className="container max-w-7xl mx-auto space-y-8 p-6">
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <div className="h-[300px]">
          <SleepQualityCard sleepQuality={latestData.sleepQuality} />
        </div>
        <div className="h-[300px]">
          <MoodScoreCard 
            mood={latestData.mood || "neutral"}
            score={latestData.moodScore}
            weather={latestData.weather}
          />
        </div>
        <div className="h-[300px]">
          <ScreenTimeCard screenTime={currentScreenTime} />
        </div>
      </div>
      
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        <div className="h-[400px]">
          <ActivityDistributionCard activities={latestData.activities} />
        </div>
        <div className="h-[400px]">
          <WeeklyMoodOverview data={aggregatedData} />
        </div>
      </div>
    </div>
  );
};