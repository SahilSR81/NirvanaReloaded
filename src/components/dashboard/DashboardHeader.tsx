import React from "react";
import PageNavigation from "@/components/shared/PageNavigation";

export const DashboardHeader = () => {
  return (
    <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
      <div className="container max-w-7xl mx-auto py-4 px-6">
        <PageNavigation
          prevPage={{ name: "Mood Tracker", path: "/mood-tracker" }}
          nextPage={{ name: "Content Feed", path: "/content-feed" }}
        />
      </div>
      <div className="container max-w-7xl mx-auto py-6 px-6">
        <h1 className="text-3xl font-bold text-foreground">Your Wellness Dashboard</h1>
      </div>
    </div>
  );
};