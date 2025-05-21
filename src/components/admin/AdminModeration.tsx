import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

// Utility to fetch flagged entries and AI moderation from backend (to be implemented)
async function fetchModerationResults(): Promise<{ entry: string; aiResult: string }[]> {
  const baseUrl = import.meta.env.VITE_FUNCTIONS_BASE_URL || "http://localhost:5001/nirvanareloaded/us-central1";
  const res = await fetch(`${baseUrl}/adminModerateFlagged`, { method: "POST" });
  if (!res.ok) throw new Error("Failed to fetch moderation results from AI");
  return res.json();
}

const AdminModeration = () => {
  const [results, setResults] = useState<{ entry: string; aiResult: string }[]>([]);
  const [loading, setLoading] = useState(false);

  const handleModerate = async () => {
    setLoading(true);
    try {
      const data = await fetchModerationResults();
      setResults(data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Moderation</CardTitle>
      </CardHeader>
      <CardContent>
        <Button onClick={handleModerate} disabled={loading} variant="outline">
          {loading ? <Loader2 className="animate-spin w-4 h-4 mr-2" /> : null}
          Run AI Moderation on Flagged Entries
        </Button>
        <div className="mt-6 space-y-4">
          {results.length === 0 && <div className="text-muted-foreground">No moderation results yet.</div>}
          {results.map((r, i) => (
            <div key={i} className="border rounded p-3 bg-gray-50">
              <div className="font-medium">Entry:</div>
              <div className="mb-2">{r.entry}</div>
              <div className="font-medium">AI Result:</div>
              <div className="text-sm text-muted-foreground">{r.aiResult}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminModeration; 