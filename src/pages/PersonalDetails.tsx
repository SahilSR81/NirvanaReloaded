import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "@/contexts/AuthContext";
import { db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";

const PersonalDetails = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const onSubmit = async (data: any) => {
    setError("");
    setSuccess(false);
    try {
      if (!user) throw new Error("Not authenticated");
      await setDoc(doc(db, "users", user.uid), {
        ...data,
        personalDetailsFilled: true
      }, { merge: true });
      setSuccess(true);
      setTimeout(() => navigate("/dashboard"), 1200);
    } catch (e: any) {
      setError(e.message || "Failed to save details");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-100 to-blue-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex flex-col justify-center">
      <div className="container max-w-lg mx-auto px-4 py-16 flex-1 flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="w-full"
        >
          <Card className="glass-card shadow-xl rounded-2xl p-8 bg-white/80 dark:bg-slate-900/80">
            <CardHeader className="mb-4">
              <CardTitle className="text-3xl md:text-4xl font-bold text-center gradient-text mb-2">
                Personal Details
              </CardTitle>
              <p className="text-muted-foreground text-center">Tell us about yourself to personalize your experience</p>
        </CardHeader>
        <CardContent>
              <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-2">
                  <Input type="text" placeholder="Full Name" {...register("name", { required: true })} />
                  {errors.name && <span className="text-destructive text-xs">Name is required</span>}
                </div>
                <div className="space-y-2">
                  <Input type="date" placeholder="Birth Date" {...register("birthDate", { required: true })} />
                  {errors.birthDate && <span className="text-destructive text-xs">Birth date is required</span>}
                </div>
                <div className="space-y-2">
                  <Input type="text" placeholder="Occupation" {...register("occupation", { required: true })} />
                  {errors.occupation && <span className="text-destructive text-xs">Occupation is required</span>}
                </div>
                <div className="space-y-2">
                  <Input type="text" placeholder="Hobbies (comma separated)" {...register("hobbies", { required: true })} />
                  {errors.hobbies && <span className="text-destructive text-xs">Hobbies are required</span>}
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-muted-foreground">Sleep Time</label>
                  <Input type="time" placeholder="Sleep Time" {...register("sleepTime", { required: true })} />
                  {errors.sleepTime && <span className="text-destructive text-xs">Sleep time is required</span>}
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-muted-foreground">Wake Up Time</label>
                  <Input type="time" placeholder="Wake Up Time" {...register("wakeTime", { required: true })} />
                  {errors.wakeTime && <span className="text-destructive text-xs">Wake up time is required</span>}
                </div>
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5, type: "spring" }}
                >
                  <Button type="submit" size="lg" className="w-full gradient-bg text-white text-lg font-semibold shadow-lg" disabled={isSubmitting}>
                    {isSubmitting ? "Saving..." : "Save & Continue"}
                  </Button>
                </motion.div>
                {error && (
                  <Alert variant="destructive" className="mt-4">
                    <AlertTitle>Failed</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                {success && (
                  <Alert variant="default" className="mt-4">
                    <AlertTitle>Saved!</AlertTitle>
                    <AlertDescription>Redirecting to dashboard...</AlertDescription>
                  </Alert>
                )}
              </form>
        </CardContent>
      </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default PersonalDetails;