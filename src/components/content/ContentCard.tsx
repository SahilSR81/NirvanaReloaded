import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { ContentSection, Quote, Story, Joke, YogaAsana, BhagavadGitaVerse, Music, LifestyleTip } from "@/types/content";
import { QuoteCard } from "./QuoteCard";
import { StoryCard } from "./StoryCard";
import { JokeCard } from "./JokeCard";
import { YogaCard } from "./YogaCard";
import { WisdomCard } from "./WisdomCard";
import { MusicCard } from "./MusicCard";
import { LifestyleTipCard } from "./LifestyleTipCard";
import { motion } from "framer-motion";

interface ContentCardProps {
  section: ContentSection;
  index: number;
  onRefresh: () => Promise<void>;
  isRefreshing: boolean;
}

export const ContentCard = ({ section, index, onRefresh, isRefreshing }: ContentCardProps) => {
  const renderContent = () => {
    if (!section.content) {
      return <div className="text-muted-foreground italic">No content available.</div>;
    }
    switch (section.type) {
      case "quote":
        return <QuoteCard content={section.content as Quote} />;
      case "story":
        return <StoryCard content={section.content as Story} />;
      case "joke":
        return <JokeCard content={section.content as Joke} />;
      case "yoga":
        return <YogaCard content={section.content as YogaAsana} />;
      case "wisdom":
        return <WisdomCard content={section.content as BhagavadGitaVerse} />;
      case "music":
        return <MusicCard content={section.content as Music} />;
      case "lifestyle":
        return <LifestyleTipCard content={section.content as LifestyleTip} />;
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="glass-card hover:shadow-lg transition-all duration-300 h-full">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-3 text-xl">
            <section.icon className="w-6 h-6 text-gradient-start" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
              {section.title}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="min-h-[120px]">
            {renderContent()}
          </div>
          <Button
            className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white transition-all duration-300"
            onClick={onRefresh}
            disabled={isRefreshing}
          >
            {isRefreshing ? (
              <span className="flex items-center justify-center gap-2">
                <RefreshCw className="w-4 h-4 animate-spin" />
                Refreshing...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <RefreshCw className="w-4 h-4" />
                Refresh
              </span>
            )}
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};