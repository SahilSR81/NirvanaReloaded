import React, { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import PersonalDetails from "./pages/PersonalDetails";
import Welcome from "./pages/Welcome";
import MoodTracker from "./pages/MoodTracker";
import Dashboard from "./pages/Dashboard";
import ContentFeed from "./pages/ContentFeed";
import PersonalizedHelp from "./pages/PersonalizedHelp";
import AboutUs from "./pages/AboutUs";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { getDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Profile from "./pages/Profile";
import Reports from "./pages/Reports";
import SleepLog from "./pages/SleepLog";
import ActivityLog from "./pages/ActivityLog";
import { useNotification } from "@/contexts/NotificationContext";
import NotificationToaster from "@/components/ui/NotificationToaster";
import { subscribeToForegroundMessages } from "@/lib/fcm";
import AdminDashboard from "./pages/AdminDashboard";
import { AnimatePresence, motion } from "framer-motion";

const queryClient = new QueryClient();

const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.35, ease: "easeInOut" }
};

const ProtectedRoute = ({ children, requiredRole }: { children: React.ReactNode, requiredRole?: string }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, loading, role } = useAuth();

  useEffect(() => {
    const checkUserDetails = async () => {
      if (!user && !loading) {
        navigate("/login");
        return;
      }
      if (loading || !user) return;
      // Role-based protection
      if (requiredRole && role !== requiredRole) {
        navigate("/");
        return;
      }
      try {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        const userData = userDoc.data();
        if (location.pathname === "/personal-details") return;
        if (!userData?.personalDetailsFilled) {
          navigate("/personal-details");
          return;
        }
        if (location.pathname === "/login" || location.pathname === "/") {
          navigate("/welcome");
          return;
        }
      } catch (error) {
        console.error("Error checking user details:", error);
      }
    };
    checkUserDetails();
  }, [user, loading, role, navigate, location.pathname, requiredRole]);

  if (loading) return null;
  if (!user) return null;
  if (requiredRole && role !== requiredRole) return null;
  return <>{children}</>;
};

const AppRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={pageTransition.initial}
        animate={pageTransition.animate}
        exit={pageTransition.exit}
        transition={pageTransition.transition}
        className="min-h-screen bg-background"
      >
        <Routes location={location}>
              {/* Public Routes */}
              <Route path="/" element={<Index />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/about-us" element={<AboutUs />} />

              {/* Protected Routes */}
              <Route path="/personal-details" element={
                <ProtectedRoute>
                  <PersonalDetails />
                </ProtectedRoute>
              } />
              <Route path="/welcome" element={
                <ProtectedRoute>
                  <Welcome />
                </ProtectedRoute>
              } />
              <Route path="/mood-tracker" element={
                <ProtectedRoute>
                  <MoodTracker />
                </ProtectedRoute>
              } />
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/content-feed" element={
                <ProtectedRoute>
                  <ContentFeed />
                </ProtectedRoute>
              } />
              <Route path="/personalized-help" element={
                <ProtectedRoute>
                  <PersonalizedHelp />
                </ProtectedRoute>
              } />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />
          <Route path="/reports" element={
            <ProtectedRoute>
              <Reports />
            </ProtectedRoute>
          } />
          <Route path="/sleep-log" element={
            <ProtectedRoute>
              <SleepLog />
            </ProtectedRoute>
          } />
          <Route path="/activity-log" element={
            <ProtectedRoute>
              <ActivityLog />
            </ProtectedRoute>
          } />
          <Route path="/admin-dashboard" element={
            <ProtectedRoute requiredRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          } />
            </Routes>
      </motion.div>
    </AnimatePresence>
  );
};

const App = () => {
  const { addNotification } = useNotification();
  useEffect(() => {
    const unsubscribe = subscribeToForegroundMessages((payload) => {
      const { title, body } = payload.notification || {};
      if (title || body) {
        addNotification({ title: title || "Notification", body: body || "" });
      }
    });
    return () => unsubscribe && unsubscribe();
  }, [addNotification]);

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <NotificationToaster />
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </AuthProvider>
  );
};

export default App;