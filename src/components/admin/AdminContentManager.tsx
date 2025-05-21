import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Table, TableHead, TableRow, TableHeader, TableBody, TableCell } from "@/components/ui/table";
import { Loader2, Plus, RefreshCw, Edit, Trash } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// Utility to fetch quotes from OpenAI via Firebase Function
async function fetchQuotesFromAI(n = 5): Promise<{ text: string; author: string }[]> {
  // Use your Firebase Functions base URL (local or deployed)
  const baseUrl = import.meta.env.VITE_FUNCTIONS_BASE_URL || "http://localhost:5001/nirvanareloaded/us-central1";
  const res = await fetch(`${baseUrl}/adminGenerateQuotes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ n }),
  });
  if (!res.ok) throw new Error("Failed to fetch quotes from AI");
  return res.json();
}

// Utility to fetch stories from OpenAI via Firebase Function
async function fetchStoriesFromAI(n = 5): Promise<{ title: string; content: string; readTime: string }[]> {
  const baseUrl = import.meta.env.VITE_FUNCTIONS_BASE_URL || "http://localhost:5001/nirvanareloaded/us-central1";
  const res = await fetch(`${baseUrl}/adminGenerateStories`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ n }),
  });
  if (!res.ok) throw new Error("Failed to fetch stories from AI");
  return res.json();
}

// Utility to fetch yoga asanas from OpenAI via Firebase Function
async function fetchYogaFromAI(n = 5): Promise<any[]> {
  const baseUrl = import.meta.env.VITE_FUNCTIONS_BASE_URL || "http://localhost:5001/nirvanareloaded/us-central1";
  const res = await fetch(`${baseUrl}/adminGenerateYoga`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ n }),
  });
  if (!res.ok) throw new Error("Failed to fetch yoga from AI");
  return res.json();
}

// Utility to fetch wisdom from OpenAI via Firebase Function
async function fetchWisdomFromAI(n = 5): Promise<any[]> {
  const baseUrl = import.meta.env.VITE_FUNCTIONS_BASE_URL || "http://localhost:5001/nirvanareloaded/us-central1";
  const res = await fetch(`${baseUrl}/adminGenerateWisdom`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ n }),
  });
  if (!res.ok) throw new Error("Failed to fetch wisdom from AI");
  return res.json();
}

// Utility to fetch music from OpenAI via Firebase Function
async function fetchMusicFromAI(n = 5): Promise<any[]> {
  const baseUrl = import.meta.env.VITE_FUNCTIONS_BASE_URL || "http://localhost:5001/nirvanareloaded/us-central1";
  const res = await fetch(`${baseUrl}/adminGenerateMusic`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ n }),
  });
  if (!res.ok) throw new Error("Failed to fetch music from AI");
  return res.json();
}

// Utility to fetch lifestyle tips from OpenAI via Firebase Function
async function fetchLifestyleFromAI(n = 5): Promise<any[]> {
  const baseUrl = import.meta.env.VITE_FUNCTIONS_BASE_URL || "http://localhost:5001/nirvanareloaded/us-central1";
  const res = await fetch(`${baseUrl}/adminGenerateLifestyle`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ n }),
  });
  if (!res.ok) throw new Error("Failed to fetch lifestyle tips from AI");
  return res.json();
}

const AdminContentManager = () => {
  // Quotes
  const [quotes, setQuotes] = useState<{ text: string; author: string }[]>([]);
  const [loading, setLoading] = useState(false);
  // Stories
  const [stories, setStories] = useState<{ title: string; content: string; readTime: string }[]>([]);
  const [loadingStories, setLoadingStories] = useState(false);
  // Yoga
  const [yoga, setYoga] = useState<any[]>([]);
  const [loadingYoga, setLoadingYoga] = useState(false);
  // Wisdom
  const [wisdom, setWisdom] = useState<any[]>([]);
  const [loadingWisdom, setLoadingWisdom] = useState(false);
  // Music
  const [music, setMusic] = useState<any[]>([]);
  const [loadingMusic, setLoadingMusic] = useState(false);
  // Lifestyle
  const [lifestyle, setLifestyle] = useState<any[]>([]);
  const [loadingLifestyle, setLoadingLifestyle] = useState(false);

  // ...existing dialog state...
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [form, setForm] = useState({ text: "", author: "" });
  const { toast } = useToast();

  // Fetch stories from AI
  const handleFetchStories = async () => {
    setLoadingStories(true);
    try {
      const data = await fetchStoriesFromAI(5);
      setStories(data);
      toast({ title: "Stories loaded from AI" });
    } catch (e) {
      toast({ title: "Error fetching stories from AI", description: String(e), variant: "destructive" });
    } finally {
      setLoadingStories(false);
    }
  };
  // Fetch yoga from AI
  const handleFetchYoga = async () => {
    setLoadingYoga(true);
    try {
      const data = await fetchYogaFromAI(5);
      setYoga(data);
      toast({ title: "Yoga asanas loaded from AI" });
    } catch (e) {
      toast({ title: "Error fetching yoga from AI", description: String(e), variant: "destructive" });
    } finally {
      setLoadingYoga(false);
    }
  };
  // Fetch wisdom from AI
  const handleFetchWisdom = async () => {
    setLoadingWisdom(true);
    try {
      const data = await fetchWisdomFromAI(5);
      setWisdom(data);
      toast({ title: "Wisdom loaded from AI" });
    } catch (e) {
      toast({ title: "Error fetching wisdom from AI", description: String(e), variant: "destructive" });
    } finally {
      setLoadingWisdom(false);
    }
  };
  // Fetch music from AI
  const handleFetchMusic = async () => {
    setLoadingMusic(true);
    try {
      const data = await fetchMusicFromAI(5);
      setMusic(data);
      toast({ title: "Music loaded from AI" });
    } catch (e) {
      toast({ title: "Error fetching music from AI", description: String(e), variant: "destructive" });
    } finally {
      setLoadingMusic(false);
    }
  };
  // Fetch lifestyle from AI
  const handleFetchLifestyle = async () => {
    setLoadingLifestyle(true);
    try {
      const data = await fetchLifestyleFromAI(5);
      setLifestyle(data);
      toast({ title: "Lifestyle tips loaded from AI" });
    } catch (e) {
      toast({ title: "Error fetching lifestyle tips from AI", description: String(e), variant: "destructive" });
    } finally {
      setLoadingLifestyle(false);
    }
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Curated Content Management</CardTitle>
      </CardHeader>
      <CardContent>
        {/* TODO: Add shadcn-ui table and CRUD dialogs for content (quotes, stories, yoga, wisdom, music, lifestyle) */}
        <div className="text-muted-foreground">Manage Bhagavad Gita verses, tips, meditation scripts, and more here.</div>
        {/* Quotes Table (AI-driven) */}
        {/* ...existing quotes table code... */}
        {/* Stories Table (AI-driven) */}
        <div className="mt-10">
          <div className="flex items-center gap-2 mb-4">
            <Button onClick={() => {}} disabled variant="outline">
              <Loader2 className="w-4 h-4 mr-2" /> Fetch Stories from AI (Coming Soon)
            </Button>
            <Button onClick={() => {}} disabled variant="default">
              <Plus className="w-4 h-4 mr-2" /> Add Story
            </Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Content</TableHead>
                <TableHead>Read Time</TableHead>
                <TableHead className="w-24">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* TODO: Render stories from AI */}
            </TableBody>
          </Table>
        </div>
        {/* Repeat for yoga, wisdom, music, lifestyle */}
      </CardContent>
    </Card>
  );
};

export default AdminContentManager; 