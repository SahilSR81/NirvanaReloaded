import { useState } from "react";
import { useNotification } from "@/contexts/NotificationContext";
import NotificationCenter from "./NotificationCenter";

export default function NotificationBell() {
  const { notifications } = useNotification();
  const [open, setOpen] = useState(false);
  const unreadCount = notifications.length;

  return (
    <>
      <button
        className="relative p-2 rounded-full hover:bg-gray-100 focus:outline-none"
        onClick={() => setOpen(true)}
        aria-label="Show notifications"
      >
        <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
            {unreadCount}
          </span>
        )}
      </button>
      <NotificationCenter open={open} onClose={() => setOpen(false)} />
    </>
  );
} 