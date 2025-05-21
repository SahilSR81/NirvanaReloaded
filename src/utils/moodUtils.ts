import { format } from "date-fns";

export interface MoodEntry {
  mood: string;
  weather: string;
  weatherRating: number;
  activities: string[];
  sleepQuality: number;
  screenTime: number;
  timestamp: string;
}

export const getMoodScore = (mood: string) => {
  const scores: { [key: string]: number } = {
    happy: 9,
    calm: 7,
    neutral: 5,
    sad: 3,
    stressed: 2
  };
  return scores[mood] || 5;
};

export const calculateTotalMoodScore = (entry: MoodEntry) => {
  // Base mood score (40% weight)
  const moodScore = getMoodScore(entry.mood) * 0.4;
  
  // Weather impact (10% weight)
  const weatherImpact = (entry.weatherRating || 5) * 0.1;
  
  // Activities impact (30% weight)
  let activityScore = 0;
  const hasGoal = entry.activities.includes("today's goal");
  
  if (hasGoal) {
    // If today's goal is selected, it contributes 50% of activity score
    activityScore = ((entry.activities.length - 1) * 0.5 + 5) * 0.3;
  } else {
    activityScore = (entry.activities.length) * 0.3;
  }
  
  // Sleep quality (20% weight)
  const sleepScore = ((entry.sleepQuality + 1) * 2) * 0.2;
  
  // Calculate final score (0-10 scale)
  const totalScore = Math.min(Math.max(
    moodScore + weatherImpact + activityScore + sleepScore,
    0
  ), 10);

  return Number(totalScore.toFixed(2));
};

export const getMoodEmoji = (mood: string) => {
  const emojis: { [key: string]: string } = {
    happy: "😊",
    calm: "😌",
    neutral: "😐",
    sad: "😢",
    stressed: "😰"
  };
  return emojis[mood] || "😐";
};

export const aggregateMoodData = (entries: MoodEntry[]) => {
  // Group entries by day
  const dailyGroups = entries.reduce((acc, entry) => {
    const date = new Date(entry.timestamp).toLocaleDateString();
    if (!acc[date]) acc[date] = [];
    acc[date].push(entry);
    return acc;
  }, {} as Record<string, MoodEntry[]>);

  // Calculate daily averages
  return Object.entries(dailyGroups).map(([date, dayEntries]) => {
    const moodScores = dayEntries.map(entry => getMoodScore(entry.mood));
    return {
      date,
      moodScore: moodScores.reduce((a, b) => a + b, 0) / moodScores.length,
      activities: [...new Set(dayEntries.flatMap(e => e.activities))],
      weather: dayEntries[0].weather,
      sleepQuality: dayEntries[0].sleepQuality
    };
  });
};

export const getActivityColor = (activity: string) => {
  const colors: { [key: string]: string } = {
    exercise: "#00F5D4",
    meditation: "#0094FF",
    selfcare: "#9B57FF",
    therapy: "#F97316",
    walk: "#D946EF",
    study: "#22C55E",
    playing: "#EAB308",
    "today's goal": "#EC4899"  // Renamed from 'goal'
  };
  return colors[activity] || "#94A3B8";
};
