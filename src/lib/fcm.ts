import { getMessaging, getToken, onMessage, isSupported } from "firebase/messaging";
import { db, auth } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";

// TODO: Replace with your actual VAPID key from Firebase Console > Cloud Messaging
const VAPID_KEY = import.meta.env.VITE_FIREBASE_VAPID_KEY || "BMKdprG7q4LeniWpbE6XO98vKGCT8IQMHSTmeqrrp65KjxrqsVr272FF4m7FpC3Exj_4LgRozAZzK669GAscFTE";

export async function requestFcmPermission() {
  if (!(await isSupported())) return null;
  try {
    const messaging = getMessaging();
    const token = await getToken(messaging, { vapidKey: VAPID_KEY });
    if (token && auth.currentUser) {
      await setDoc(doc(db, "users", auth.currentUser.uid, "fcmTokens", token), { token });
    }
    return token;
  } catch (err) {
    console.error("FCM permission error", err);
    return null;
  }
}

export async function subscribeToForegroundMessages(callback: (payload: any) => void) {
  if (!(await isSupported())) return () => {};
  const messaging = getMessaging();
  const unsubscribe = onMessage(messaging, callback);
  return unsubscribe;
} 