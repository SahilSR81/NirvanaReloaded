import { useNotification } from "@/contexts/NotificationContext";
import { useEffect } from "react";

export default function NotificationToaster() {
  const { notifications, removeNotification } = useNotification();

  useEffect(() => {
    if (notifications.length === 0) return;
    const timer = setTimeout(() => {
      removeNotification(notifications[0].id);
    }, 5000);
    return () => clearTimeout(timer);
  }, [notifications, removeNotification]);

  if (notifications.length === 0) return null;

  const notif = notifications[0];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="bg-white shadow-lg rounded-lg p-4 border w-80 animate-fade-in-up relative">
        <div className="font-semibold">{notif.title}</div>
        <div className="text-sm text-gray-700">{notif.body}</div>
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
          onClick={() => removeNotification(notif.id)}
        >
          ×
        </button>
      </div>
    </div>
  );
} 