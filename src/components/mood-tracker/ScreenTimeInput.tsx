import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Monitor } from "lucide-react";
import { toast } from "sonner";

interface ScreenTimeInputProps {
  screenTime: number;
  onChange: (value: number) => void;
}

const ScreenTimeInput = ({ screenTime, onChange }: ScreenTimeInputProps) => {
  const handleScreenTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value >= 0 && value <= 24) {
      onChange(value);
    } else {
      toast.error("Please enter a value between 0 and 24 hours");
    }
  };

  return (
    <div className="space-y-2">
      <Label className="flex items-center gap-2">
        <Monitor className="w-4 h-4" />
        Screen Time (hours)
      </Label>
      <Input
        type="number"
        min={0}
        max={24}
        value={screenTime}
        onChange={handleScreenTimeChange}
        placeholder="Enter hours (0-24)"
      />
    </div>
  );
};

export default ScreenTimeInput;