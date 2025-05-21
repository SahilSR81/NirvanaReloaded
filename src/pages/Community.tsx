import { Button } from "@/components/ui/button";
import { MessageSquare, Users, Heart } from "lucide-react";
import PageNavigation from "@/components/shared/PageNavigation";
import { motion } from "framer-motion";

const Community = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 space-y-8">
        <h1 className="text-4xl font-bold gradient-text">Community Hub</h1>
        <p className="text-muted-foreground text-lg">Connect, share, and grow with others on similar journeys</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="glass-card p-6 space-y-4"
          >
            <MessageSquare className="w-10 h-10 text-gradient-start" />
            <h3 className="text-xl font-semibold gradient-text">Support Groups</h3>
            <p className="text-muted-foreground">Join themed support groups based on your interests and needs.</p>
            <Button className="w-full gradient-bg text-white">Join Groups</Button>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="glass-card p-6 space-y-4"
          >
            <Users className="w-10 h-10 text-gradient-middle" />
            <h3 className="text-xl font-semibold gradient-text">Community Forums</h3>
            <p className="text-muted-foreground">Engage in discussions about mental wellness and share experiences.</p>
            <Button className="w-full gradient-bg text-white">Browse Forums</Button>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="glass-card p-6 space-y-4"
          >
            <Heart className="w-10 h-10 text-gradient-end" />
            <h3 className="text-xl font-semibold gradient-text">Success Stories</h3>
            <p className="text-muted-foreground">Read inspiring stories from community members.</p>
            <Button className="w-full gradient-bg text-white">Read Stories</Button>
          </motion.div>
        </div>

        <PageNavigation
          prevPage={{ name: "Content Feed", path: "/content-feed" }}
          nextPage={{ name: "Meditation", path: "/meditation" }}
        />
      </div>
    </div>
  );
};

export default Community;