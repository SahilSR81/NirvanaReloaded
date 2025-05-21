import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface PageNavigationProps {
  prevPage?: {
    name: string;
    path: string;
  };
  nextPage?: {
    name: string;
    path: string;
  };
  className?: string;
}

const PageNavigation = ({ prevPage, nextPage, className }: PageNavigationProps) => {
  const navigate = useNavigate();

  return (
    <div className={`flex justify-between items-center ${className}`}>
      {prevPage ? (
        <Button
          onClick={() => navigate(prevPage.path)}
          variant="outline"
          className="text-sm sm:text-base hover:bg-primary hover:text-primary-foreground"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          <span className="hidden sm:inline">{prevPage.name}</span>
          <span className="sm:hidden">Back</span>
        </Button>
      ) : (
        <div /> // Empty div for spacing
      )}
      
      {nextPage && (
        <Button
          onClick={() => navigate(nextPage.path)}
          variant="outline"
          className="text-sm sm:text-base hover:bg-primary hover:text-primary-foreground"
        >
          <span className="hidden sm:inline">{nextPage.name}</span>
          <span className="sm:hidden">Next</span>
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      )}
    </div>
  );
};

export default PageNavigation;