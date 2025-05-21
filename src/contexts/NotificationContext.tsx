import React, { createContext, useContext, useState, ReactNode } from "react";

export interface AppNotification {
  id: string;
  title: string;
  body: string;
  timestamp: number;
}

interface NotificationContextType {
  notifications: AppNotification[];
  addNotification: (notif: Omit<AppNotification, "id" | "timestamp">) => void;
  removeNotification: (id: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<AppNotification[]>([]);

  const addNotification = (notif: Omit<AppNotification, "id" | "timestamp">) => {
    setNotifications((prev) => [
      ...prev,
      {
        ...notif,
        id: Math.random().toString(36).slice(2),
        timestamp: Date.now(),
      },
    ]);
  };

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, removeNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error("useNotification must be used within NotificationProvider");
  return ctx;
};
