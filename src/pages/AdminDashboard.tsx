import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import AdminContentManager from "@/components/admin/AdminContentManager";
import AdminAnalytics from "@/components/admin/AdminAnalytics";
import AdminModeration from "@/components/admin/AdminModeration";
import Navbar from "@/components/shared/Navbar";

const AdminDashboard = () => {
  const [tab, setTab] = useState("content");
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20 px-6 pb-6 max-w-7xl mx-auto">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="gradient-text">Admin Dashboard</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={tab} onValueChange={setTab} className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="content">Content Management</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="moderation">Moderation</TabsTrigger>
              </TabsList>
              <TabsContent value="content">
                <AdminContentManager />
              </TabsContent>
              <TabsContent value="analytics">
                <AdminAnalytics />
              </TabsContent>
              <TabsContent value="moderation">
                <AdminModeration />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard; 