import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { mockData } from "@/data/mockContent";

const Index = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-100 to-blue-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex flex-col justify-center">
      <div className="container max-w-3xl mx-auto px-4 py-16 flex-1 flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="w-full"
        >
          <Card className="glass-card shadow-xl rounded-2xl p-8 bg-white/80 dark:bg-slate-900/80">
            <CardHeader className="mb-4">
              <CardTitle className="text-4xl md:text-5xl font-extrabold text-center gradient-text mb-2">
                Welcome to Nirvana
              </CardTitle>
              <p className="text-lg md:text-xl text-muted-foreground text-center font-medium">
                Your AI-powered mental wellness companion
            </p>
            </CardHeader>
            <CardContent className="space-y-8">
              <ul className="space-y-2 text-base md:text-lg text-center text-muted-foreground">
                <li>🌱 Mood tracking with real-time emotion recognition</li>
                <li>🧘 Personalized content, tips, and meditation</li>
                <li>📊 Wellness analytics & AI-generated reports</li>
                <li>🔔 Push/email reminders & milestone celebrations</li>
                <li>🛡️ Secure, private, and user-friendly</li>
              </ul>
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5, type: "spring" }}
                className="flex flex-col md:flex-row gap-4 justify-center"
              >
                <Button size="lg" className="gradient-bg text-white px-8 py-3 text-lg font-semibold shadow-lg" onClick={() => navigate("/signup")}>Get Started</Button>
                <Button size="lg" variant="outline" className="px-8 py-3 text-lg font-semibold" onClick={() => navigate("/login")}>Log In</Button>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Content Sections */}
      <div className="container max-w-5xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Quotes */}
        <Card className="glass-card">
          <CardHeader><CardTitle className="gradient-text">Quote of the Day</CardTitle></CardHeader>
          <CardContent>
            <blockquote className="italic">"{mockData.quotes[0].text}"</blockquote>
            <div className="text-right mt-2 font-semibold">- {mockData.quotes[0].author}</div>
          </CardContent>
        </Card>
        {/* Story */}
        <Card className="glass-card">
          <CardHeader><CardTitle className="gradient-text">Inspiring Story</CardTitle></CardHeader>
          <CardContent>
            <div className="font-semibold mb-2">{mockData.stories[0].title}</div>
            <div className="text-sm">{mockData.stories[0].content}</div>
            <div className="text-xs text-muted-foreground mt-2">Read Time: {mockData.stories[0].readTime}</div>
          </CardContent>
        </Card>
        {/* Joke */}
        <Card className="glass-card">
          <CardHeader><CardTitle className="gradient-text">Mood Lifter</CardTitle></CardHeader>
          <CardContent>
            <div className="font-semibold">{mockData.jokes[0].setup}</div>
            <div className="text-sm mt-1">{mockData.jokes[0].punchline}</div>
          </CardContent>
        </Card>
        {/* Music */}
        <Card className="glass-card">
          <CardHeader><CardTitle className="gradient-text">Peaceful Music</CardTitle></CardHeader>
          <CardContent>
            <div className="font-semibold">{mockData.music[0].title}</div>
            <div className="text-sm">{mockData.music[0].artist} - {mockData.music[0].mood}</div>
            <div className="text-xs text-muted-foreground mt-2">Duration: {mockData.music[0].duration}</div>
          </CardContent>
        </Card>
        {/* Yoga */}
        <Card className="glass-card">
          <CardHeader><CardTitle className="gradient-text">Yoga Practice</CardTitle></CardHeader>
          <CardContent>
            <div className="font-semibold">{mockData.yogaPoses[0].name}</div>
            <div className="text-sm">{mockData.yogaPoses[0].description}</div>
          </CardContent>
        </Card>
        {/* Wisdom */}
        <Card className="glass-card">
          <CardHeader><CardTitle className="gradient-text">Daily Wisdom</CardTitle></CardHeader>
          <CardContent>
            <div className="font-semibold">{mockData.wisdom[0].translation}</div>
            <div className="text-sm">{mockData.wisdom[0].meaning}</div>
          </CardContent>
        </Card>
        {/* Lifestyle Tip */}
        <Card className="glass-card">
          <CardHeader><CardTitle className="gradient-text">Lifestyle Tip</CardTitle></CardHeader>
          <CardContent>
            <div className="font-semibold">{mockData.lifestyle[0].title}</div>
            <div className="text-sm">{mockData.lifestyle[0].description}</div>
          </CardContent>
        </Card>
      </div>

      <footer className="w-full text-center py-6 text-muted-foreground text-sm opacity-80">
        &copy; {new Date().getFullYear()} Nirvana. All rights reserved.
      </footer>
    </div>
  );
};

export default Index;