import { YogaAsana } from "@/types/content";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface YogaCardProps {
  content: YogaAsana;
}

export const YogaCard = ({ content }: YogaCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">{content.name}</h3>
          <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
            {content.difficulty}
          </span>
        </div>
        <p className="text-sm text-muted-foreground">{content.description}</p>
        
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
        >
          {isExpanded ? "Show Less" : "Show More"}
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {isExpanded && (
          <div className="space-y-4 pt-2">
            <div>
              <h4 className="font-medium mb-2 text-sm">Benefits:</h4>
              <ul className="list-disc list-inside space-y-1">
                {content.benefits.map((benefit, index) => (
                  <li key={index} className="text-sm text-muted-foreground">
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-2 text-sm">Instructions:</h4>
              <ol className="list-decimal list-inside space-y-1">
                {content.instructions.map((instruction, index) => (
                  <li key={index} className="text-sm text-muted-foreground">
                    {instruction}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};