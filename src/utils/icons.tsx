import { 
  Sparkles, 
  Sun, 
  Moon, 
  Heart, 
  Flower2, 
  Star,
  Smile,
  Cloud,
  Music,
  Coffee,
  Book,
  Compass,
  Lightbulb,
  Target,
  Zap,
  Feather
} from "lucide-react";

export const Icons = {
  wellness: Sparkles,
  mindfulness: Flower2,
  lifestyle: Heart,
  star: Star,
  sun: Sun,
  moon: Moon,
  mood: Smile,
  weather: Cloud,
  music: Music,
  coffee: Coffee,
  book: Book,
  compass: Compass,
  idea: Lightbulb,
  target: Target,
  energy: Zap,
  peace: Feather
} as const;

export type IconType = keyof typeof Icons;