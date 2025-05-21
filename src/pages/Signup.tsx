import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { useAuth } from "@/contexts/AuthContext";
import { FcGoogle } from "react-icons/fc";

const Signup = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const { signInWithGoogle } = useAuth();
  const [googleLoading, setGoogleLoading] = useState(false);

  const onSubmit = async (data: any) => {
    setError("");
    setSuccess(false);
    try {
      const userCred = await createUserWithEmailAndPassword(auth, data.email, data.password);
      await setDoc(doc(db, "users", userCred.user.uid), {
        email: data.email,
        displayName: data.name,
        createdAt: serverTimestamp(),
        preferences: {},
        role: "user"
      });
      setSuccess(true);
      setTimeout(() => navigate("/mood-tracker"), 1200);
    } catch (e: any) {
      setError(e.message || "Signup failed");
    }
  };

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    setError("");
    try {
      await signInWithGoogle();
      setSuccess(true);
      setTimeout(() => navigate("/mood-tracker"), 1200);
    } catch (e: any) {
      setError(e.message || "Google sign-in failed");
    }
    setGoogleLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-100 to-blue-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex flex-col justify-center">
      <div className="container max-w-md mx-auto px-4 py-16 flex-1 flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="w-full"
        >
          <Card className="glass-card shadow-xl rounded-2xl p-8 bg-white/80 dark:bg-slate-900/80">
            <CardHeader className="mb-4">
              <CardTitle className="text-3xl md:text-4xl font-bold text-center gradient-text mb-2">
                Create your account
              </CardTitle>
              <p className="text-muted-foreground text-center">Start your journey to mental wellness</p>
            </CardHeader>
            <CardContent>
              <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-2">
                  <Input type="text" placeholder="Full Name" {...register("name", { required: true })} />
                  {errors.name && <span className="text-destructive text-xs">Name is required</span>}
                </div>
                <div className="space-y-2">
                  <Input type="email" placeholder="Email" {...register("email", { required: true })} />
                  {errors.email && <span className="text-destructive text-xs">Email is required</span>}
                </div>
                <div className="space-y-2">
                  <Input type="password" placeholder="Password" {...register("password", { required: true, minLength: 6 })} />
                  {errors.password && <span className="text-destructive text-xs">Password must be at least 6 characters</span>}
                </div>
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5, type: "spring" }}
                >
                  <Button type="submit" size="lg" className="w-full gradient-bg text-white text-lg font-semibold shadow-lg" disabled={isSubmitting}>
                    {isSubmitting ? "Signing up..." : "Sign Up"}
                  </Button>
                </motion.div>
                <div className="flex items-center my-4">
                  <div className="flex-grow border-t border-gray-300 dark:border-gray-700" />
                  <span className="mx-3 text-muted-foreground">or</span>
                  <div className="flex-grow border-t border-gray-300 dark:border-gray-700" />
                </div>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full flex items-center justify-center gap-2"
                  onClick={handleGoogleSignIn}
                  disabled={googleLoading}
                >
                  <FcGoogle className="w-5 h-5" />
                  {googleLoading ? "Signing in..." : "Sign in with Google"}
                </Button>
                {error && (
                  <Alert variant="destructive" className="mt-4">
                    <AlertTitle>Signup Failed</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                {success && (
                  <Alert variant="default" className="mt-4">
                    <AlertTitle>Signup Successful!</AlertTitle>
                    <AlertDescription>Redirecting to mood tracker...</AlertDescription>
                  </Alert>
                )}
              </form>
              <div className="mt-6 text-center text-muted-foreground">
                Already have an account?{' '}
                <Button variant="link" className="p-0 h-auto text-base" onClick={() => navigate("/login")}>Log in</Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Signup;