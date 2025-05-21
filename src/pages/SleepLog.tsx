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

const SleepLog = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { register, handleSubmit, setValue, watch, reset } = useForm({
    defaultValues: {
      hours: '',
      quality: 3,
      sleepTime: '',
      wakeTime: ''
    }
  });
  const quality = watch('quality');

  const onSubmit = async (data: any) => {
    if (!user) return;
    setLoading(true);
    setSuccess(false);
    await addDoc(collection(db, 'users', user.uid, 'sleepLogs'), {
      ...data,
      hours: Number(data.hours),
      quality: Number(data.quality),
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
            <CardTitle className="gradient-text">Log Your Sleep</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="block mb-1 font-medium">Hours Slept</label>
                <Input type="number" step="0.1" min="0" max="24" {...register('hours', { required: true })} />
              </div>
              <div>
                <label className="block mb-1 font-medium">Sleep Quality</label>
                <Slider
                  value={[quality]}
                  onValueChange={v => setValue('quality', v[0])}
                  min={1}
                  max={5}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-muted-foreground mt-2">
                  {[1,2,3,4,5].map(val => (
                    <span key={val} className={val === quality ? 'text-foreground font-medium' : ''}>{val}</span>
                  ))}
                </div>
              </div>
              <div>
                <label className="block mb-1 font-medium">Sleep Time</label>
                <Input type="time" {...register('sleepTime', { required: true })} />
              </div>
              <div>
                <label className="block mb-1 font-medium">Wake Time</label>
                <Input type="time" {...register('wakeTime', { required: true })} />
              </div>
              <Button type="submit" className="w-full gradient-bg text-white" disabled={loading}>
                {loading ? 'Saving...' : 'Save Log'}
              </Button>
              {success && <div className="text-green-600 mt-2">Sleep log saved!</div>}
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SleepLog; 