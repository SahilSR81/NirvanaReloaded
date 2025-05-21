import { Quote } from "@/types/content";

interface QuoteCardProps {
  content: Quote;
}

export const QuoteCard = ({ content }: QuoteCardProps) => (
  <div className="space-y-2">
    <p className="text-lg italic gradient-text">{content.text}</p>
    <p className="text-muted-foreground">- {content.author}</p>
  </div>
);