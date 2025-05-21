import { BhagavadGitaVerse } from "@/types/content";

interface WisdomCardProps {
  content: BhagavadGitaVerse;
}

export const WisdomCard = ({ content }: WisdomCardProps) => (
  <div className="space-y-2">
    <p className="text-sm text-muted-foreground">
      Chapter {content.chapter}, Verse {content.verse}
    </p>
    <p className="text-lg font-medium gradient-text">{content.sanskrit}</p>
    <p className="text-foreground/80">{content.translation}</p>
    <p className="text-muted-foreground italic">{content.meaning}</p>
  </div>
);