import { Button } from "@/components/ui/button";
import { UserCheck, Calendar, Video } from "lucide-react";
import PageNavigation from "@/components/shared/PageNavigation";
import { motion } from "framer-motion";

const Therapist = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 space-y-8">
        <h1 className="text-4xl font-bold gradient-text">Professional Support</h1>
        <p className="text-muted-foreground text-lg">Connect with licensed therapists and counselors</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="glass-card p-6 space-y-4"
          >
            <UserCheck className="w-10 h-10 text-gradient-start" />
            <h3 className="text-xl font-semibold gradient-text">Find a Therapist</h3>
            <p className="text-muted-foreground">Browse through our network of certified professionals</p>
            <Button className="w-full gradient-bg text-white">Search Therapists</Button>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="glass-card p-6 space-y-4"
          >
            <Calendar className="w-10 h-10 text-gradient-middle" />
            <h3 className="text-xl font-semibold gradient-text">Schedule Session</h3>
            <p className="text-muted-foreground">Book appointments at your convenience</p>
            <Button className="w-full gradient-bg text-white">Book Now</Button>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="glass-card p-6 space-y-4"
          >
            <Video className="w-10 h-10 text-gradient-end" />
            <h3 className="text-xl font-semibold gradient-text">Virtual Sessions</h3>
            <p className="text-muted-foreground">Connect through secure video calls</p>
            <Button className="w-full gradient-bg text-white">Join Session</Button>
          </motion.div>
        </div>

        <PageNavigation
          prevPage={{ name: "Meditation", path: "/meditation" }}
          nextPage={{ name: "Music", path: "/music" }}
        />
      </div>
    </div>
  );
};

export default Therapist;