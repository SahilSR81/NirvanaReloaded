import { useState, useEffect, useCallback } from "react";
import { MessageSquareQuote, BookOpen, Smile, Music2, Flower2, Book, Lightbulb } from "lucide-react";
import PageNavigation from "@/components/shared/PageNavigation";
import { ContentCard } from "@/components/content/ContentCard";
import { ContentSection, Quote, Story, Joke, YogaAsana, BhagavadGitaVerse, Music, LifestyleTip } from "@/types/content";
import Navbar from "@/components/shared/Navbar";
import { getFunctions, httpsCallable } from "firebase/functions";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { mockData } from "@/data/mockContent";

const ContentFeed = () => {
  const [refreshStates, setRefreshStates] = useState<{ [key: string]: boolean }>({});
  const [sections, setSections] = useState<ContentSection[]>([
    {
      title: "Daily Quote",
      icon: MessageSquareQuote,
      type: "quote",
      content: null
    },
    {
      title: "Inspiring Story",
      icon: BookOpen,
      type: "story",
      content: null
    },
    {
      title: "Mood Lifter",
      icon: Smile,
      type: "joke",
      content: null
    },
    {
      title: "Peaceful Music",
      icon: Music2,
      type: "music",
      content: null
    },
    {
      title: "Yoga Practice",
      icon: Flower2,
      type: "yoga",
      content: null
    },
    {
      title: "Daily Wisdom",
      icon: Book,
      type: "wisdom",
      content: null
    },
    {
      title: "Lifestyle Tip",
      icon: Lightbulb,
      type: "lifestyle",
      content: null
    }
  ]);

  // AI Suggestions state
  const { user } = useAuth();
  const [aiSuggestions, setAiSuggestions] = useState<any[]>([]);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  const navigate = useNavigate();

  // Fetch AI suggestions
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!user) return;
      const ref = collection(db, "users", user.uid, "aiSuggestions");
      const snap = await getDocs(ref);
      setAiSuggestions(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchSuggestions();
  }, [user]);

  // Fetch all content from AI on mount
  useEffect(() => {
    const fetchAllContent = async () => {
      const functions = getFunctions();
      try {
        const [quoteRes, storyRes, jokeRes, musicRes, yogaRes, wisdomRes, lifestyleRes] = await Promise.all([
          httpsCallable(functions, "adminGenerateQuote")({ n: 1 }),
          httpsCallable(functions, "adminGenerateStory")({ n: 1 }),
          httpsCallable(functions, "adminGenerateJoke")({ n: 1 }),
          httpsCallable(functions, "adminGenerateMusic")({ n: 1 }),
          httpsCallable(functions, "adminGenerateYoga")({ n: 1 }),
          httpsCallable(functions, "adminGenerateWisdom")({ n: 1 }),
          httpsCallable(functions, "adminGenerateLifestyle")({ n: 1 })
        ]);
        setSections([
          { title: "Daily Quote", icon: MessageSquareQuote, type: "quote", content: quoteRes.data[0] },
          { title: "Inspiring Story", icon: BookOpen, type: "story", content: storyRes.data[0] },
          { title: "Mood Lifter", icon: Smile, type: "joke", content: jokeRes.data[0] },
          { title: "Peaceful Music", icon: Music2, type: "music", content: musicRes.data[0] },
          { title: "Yoga Practice", icon: Flower2, type: "yoga", content: yogaRes.data[0] },
          { title: "Daily Wisdom", icon: Book, type: "wisdom", content: wisdomRes.data[0] },
          { title: "Lifestyle Tip", icon: Lightbulb, type: "lifestyle", content: lifestyleRes.data[0] }
        ]);
      } catch (err) {
        // Optionally handle error
      }
    };
    fetchAllContent();
  }, []);

  // Generate new suggestion
  const handleGenerateTip = async () => {
    setAiLoading(true);
    setAiError(null);
    try {
      const functions = getFunctions();
      const generateWellnessTip = httpsCallable(functions, "generateWellnessTip");
      await generateWellnessTip({}); // Optionally pass emotion
      // Refetch suggestions
      if (user) {
        const ref = collection(db, "users", user.uid, "aiSuggestions");
        const snap = await getDocs(ref);
        setAiSuggestions(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      }
    } catch (err: any) {
      setAiError(err.message || "Failed to generate tip.");
    }
    setAiLoading(false);
  };

  const handleRefresh = useCallback(async (index: number) => {
    setRefreshStates(prev => ({ ...prev, [index]: true }));
    
    const section = sections[index];
    let contentArray;
    
    switch (section.type) {
      case "quote":
        contentArray = mockData.quotes;
        break;
      case "story":
        contentArray = mockData.stories;
        break;
      case "joke":
        contentArray = mockData.jokes;
        break;
      case "yoga":
        contentArray = mockData.yogaPoses;
        break;
      case "wisdom":
        contentArray = mockData.wisdom;
        break;
      case "music":
        contentArray = mockData.music;
        break;
      case "lifestyle":
        contentArray = mockData.lifestyle;
        break;
      default:
        return;
    }
    
    // Keep getting new random content until it's different from current
    let newContent;
    do {
      const randomIndex = Math.floor(Math.random() * contentArray.length);
      newContent = contentArray[randomIndex];
    } while (JSON.stringify(newContent) === JSON.stringify(section.content) && contentArray.length > 1);
    
    setSections(prevSections => {
      const newSections = [...prevSections];
      newSections[index] = {
        ...newSections[index],
        content: newContent
      };
      return newSections;
    });
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshStates(prev => ({ ...prev, [index]: false }));
  }, [sections]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-100 to-blue-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <Navbar />
      <div className="pt-24 px-4 pb-8">
        <div className="max-w-5xl mx-auto space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <Card className="glass-card mb-6 shadow-xl rounded-2xl bg-white/80 dark:bg-slate-900/80">
              <CardHeader>
                <CardTitle className="gradient-text text-3xl font-bold text-center">Personalized Content Feed</CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="flex flex-col md:flex-row gap-4 justify-center">
                  <Button onClick={() => navigate("/dashboard")} variant="outline" className="text-lg font-semibold px-6 py-2">Back to Dashboard</Button>
                  <Button onClick={() => navigate("/personalized-help")} className="gradient-bg text-white text-lg font-semibold px-6 py-2">Personalized Help</Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                  {sections.map((section, i) => (
                    <ContentCard
                      key={i}
                      section={section}
                      index={i}
                      onRefresh={() => handleRefresh(i)}
                      isRefreshing={!!refreshStates[i]}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContentFeed;