import { quotes } from './quotes';
import { jokes } from './jokes';
import { yogaPoses } from './yogaPoses';
import { stories } from './stories';
import { music } from './music';
import { lifestyle } from './lifestyle';
import { wisdom } from './wisdom';

export const mockData = {
  quotes: [
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
    { text: "In the middle of difficulty lies opportunity.", author: "Albert Einstein" },
    { text: "Peace comes from within. Do not seek it without.", author: "Buddha" },
    { text: "The journey of a thousand miles begins with one step.", author: "Lao Tzu" },
    { text: "Be the change you wish to see in the world.", author: "Mahatma Gandhi" },
    { text: "Every moment is a fresh beginning.", author: "T.S. Eliot" },
    { text: "Life is what happens while you're busy making other plans.", author: "John Lennon" },
    { text: "Happiness is not something ready made. It comes from your own actions.", author: "Dalai Lama" },
    { text: "The greatest glory in living lies not in never falling, but in rising every time we fall.", author: "Nelson Mandela" },
    { text: "The only limit to our realization of tomorrow will be our doubts of today.", author: "Franklin D. Roosevelt" },
    { text: "What you get by achieving your goals is not as important as what you become by achieving your goals.", author: "Zig Ziglar" },
    { text: "The mind is everything. What you think you become.", author: "Buddha" },
    { text: "Your time is limited, don't waste it living someone else's life.", author: "Steve Jobs" },
    { text: "The best way to predict the future is to create it.", author: "Peter Drucker" },
    { text: "Everything has beauty, but not everyone sees it.", author: "Confucius" },
    { text: "The quieter you become, the more you can hear.", author: "Ram Dass" },
    { text: "You are not a drop in the ocean. You are the entire ocean in a drop.", author: "Rumi" },
    { text: "Happiness is when what you think, what you say, and what you do are in harmony.", author: "Mahatma Gandhi" },
    { text: "The wound is the place where the Light enters you.", author: "Rumi" },
    { text: "Yesterday I was clever, so I wanted to change the world. Today I am wise, so I am changing myself.", author: "Rumi" }
  ],
  jokes: [
    { setup: "Why don't meditating eggs get along?", punchline: "They're too zen-sitive!" },
    { setup: "What did the yoga instructor say when the student asked for a discount?", punchline: "Namaste where the prices are!" },
    { setup: "Why did the mindfulness app go to therapy?", punchline: "It had too many unresolved notifications!" },
    { setup: "What do you call a peaceful dinosaur?", punchline: "A meditation-saurus!" },
    { setup: "Why did the meditation cushion feel lonely?", punchline: "Because everyone was sitting in silence!" },
    { setup: "What did the yogi say to the hot dog vendor?", punchline: "Make me one with everything!" },
    { setup: "Why did the chakra go to the doctor?", punchline: "It was feeling out of balance!" },
    { setup: "What kind of tea do yoga teachers love?", punchline: "Flexi-bili-tea!" },
    { setup: "What did the meditation app say to the user?", punchline: "Don't stress, I've got your back!" },
    { setup: "Why did the mindful person bring a ladder to tea?", punchline: "They were told to elevate their consciousness!" },
    { setup: "What do you call a mindful snowman?", punchline: "Zen Frosty!" },
    { setup: "Why did the meditation cushion go to therapy?", punchline: "It had too many emotional stuffings!" },
    { setup: "What did the mindful coffee say?", punchline: "I'm really grounded!" },
    { setup: "Why did the mindful cookie go to therapy?", punchline: "It was feeling crumbly!" },
    { setup: "What did one meditation cushion say to the other?", punchline: "Let's get down to business!" },
    { setup: "What did the Buddhist say to the hot dog vendor?", punchline: "Make me one with everything!" },
    { setup: "Why don't Buddhists vacuum in the corners?", punchline: "Because they have no attachments!" },
    { setup: "What did the meditation app say to the stressed user?", punchline: "Take it easy, I've got your back!" }
  ],
  yogaPoses,
  stories: [
    { 
      title: "The Butterfly Effect", 
      content: "A small act of kindness today can create massive positive change tomorrow.",
      readTime: "2 min" 
    },
    { 
      title: "The Power of Persistence", 
      content: "After trying for years, the small ant finally reached the summit. Nature's reminder that persistence pays off.",
      readTime: "3 min" 
    },
    {
      title: "The Two Wolves",
      content: "An old Cherokee told his grandson about a battle that goes on inside people. He said, 'My son, the battle is between two wolves. One is Evil - it is anger, envy, jealousy, sorrow, regret, greed, arrogance, self-pity, guilt, resentment, inferiority, lies, false pride, superiority, and ego. The other is Good - it is joy, peace, love, hope, serenity, humility, kindness, benevolence, empathy, generosity, truth, compassion, and faith.' The grandson thought about it and asked, 'Which wolf wins?' The old Cherokee replied, 'The one you feed.'",
      readTime: "4 min"
    },
    {
      title: "The Bamboo Tree",
      content: "Like the Chinese bamboo tree, success often requires patience and persistence. For five years, the tree shows no visible signs of growth above ground, but develops a complex root system underground. In the fifth year, it suddenly grows up to 80 feet tall in just six weeks.",
      readTime: "3 min"
    },
    {
      title: "The Empty Cup",
      content: "A university professor visited a Zen master to learn about Zen. While the master served tea, he kept pouring even after the cup was full. The professor watched the overflow until he could no longer restrain himself: 'It's overfull! No more will go in!' The master replied: 'Like this cup, you are full of your own opinions and speculations. How can I show you Zen unless you first empty your cup?'",
      readTime: "3 min"
    },
    {
      title: "The Zen Master's Tea Cup",
      content: "A professor visited a Zen master. As they sat, the master poured the visitor's teacup full and kept pouring. The professor watched the overflow until he could no longer restrain himself: 'It's overfull!' The master replied: 'Like this cup, you are full of your own opinions. How can you learn unless you first empty your cup?'",
      readTime: "2 min"
    },
    {
      title: "The Elephant Rope",
      content: "As a man was passing the elephants, he suddenly stopped, confused by the fact that these huge creatures were being held by only a small rope tied to their front leg. It was obvious that the elephants could, at any time, break away from their bonds but for some reason, they did not. He saw a trainer and asked why these animals just stood there and made no attempt to get away. The trainer said, 'When they are very young and much smaller we use the same size rope to tie them and, at that age, it's enough to hold them. As they grow up, they are conditioned to believe they cannot break away. They believe the rope can still hold them, so they never try to break free.'",
      readTime: "4 min"
    }
  ],
  music: [
    {
      title: "Peaceful Morning",
      artist: "Nature Sounds",
      mood: "Calm",
      duration: "5 min"
    },
    {
      title: "Ocean Waves",
      artist: "Meditation Music",
      mood: "Relaxing",
      duration: "10 min"
    },
    {
      title: "Forest Rain",
      artist: "Ambient Sounds",
      mood: "Peaceful",
      duration: "8 min"
    },
    {
      title: "Mountain Stream",
      artist: "Natural Harmony",
      mood: "Serene",
      duration: "7 min"
    },
    {
      title: "Evening Meditation",
      artist: "Zen Masters",
      mood: "Tranquil",
      duration: "15 min"
    },
    {
      title: "Mindful Moments",
      artist: "Zen Garden",
      mood: "Peaceful",
      duration: "12 min"
    },
    {
      title: "Inner Peace",
      artist: "Soul Whispers",
      mood: "Calming",
      duration: "8 min"
    },
    {
      title: "Zen Garden Sounds",
      artist: "Nature's Symphony",
      mood: "Peaceful",
      duration: "15 min"
    },
    {
      title: "Rainfall Meditation",
      artist: "Earth Sounds",
      mood: "Calming",
      duration: "20 min"
    }
  ],
  wisdom: [
    {
      chapter: 2,
      verse: 47,
      sanskrit: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।",
      translation: "You have the right to work only, but never to its fruits.",
      meaning: "Focus on your actions, not on their results."
    },
    {
      chapter: 2,
      verse: 48,
      sanskrit: "योगस्थः कुरु कर्माणि सङ्गं त्यक्त्वा धनञ्जय।",
      translation: "Perform your duties established in yoga, abandoning attachment.",
      meaning: "Work with dedication without being attached to outcomes."
    },
    {
      chapter: 3,
      verse: 19,
      sanskrit: "तस्माद् असक्तः सततं कार्यं कर्म समाचर।",
      translation: "Therefore, without attachment, perform always the work that has to be done.",
      meaning: "Perform your duties without expecting rewards."
    },
    {
      chapter: 4,
      verse: 7,
      sanskrit: "यदा यदा हि धर्मस्य ग्लानिर्भवति भारत।",
      translation: "Whenever there is a decline in righteousness and rise in unrighteousness.",
      meaning: "Divine intervention occurs when dharma declines."
    },
    {
      chapter: 18,
      verse: 78,
      sanskrit: "यत्र योगेश्वरः कृष्णो यत्र पार्थो धनुर्धरः।",
      translation: "Wherever there is Krishna and Arjuna, there will be prosperity and victory.",
      meaning: "Success follows when divine guidance meets human effort."
    }
  ],
  lifestyle: [
    {
      title: "Morning Hydration",
      description: "Start your day with a glass of water to boost metabolism and energy levels.",
      category: "health"
    },
    {
      title: "Digital Sunset",
      description: "Turn off screens an hour before bed for better sleep quality.",
      category: "sleep"
    },
    {
      title: "Mindful Breaks",
      description: "Take short breaks every hour to stretch and reset your focus.",
      category: "work"
    },
    {
      title: "Social Connection",
      description: "Spend quality time with loved ones daily to nurture relationships.",
      category: "relationship"
    },
    {
      title: "Creative Expression",
      description: "Dedicate time to pursue your hobbies and creative interests.",
      category: "hobbies"
    },
    {
      title: "Mindful Eating",
      description: "Take time to appreciate each bite and eat without distractions.",
      category: "health"
    },
    {
      title: "Nature Connection",
      description: "Spend at least 15 minutes outdoors connecting with nature daily.",
      category: "wellness"
    },
    {
      title: "Gratitude Practice",
      description: "Write down three things you're grateful for each morning to start your day positively.",
      category: "mindfulness"
    },
    {
      title: "Tech-Free Time",
      description: "Designate one hour each day as technology-free time for mental clarity.",
      category: "digital-wellness"
    }
  ]
};
