import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import WeatherSection from "@/components/mood-tracker/WeatherSection";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Brain, Dumbbell, Heart, MessageSquare, Footprints, BookOpen, Gamepad, Award } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import ScreenTimeInput from "@/components/mood-tracker/ScreenTimeInput";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/shared/Navbar";
import { FacialEmotionDetector } from "@/components/mood-tracker/FacialEmotionDetector";
import { Input } from "@/components/ui/input";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

const ENV_CONTEXTS = [
  "Home", "Work", "School", "Outdoors", "Social Event", "Alone", "Other"
];

function getMoodScore(emotion: string, confidence: number): number {
  // Example logic: happy/calm = high, neutral = medium, sad/angry/stressed = low
  const base = {
    happy: 90,
    calm: 80,
    neutral: 60,
    sad: 30,
    angry: 20,
    stressed: 25,
    surprised: 70,
    fearful: 20,
    disgusted: 15,
  };
  const b = base[emotion] ?? 50;
  // Weight by confidence (0-100)
  return Math.round(b * (confidence / 100));
}

const MoodTracker = () => {
  const navigate = useNavigate();
  const [detectedMood, setDetectedMood] = useState<string | null>(null);
  const [detectedConfidence, setDetectedConfidence] = useState<number>(0);
  const [selectedWeather, setSelectedWeather] = useState<string | null>(null);
  const [weatherRating, setWeatherRating] = useState(5);
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const [sleepQuality, setSleepQuality] = useState(3);
  const [screenTime, setScreenTime] = useState(1);
  const [notes, setNotes] = useState('');
  const [envContext, setEnvContext] = useState('');
  const { user } = useAuth();
  const [moodHistory, setMoodHistory] = useState<any[]>([]);

  const activities = [
    { icon: Dumbbell, label: "Exercise", value: "exercise" },
    { icon: Brain, label: "Meditation", value: "meditation" },
    { icon: Heart, label: "Self-care", value: "selfcare" },
    { icon: MessageSquare, label: "Therapy", value: "therapy" },
    { icon: Footprints, label: "Walk", value: "walk" },
    { icon: BookOpen, label: "Study", value: "study" },
    { icon: Gamepad, label: "Playing", value: "playing" },
    { icon: Award, label: "Today's Goal", value: "today's goal" }
  ];

  const handleActivityToggle = (value: string) => {
    setSelectedActivities(prev => 
      prev.includes(value) 
        ? prev.filter(activity => activity !== value)
        : [...prev, value]
    );
  };

  // Fetch mood history for chart
  useEffect(() => {
    const fetchHistory = async () => {
      if (!user) return;
      const moodsRef = collection(db, 'users', user.uid, 'moods');
      const snapshot = await getDocs(moodsRef);
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMoodHistory(data.sort((a, b) => new Date((a as any).timestamp ?? 0).getTime() - new Date((b as any).timestamp ?? 0).getTime()));
    };
    fetchHistory();
  }, [user]);

  const handleSubmit = async () => {
    try {
      if (!detectedMood || !user) {
        toast.error("Please let the webcam detect your mood.");
        return;
      }
      const score = getMoodScore(detectedMood, detectedConfidence);
      const entry = {
        emotion: detectedMood,
        confidence: detectedConfidence,
        score,
        timestamp: new Date().toISOString(),
        activities: selectedActivities,
        notes,
        envContext,
        weather: selectedWeather,
        weatherRating,
        sleepQuality,
        screenTime,
      };
      // Save to /users/{uid}/moods/{entryId}
      const moodsRef = collection(db, 'users', user.uid, 'moods');
      await addDoc(moodsRef, entry);
      toast.success("Your mood has been tracked successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error('Mood tracking error:', error);
      toast.error("Failed to save mood data. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20 px-6 pb-6">
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-center mb-8 gradient-text">Daily Mood Tracker</h1>

          {/* Facial Emotion Detector */}
          <FacialEmotionDetector onDetect={(emotion, confidence) => {
            setDetectedMood(emotion);
            setDetectedConfidence(confidence);
          }} />

          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="gradient-text">Detected Mood & Score</CardTitle>
            </CardHeader>
            <CardContent>
                  <div className="flex flex-col items-center gap-2">
                <div className="text-xl font-bold gradient-text">
                  {detectedMood ? detectedMood.charAt(0).toUpperCase() + detectedMood.slice(1) : '...'}
                </div>
                <div className="text-lg text-muted-foreground">
                  Confidence: {detectedConfidence}%
                </div>
                <div className="text-lg font-semibold">
                  Mood Score: {detectedMood ? getMoodScore(detectedMood, detectedConfidence) : '--'}
                </div>
                  </div>
            </CardContent>
          </Card>
          
          <WeatherSection
            selectedWeather={selectedWeather}
            weatherRating={weatherRating}
            onWeatherSelect={setSelectedWeather}
            onWeatherRatingChange={setWeatherRating}
          />
          
          <Card className="glass-card border-0">
            <CardHeader>
              <CardTitle className="gradient-text">What activities did you do today?</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {activities.map(({ icon: Icon, label, value }) => (
                <button
                  key={value}
                  onClick={() => handleActivityToggle(value)}
                  className={`p-4 rounded-lg border transition-all duration-300 hover:border-gradient-start ${
                    selectedActivities.includes(value) 
                      ? 'border-gradient-start bg-white/5' 
                      : 'border-white/10'
                  }`}
                >
                  <Icon className={`w-8 h-8 mb-2 ${
                    selectedActivities.includes(value) ? 'text-gradient-start' : 'text-foreground/60'
                  }`} />
                  <div className="text-sm">{label}</div>
                </button>
              ))}
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="gradient-text">Sleep & Screen Time</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <p className="mb-2">How well did you sleep yesterday?</p>
                <Slider
                  value={[sleepQuality]}
                  onValueChange={(value) => setSleepQuality(value[0])}
                  max={4}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-muted-foreground mt-2">
                  {["Very Poor", "Poor", "Average", "Good", "Excellent"].map((label, index) => (
                    <span
                      key={label}
                      className={`${index === sleepQuality ? 'text-foreground font-medium' : ''}`}
                    >
                      {label}
                    </span>
                  ))}
                </div>
              </div>
              <ScreenTimeInput 
                screenTime={screenTime}
                onChange={setScreenTime}
              />
            </CardContent>
          </Card>

          {/* Notes and Environmental Context */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="gradient-text">Notes & Context</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                placeholder="Add any notes (optional)"
                value={notes}
                onChange={e => setNotes(e.target.value)}
              />
              <select
                className="w-full p-2 rounded border border-input bg-background text-base"
                value={envContext}
                onChange={e => setEnvContext(e.target.value)}
              >
                <option value="">Select environment/context (optional)</option>
                {ENV_CONTEXTS.map(ctx => (
                  <option key={ctx} value={ctx}>{ctx}</option>
                ))}
              </select>
            </CardContent>
          </Card>

          <div className="flex justify-center">
            <Button
              onClick={handleSubmit}
              className="modern-button text-lg"
            >
              Log Today's Entry
            </Button>
          </div>

          <div className="flex justify-between mt-4">
            <Button 
              onClick={() => navigate("/dashboard")}
              variant="outline"
            >
              Back to Dashboard
            </Button>
          </div>

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
        </div>
      </div>
    </div>
  );
};

export default MoodTracker;