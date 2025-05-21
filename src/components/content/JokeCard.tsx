import { Joke } from "@/types/content";

interface JokeCardProps {
  content: Joke;
}

export const JokeCard = ({ content }: JokeCardProps) => (
  <div className="space-y-2">
    <p className="text-lg gradient-text">{content.setup}</p>
    <p className="text-foreground/80 italic">{content.punchline}</p>
  </div>
);