import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardGrid } from "@/components/dashboard/DashboardGrid";
import { getMoodEmoji, getMoodScore } from "@/utils/moodUtils";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { getDoc, doc, getDocs, collection, query, where, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { MoodEntry } from "@/types/mood";
import { TodayEntries } from "@/components/dashboard/TodayEntries";
import Navbar from "@/components/shared/Navbar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { DashboardCharts } from "@/components/dashboard/DashboardCharts";
import { startOfWeek, endOfWeek, isWithinInterval } from "date-fns";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Line } from "recharts";

const ACTIVITY_EMOJIS: { [key: string]: string } = {
  exercise: "💪",
  meditation: "🧘",
  selfcare: "💆",
  therapy: "🗣️",
  walk: "🚶",
  study: "📚",
  playing: "🎮",
  "today's goal": "🎯"
};

const SCREEN_TIME_EMOJI = {
  high: "⚠️",
  medium: "⚡",
  low: "✨"
};

const Dashboard = () => {
  const [aggregatedData, setAggregatedData] = useState<any[]>([]);
  const [currentScreenTime, setCurrentScreenTime] = useState(0);
  const [todayEntries, setTodayEntries] = useState<MoodEntry[]>([]);
  const [moodHistory, setMoodHistory] = useState<MoodEntry[]>([]);
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  
  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchData = async () => {
      try {
        console.log('Fetching user data...');
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        const userData = userDoc.data();
        
        if (!userData) {
          console.error('No user data found');
          return;
        }

        console.log('User data:', userData);
        
        if (!userData.personalDetailsFilled) {
          navigate("/personal-details");
          return;
        }

        setCurrentScreenTime(userData.screenTime || 0);

        // Get today's entries
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);

        console.log('Fetching today\'s entries...');
        const todayQuery = query(
          collection(db, 'moodHistory'),
          where('userId', '==', user.uid),
          where('timestamp', '>=', startOfDay.toISOString()),
          orderBy('timestamp', 'desc')
        );

        const todaySnapshot = await getDocs(todayQuery);
        const todayData = todaySnapshot.docs.map(doc => doc.data() as MoodEntry);
        console.log('Today\'s entries:', todayData);
        setTodayEntries(todayData);

        // Get all entries for weekly average
        console.log('Fetching mood history...');
        const moodHistoryQuery = query(
          collection(db, 'moodHistory'),
          where('userId', '==', user.uid),
          orderBy('timestamp', 'desc')
        );

        const moodHistorySnapshot = await getDocs(moodHistoryQuery);
        const moodHistoryData = moodHistorySnapshot.docs.map(doc => doc.data() as MoodEntry);
        setMoodHistory(moodHistoryData);

        const processed = aggregateMoodData(moodHistoryData);
        setAggregatedData(processed);

      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        let errorMessage = "Failed to load dashboard data";
        if (error instanceof Error) {
          errorMessage += `: ${error.message}`;
        }
        toast({
          variant: "destructive",
          title: "Error",
          description: errorMessage
        });
      }
    };

    fetchData();
  }, [user, navigate, toast]);

  const latestData = aggregatedData[0] || {
    moodScore: 0,
    weather: 'unknown',
    activities: [],
    sleepQuality: 0
  };

  const getWeeklyEntryCount = (entries: MoodEntry[]) => {
    const now = new Date();
    const weekStart = startOfWeek(now);
    const weekEnd = endOfWeek(now);

    return entries.filter(entry => {
      const entryDate = new Date(entry.timestamp);
      return isWithinInterval(entryDate, { start: weekStart, end: weekEnd });
    }).length;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-100 to-blue-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <Navbar />
      <div className="pt-24 px-4 pb-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <Card className="glass-card mb-6 shadow-xl rounded-2xl bg-white/80 dark:bg-slate-900/80">
              <CardHeader>
                <CardTitle className="gradient-text text-3xl font-bold">Your Wellness Dashboard</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="glass-card">
                    <CardHeader>
                      <CardTitle className="gradient-text">Weekly Overview</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm text-muted-foreground">Current Mood</label>
                          <div className="text-2xl font-bold capitalize flex items-center gap-2">
                            {todayEntries[0] ? (
                              <>
                                {getMoodEmoji(todayEntries[0].mood)} {todayEntries[0].mood}
                              </>
                            ) : (
                              "No mood logged today"
                            )}
                          </div>
                        </div>
                        <div className="text-muted-foreground">
                          {getWeeklyEntryCount(todayEntries)} Entries this week
                        </div>
                        <div className="text-muted-foreground">
                          Average Mood: {calculateAverageMood(aggregatedData)}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="glass-card">
                    <CardHeader>
                      <CardTitle className="gradient-text">Activity Stats</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="text-2xl font-bold">🎯 Top Activities</div>
                        <div className="space-y-2">
                          {getTopActivities(moodHistory).map(activity => (
                            <div key={activity.name} className="flex justify-between">
                              <span className="flex items-center gap-2">
                                {ACTIVITY_EMOJIS[activity.name.toLowerCase()] || "🔵"} {activity.name}
                              </span>
                              <span className="text-muted-foreground">{activity.count}x</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="glass-card">
                    <CardHeader>
                      <CardTitle className="gradient-text">Screen Time</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="text-2xl font-bold flex items-center gap-2">
                          {currentScreenTime > 6 ? SCREEN_TIME_EMOJI.high :
                            currentScreenTime > 3 ? SCREEN_TIME_EMOJI.medium :
                              SCREEN_TIME_EMOJI.low}
                          {currentScreenTime}h Today
                        </div>
                        <div className="text-muted-foreground">
                          Weekly Average: {calculateAverageScreenTime(aggregatedData)}h
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <TodayEntries entries={todayEntries} />

                <DashboardCharts 
                  moodHistory={todayEntries}
                  weeklyData={aggregatedData}
                />

                {/* Mood History Visualization */}
                <div className="mt-12">
                  <h2 className="text-2xl font-bold mb-4 gradient-text">Mood History</h2>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={moodHistory} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="timestamp" tickFormatter={str => new Date(str).toLocaleDateString()} />
                      <YAxis />
                      <Tooltip labelFormatter={str => new Date(str).toLocaleString()} />
                      <Line type="monotone" dataKey="score" stroke="#8884d8" dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <div className="flex flex-col md:flex-row justify-between gap-4 mt-4">
                  <Button 
                    onClick={() => navigate("/mood-tracker")}
                    variant="outline"
                    className="text-lg font-semibold px-6 py-2"
                  >
                    Track Mood
                  </Button>
                  
                  <Button 
                    onClick={() => navigate("/content-feed")}
                    className="gradient-bg text-white text-lg font-semibold px-6 py-2"
                  >
                    View Content
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

// Helper functions
const calculateAverageMood = (data: any[]) => {
  if (data.length === 0) return "N/A";
  const sum = data.reduce((acc, curr) => acc + curr.moodScore, 0);
  return (sum / data.length).toFixed(1);
};

const getTopActivities = (data: MoodEntry[]) => {
  const activities = data.flatMap(entry => entry.activities || []);
  const counts = activities.reduce((acc: {[key: string]: number}, activity) => {
    acc[activity] = (acc[activity] || 0) + 1;
    return acc;
  }, {});
  
  return Object.entries(counts)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 3)
    .map(([name, count]) => ({
      name,
      count
    }));
};

const calculateAverageScreenTime = (data: any[]) => {
  if (data.length === 0) return "N/A";
  const sum = data.reduce((acc, curr) => acc + (curr.screenTime || 0), 0);
  return (sum / data.length).toFixed(1);
};

const aggregateMoodData = (entries: MoodEntry[]) => {
  const today = new Date();
  const monday = startOfWeek(today, { weekStartsOn: 1 });
  
  // Create array of dates from Monday to Sunday
  const weekDays = Array.from({length: 7}, (_, i) => {
    const date = new Date(monday);
    date.setDate(monday.getDate() + i);
    return date.toISOString().split('T')[0];
  });

  // Group entries by date
  const dailyGroups = entries.reduce((acc: {[key: string]: MoodEntry[]}, entry) => {
    const date = new Date(entry.timestamp).toISOString().split('T')[0];
    if (!acc[date]) acc[date] = [];
    acc[date].push(entry);
    return acc;
  }, {});

  // Create data points for each day
  return weekDays.map(date => {
    const dayEntries = dailyGroups[date] || [];
    const avgMoodScore = dayEntries.length > 0
      ? dayEntries.reduce((sum, entry) => sum + getMoodScore(entry.mood), 0) / dayEntries.length
      : 0;

    return {
      date: format(new Date(date), 'EEE'),
      moodScore: Number(avgMoodScore.toFixed(1)),
      entries: dayEntries.length
    };
  });
};