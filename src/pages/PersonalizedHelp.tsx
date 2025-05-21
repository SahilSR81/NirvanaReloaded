import { Button } from "@/components/ui/button";
import { Moon, Sun, Wind, Stars, UserCheck, Calendar, Video, Music2, Users, Heart, MessageSquare, PlayCircle } from "lucide-react";
import PageNavigation from "@/components/shared/PageNavigation";
import { motion } from "framer-motion";

const PersonalizedHelp = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 space-y-12">
        <h1 className="text-4xl font-bold gradient-text">Personalized Help</h1>
        <p className="text-muted-foreground text-lg">Your comprehensive wellness support system</p>

        {/* Community Section */}
        <section className="space-y-6">
          <h2 className="text-3xl font-semibold gradient-text">Community Support</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="glass-card p-6 space-y-4"
            >
              <Users className="w-10 h-10 text-gradient-start" />
              <h3 className="text-xl font-semibold gradient-text">Support Groups</h3>
              <p className="text-muted-foreground">Join themed support groups based on your interests and needs.</p>
              <Button className="w-full gradient-bg text-white">Join Groups</Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="glass-card p-6 space-y-4"
            >
              <MessageSquare className="w-10 h-10 text-gradient-middle" />
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
        </section>

        {/* Meditation Section */}
        <section className="space-y-6">
          <h2 className="text-3xl font-semibold gradient-text">Guided Meditation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="glass-card p-6 space-y-4"
            >
              <Moon className="w-10 h-10 text-gradient-start" />
              <h3 className="text-xl font-semibold gradient-text">Sleep Meditation</h3>
              <p className="text-muted-foreground">Calm your mind and prepare for restful sleep</p>
              <p className="text-sm text-muted-foreground">Duration: 15 minutes</p>
              <Button className="w-full gradient-bg text-white">Start Session</Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="glass-card p-6 space-y-4"
            >
              <Sun className="w-10 h-10 text-gradient-middle" />
              <h3 className="text-xl font-semibold gradient-text">Morning Meditation</h3>
              <p className="text-muted-foreground">Start your day with clarity and purpose</p>
              <p className="text-sm text-muted-foreground">Duration: 10 minutes</p>
              <Button className="w-full gradient-bg text-white">Start Session</Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="glass-card p-6 space-y-4"
            >
              <Wind className="w-10 h-10 text-gradient-end" />
              <h3 className="text-xl font-semibold gradient-text">Stress Relief</h3>
              <p className="text-muted-foreground">Quick meditation for anxiety and stress</p>
              <p className="text-sm text-muted-foreground">Duration: 5 minutes</p>
              <Button className="w-full gradient-bg text-white">Start Session</Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="glass-card p-6 space-y-4"
            >
              <Stars className="w-10 h-10 text-gradient-start" />
              <h3 className="text-xl font-semibold gradient-text">Deep Focus</h3>
              <p className="text-muted-foreground">Enhance concentration and mindfulness</p>
              <p className="text-sm text-muted-foreground">Duration: 20 minutes</p>
              <Button className="w-full gradient-bg text-white">Start Session</Button>
            </motion.div>
          </div>
        </section>

        {/* Therapist Section */}
        <section className="space-y-6">
          <h2 className="text-3xl font-semibold gradient-text">Professional Support</h2>
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
        </section>

        {/* Music Section */}
        <section className="space-y-6">
          <h2 className="text-3xl font-semibold gradient-text">Mood Music</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="glass-card p-6 space-y-4"
            >
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <Music2 className="w-10 h-10 text-gradient-start" />
                  <h3 className="text-xl font-semibold gradient-text">Calming Playlist</h3>
                  <p className="text-muted-foreground">Soothing melodies for relaxation</p>
                </div>
                <Button size="icon" variant="ghost">
                  <PlayCircle className="w-6 h-6" />
                </Button>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="glass-card p-6 space-y-4"
            >
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <Heart className="w-10 h-10 text-gradient-middle" />
                  <h3 className="text-xl font-semibold gradient-text">Uplifting Beats</h3>
                  <p className="text-muted-foreground">Energetic tunes to boost your mood</p>
                </div>
                <Button size="icon" variant="ghost">
                  <PlayCircle className="w-6 h-6" />
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        <PageNavigation
          prevPage={{ name: "Content Feed", path: "/content-feed" }}
          nextPage={{ name: "About Us", path: "/about-us" }}
        />
      </div>
    </div>
  );
};

export default PersonalizedHelp;
