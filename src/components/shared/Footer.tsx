import { Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

const SnapchatIcon = () => (
  <svg 
    className="w-6 h-6" 
    viewBox="0 0 24 24" 
    fill="currentColor"
  >
    <path d="M12.206.793c.99 0 4.347.276 5.93 3.821.529 1.193.403 3.219.299 4.847l-.003.06c-.012.18-.022.345-.03.51.075.045.203.09.401.09.3-.016.659-.12 1.033-.301.165-.088.344-.104.464-.104.182 0 .359.029.509.09.45.149.734.479.734.838.015.449-.39.839-1.213 1.168-.089.029-.209.075-.344.119-.45.135-1.139.36-1.333.81-.09.224-.061.524.12.868l.015.015c.06.136 1.526 3.475 4.791 4.014.255.044.435.27.42.509 0 .075-.015.149-.045.225-.24.569-1.273.988-3.146 1.271-.059.091-.12.375-.164.57-.029.179-.074.36-.134.553-.076.271-.27.405-.555.405h-.03c-.135 0-.313-.031-.538-.074-.36-.075-.765-.135-1.273-.135-.3 0-.599.015-.913.074-.6.104-1.123.464-1.723.884-.853.599-1.826 1.288-3.294 1.288-.06 0-.119-.015-.18-.015h-.149c-1.468 0-2.427-.675-3.279-1.288-.599-.42-1.107-.779-1.707-.884-.314-.045-.629-.074-.928-.074-.54 0-.958.089-1.272.149-.211.043-.391.074-.54.074-.374 0-.523-.224-.583-.42-.061-.192-.09-.389-.135-.567-.046-.181-.105-.494-.166-.57-1.918-.222-2.95-.642-3.189-1.226-.031-.075-.046-.15-.046-.225-.015-.243.165-.465.42-.509 3.264-.54 4.73-3.879 4.791-4.02l.016-.029c.18-.345.224-.645.119-.869-.195-.434-.884-.658-1.332-.809-.121-.029-.24-.074-.346-.119-1.107-.435-1.257-.93-1.197-1.273.09-.479.674-.793 1.168-.793.146 0 .27.029.383.074.42.194.789.3 1.104.3.234 0 .384-.06.465-.105l-.046-.569c-.098-1.626-.225-3.651.307-4.837C7.392 1.077 10.739.807 11.727.807l.419-.015h.06z" />
  </svg>
);

const Footer = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const copyToClipboard = (text: string, type: 'email' | 'snapchat') => {
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: "Copied to clipboard!",
        description: `${type === 'email' ? 'Email address' : 'Snapchat link'} has been copied.`,
        duration: 2000,
      });
    });
  };
  
  return (
    <footer className="mt-24 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="space-y-4">
            <img 
              src="/lovable-uploads/6c1df936-4b2b-42ea-af81-c66f17443ac9.png" 
              alt="Nirvana" 
              className="w-12 h-12 rounded-lg"
            />
            <p className="text-muted-foreground text-sm sm:text-base">
              Empowering your journey to mental wellness and inner peace.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Connect</h3>
            <div className="flex space-x-4">
              <button 
                onClick={() => copyToClipboard('sahilrajputsingh81@gmail.com', 'email')}
                className="text-muted-foreground hover:text-gradient-start transition-colors"
                aria-label="Copy email address"
              >
                <Mail className="w-6 h-6" />
              </button>
              <button 
                onClick={() => copyToClipboard('https://www.snapchat.com/add/sahilsr81?share_id=MPeoYS2fdkA&locale=en-GB', 'snapchat')}
                className="text-muted-foreground hover:text-gradient-start transition-colors"
                aria-label="Copy Snapchat link"
              >
                <SnapchatIcon />
              </button>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Quick Links</h3>
            <div className="space-y-2">
              <button onClick={() => navigate("/")} className="block text-muted-foreground hover:text-gradient-start transition-colors">Home</button>
              <button onClick={() => navigate("/about-us")} className="block text-muted-foreground hover:text-gradient-start transition-colors">About</button>
              <button onClick={() => navigate("/signup")} className="block text-muted-foreground hover:text-gradient-start transition-colors">Get Started</button>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-border text-center text-muted-foreground text-sm">
          <p>&copy; {new Date().getFullYear()} Nirvana. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;