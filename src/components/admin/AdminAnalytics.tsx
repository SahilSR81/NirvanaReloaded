import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

async function fetchAnalyticsSummary(): Promise<string> {
  const baseUrl = import.meta.env.VITE_FUNCTIONS_BASE_URL || "http://localhost:5001/nirvanareloaded/us-central1";
  const res = await fetch(`${baseUrl}/adminAnalyticsSummary`, { method: "POST" });
  if (!res.ok) throw new Error("Failed to fetch analytics summary from AI");
  const data = await res.json();
  return data.summary || "No summary returned.";
}

const AdminAnalytics = () => {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Analytics</CardTitle>
      </CardHeader>
      <CardContent>
        {/* TODO: Add analytics charts and stats (user count, mood trends, etc.) */}
        <div className="text-muted-foreground">View number of users, mood trends, and more analytics here.</div>
      </CardContent>
    </Card>
  );
};

export default AdminAnalytics; 