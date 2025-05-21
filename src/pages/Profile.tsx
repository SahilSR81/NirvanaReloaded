import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import Navbar from "@/components/shared/Navbar";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Switch } from "@/components/ui/switch";
import { requestFcmPermission } from "@/lib/fcm";

interface UserProfile {
  name: string;
  birthDate: string;
  occupation: string;
  hobbies: string;
  sleepTime: string;
  wakeTime: string;
  createdAt: string;
}

const Profile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [notifLoading, setNotifLoading] = useState(false);
  const [notifSuccess, setNotifSuccess] = useState(false);
  const [notifPrefs, setNotifPrefs] = useState({ dailyReminder: true, milestone: true });
  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: notifPrefs
  });
  const navigate = useNavigate();
  const [pushStatus, setPushStatus] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists()) {
        setProfile(userDoc.data() as UserProfile);
      }
      // Fetch notification preferences
      const notifDoc = await getDoc(doc(db, 'users', user.uid, 'preferences', 'notifications'));
      if (notifDoc.exists()) {
        setNotifPrefs(notifDoc.data() as any);
        setValue('dailyReminder', notifDoc.data().dailyReminder ?? true);
        setValue('milestone', notifDoc.data().milestone ?? true);
      }
    };

    fetchProfile();
  }, [user, setValue]);

  const onNotifSubmit = async (data: any) => {
    if (!user) return;
    setNotifLoading(true);
    setNotifSuccess(false);
    await setDoc(doc(db, 'users', user.uid, 'preferences', 'notifications'), data, { merge: true });
    setNotifLoading(false);
    setNotifSuccess(true);
    setNotifPrefs(data);
  };

  const handleEnablePush = async () => {
    setPushStatus("Requesting permission...");
    const token = await requestFcmPermission();
    if (token) setPushStatus("Push notifications enabled!");
    else setPushStatus("Permission denied or error.");
  };

  if (!profile) return null;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20 px-6 pb-6">
        <div className="max-w-2xl mx-auto space-y-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="gradient-text">Profile Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-muted-foreground">Name</label>
                  <p className="text-foreground">{profile.name}</p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Birth Date</label>
                  <p className="text-foreground">
                    {format(new Date(profile.birthDate), 'MMMM d, yyyy')}
                  </p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Occupation</label>
                  <p className="text-foreground">{profile.occupation}</p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Hobbies</label>
                  <p className="text-foreground">{profile.hobbies}</p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Sleep Time</label>
                  <p className="text-foreground">{profile.sleepTime}</p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Wake Time</label>
                  <p className="text-foreground">{profile.wakeTime}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notification Preferences */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="gradient-text">Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onNotifSubmit)} className="space-y-6">
                <div className="flex items-center justify-between">
                  <span>Daily Mood Reminder</span>
                  <Switch checked={watch('dailyReminder')} onCheckedChange={v => setValue('dailyReminder', v)} />
                </div>
                <div className="flex items-center justify-between">
                  <span>Milestone Celebrations</span>
                  <Switch checked={watch('milestone')} onCheckedChange={v => setValue('milestone', v)} />
                </div>
                <Button type="submit" className="w-full gradient-bg text-white" disabled={notifLoading}>
                  {notifLoading ? 'Saving...' : 'Save Preferences'}
                </Button>
                {notifSuccess && <div className="text-green-600 mt-2">Preferences saved!</div>}
              </form>
              <div className="mt-6">
                <Button variant="outline" onClick={handleEnablePush}>
                  Enable Push Notifications
                </Button>
                {pushStatus && <div className="mt-2 text-sm text-muted-foreground">{pushStatus}</div>}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile; 