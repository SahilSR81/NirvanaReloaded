import { ElementType } from "react";

export interface Quote {
  text: string;
  author: string;
}

export interface Story {
  title: string;
  content: string;
  readTime: string;
}

export interface Joke {
  setup: string;
  punchline: string;
}

export interface YogaAsana {
  name: string;
  difficulty: string;
  description: string;
  benefits: string[];
  instructions: string[];
  imageUrl: string;
}

export interface BhagavadGitaVerse {
  chapter: number;
  verse: number;
  sanskrit: string;
  translation: string;
  meaning: string;
}

export interface Music {
  title: string;
  artist: string;
  mood: string;
  duration: string;
}

export interface LifestyleTip {
  title: string;
  description: string;
  category: string;
}

export type ContentType = "quote" | "story" | "joke" | "yoga" | "wisdom" | "music" | "lifestyle";

export interface ContentSection {
  title: string;
  icon: ElementType;
  type: ContentType;
  content: Quote | Story | Joke | YogaAsana | BhagavadGitaVerse | Music | LifestyleTip;
}
