import { Music } from "@/types/content";

interface MusicCardProps {
  content: Music;
}

export const MusicCard = ({ content }: MusicCardProps) => (
  <div className="space-y-2">
    <h3 className="text-xl font-semibold gradient-text">{content.title}</h3>
    <div className="space-y-1">
      <p className="text-muted-foreground">Artist: {content.artist}</p>
      <p className="text-muted-foreground">Mood: {content.mood}</p>
      <p className="text-sm text-muted-foreground">{content.duration}</p>
    </div>
  </div>
);