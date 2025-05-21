import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-100 to-blue-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex flex-col justify-center">
      <div className="container max-w-2xl mx-auto px-4 py-16 flex-1 flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="w-full"
        >
          <Card className="glass-card shadow-xl rounded-2xl p-8 bg-white/80 dark:bg-slate-900/80">
            <CardHeader className="mb-4">
              <CardTitle className="text-3xl md:text-4xl font-bold text-center gradient-text mb-2">
                Welcome to Nirvana!
              </CardTitle>
              <p className="text-muted-foreground text-center text-lg">
                Your journey to inner peace and mental wellness starts now.
              </p>
            </CardHeader>
            <CardContent className="space-y-8">
              <ul className="space-y-2 text-base md:text-lg text-center text-muted-foreground">
                <li>🌱 Track your mood and activities</li>
                <li>🧘 Get personalized content and tips</li>
                <li>📊 View your wellness analytics</li>
                <li>🔔 Receive gentle reminders and celebrate milestones</li>
              </ul>
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5, type: "spring" }}
                className="flex flex-col md:flex-row gap-4 justify-center"
              >
                <Button size="lg" className="gradient-bg text-white px-8 py-3 text-lg font-semibold shadow-lg" onClick={() => navigate("/dashboard")}>Go to Dashboard</Button>
                <Button size="lg" variant="outline" className="px-8 py-3 text-lg font-semibold" onClick={() => navigate("/personal-details")}>Complete Profile</Button>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Welcome;