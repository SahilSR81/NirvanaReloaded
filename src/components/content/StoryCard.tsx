import { Story } from "@/types/content";

interface StoryCardProps {
  content: Story;
}

export const StoryCard = ({ content }: StoryCardProps) => (
  <div className="space-y-3">
    <h3 className="text-lg font-medium bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
      {content.title}
    </h3>
    <p className="text-foreground/80 leading-relaxed">{content.content}</p>
    <div className="flex items-center justify-between text-sm text-muted-foreground">
      <span>{content.readTime} read</span>
      <span className="text-xs px-2 py-1 rounded-full bg-gradient-to-r from-cyan-400/10 to-blue-500/10">
        Inspiring Story
      </span>
    </div>
  </div>
);