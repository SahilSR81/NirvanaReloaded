import { Brain } from "lucide-react";

const Header = () => (
  <div className="text-center mb-16 space-y-4">
    <Brain className="w-16 h-16 mx-auto text-gradient-start animate-pulse" />
    <h1 className="text-5xl font-bold gradient-text">About Nirvana</h1>
    <p className="text-xl text-muted-foreground">
      Transforming Mental Wellness Through Understanding
    </p>
  </div>
);

export default Header;