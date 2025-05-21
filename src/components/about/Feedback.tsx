import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";

export const Feedback = () => {
  const [feedback, setFeedback] = useState("");
  const { toast } = useToast();

  const handleSubmit = () => {
    if (feedback.trim()) {
      toast({
        title: "Thank you for your feedback!",
        description: "Your thoughts help us improve and grow together.",
      });
      setFeedback("");
    }
  };

  return (
    <Card className="glass-card">
      <CardHeader className="space-y-1">
        <div className="flex items-center gap-3">
          <MessageSquare className="w-6 h-6 text-gradient-start" />
          <CardTitle className="text-2xl font-semibold gradient-text">Share Your Thoughts</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          placeholder="Express your thoughts freely..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          className="min-h-[150px] bg-background/50 border-white/10"
        />
        <Button onClick={handleSubmit} className="modern-button w-full">
          Submit Feedback
        </Button>
      </CardContent>
    </Card>
  );
};