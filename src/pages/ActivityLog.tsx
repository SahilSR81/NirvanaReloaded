import { useForm } from "react-hook-form";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { useAuth } from "@/contexts/AuthContext";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import Navbar from "@/components/shared/Navbar";
import { useState } from "react";

const ACTIVITIES = [
  "Exercise", "Meditation", "Self-care", "Therapy", "Walk", "Study", "Playing", "Today's Goal"
];

const ActivityLog = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { register, handleSubmit, setValue, watch, reset } = useForm({
    defaultValues: {
      activities: [],
      intensity: 3,
      timeOfDay: ''
    }
  });
  const intensity = watch('intensity');

  const onSubmit = async (data: any) => {
    if (!user) return;
    setLoading(true);
    setSuccess(false);
    await addDoc(collection(db, 'users', user.uid, 'activityLogs'), {
      ...data,
      intensity: Number(data.intensity),
      createdAt: new Date().toISOString(),
    });
    setLoading(false);
    setSuccess(true);
    reset();
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20 px-6 pb-6 max-w-xl mx-auto animate-fade-in">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="gradient-text">Log Your Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="block mb-1 font-medium">Activities Done</label>
                <div className="grid grid-cols-2 gap-2">
                  {ACTIVITIES.map(act => (
                    <label key={act} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        value={act}
                        {...register('activities')}
                        className="accent-gradient-start"
                      />
                      <span>{act}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block mb-1 font-medium">Intensity Level</label>
                <Slider
                  value={[intensity]}
                  onValueChange={v => setValue('intensity', v[0])}
                  min={1}
                  max={5}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-muted-foreground mt-2">
                  {[1,2,3,4,5].map(val => (
                    <span key={val} className={val === intensity ? 'text-foreground font-medium' : ''}>{val}</span>
                  ))}
                </div>
              </div>
              <div>
                <label className="block mb-1 font-medium">Time of Day</label>
                <Input type="time" {...register('timeOfDay', { required: true })} />
              </div>
              <Button type="submit" className="w-full gradient-bg text-white" disabled={loading}>
                {loading ? 'Saving...' : 'Save Log'}
              </Button>
              {success && <div className="text-green-600 mt-2">Activity log saved!</div>}
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ActivityLog; 