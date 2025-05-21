import { LifestyleTip } from "@/types/content";

interface LifestyleTipCardProps {
  content: LifestyleTip;
}

const getPersonalizedTip = (category: string) => {
  const personalDetails = JSON.parse(localStorage.getItem("personalDetails") || "{}");
  const tips = {
    sleep: [
      `Based on your sleep schedule (${personalDetails.sleepTime} - ${personalDetails.wakeTime}), try to maintain consistent sleep timing`,
      "Create a relaxing bedtime routine to improve sleep quality",
      "Avoid screen time at least 1 hour before bed"
    ],
    screenTime: [
      "Take regular breaks using the 20-20-20 rule",
      "Use blue light filters in the evening",
      "Set app limits for better digital wellness"
    ],
    exercise: [
      "Start with short walking sessions",
      "Try mindful movement practices",
      "Incorporate stretching into your daily routine"
    ],
    relationship: [
      "Practice active listening with loved ones",
      "Schedule quality time for relationships",
      "Express gratitude regularly"
    ],
    work: [
      `As a ${personalDetails.occupation}, remember to take regular breaks`,
      "Practice time-blocking for better productivity",
      "Set boundaries between work and personal life"
    ],
    hobbies: [
      `Explore new aspects of ${personalDetails.hobbies}`,
      "Schedule dedicated time for your interests",
      "Join communities related to your hobbies"
    ]
  };

  return tips[category as keyof typeof tips]?.[Math.floor(Math.random() * 3)] || 
         "Take small steps towards your wellness goals";
};

export const LifestyleTipCard = ({ content }: LifestyleTipCardProps) => (
  <div className="glass-card p-6 space-y-4">
    <h3 className="text-xl font-semibold gradient-text">{content.title}</h3>
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <p className="text-muted-foreground">
          {content.description}
        </p>
        <span className="inline-block px-3 py-1 text-xs rounded-full bg-gradient-to-r from-gradient-start to-gradient-end text-white">
          {content.category}
        </span>
      </div>
      <div className="bg-background/50 rounded-lg p-4">
        <h4 className="font-medium mb-2">Personalized Tip:</h4>
        <p className="text-muted-foreground">
          {getPersonalizedTip(content.category)}
        </p>
      </div>
    </div>
  </div>
);