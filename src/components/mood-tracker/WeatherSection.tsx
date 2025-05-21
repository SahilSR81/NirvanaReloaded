import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Cloud, CloudRain, Sun, Snowflake } from "lucide-react";
import { Slider } from "@/components/ui/slider";

interface WeatherSectionProps {
  selectedWeather: string | null;
  weatherRating: number;
  onWeatherSelect: (weather: string) => void;
  onWeatherRatingChange: (rating: number) => void;
}

const WeatherSection = ({ 
  selectedWeather, 
  weatherRating,
  onWeatherSelect,
  onWeatherRatingChange 
}: WeatherSectionProps) => {
  const weather = [
    { icon: Sun, label: "Sunny", value: "sunny" },
    { icon: Cloud, label: "Cloudy", value: "cloudy" },
    { icon: CloudRain, label: "Rainy", value: "rainy" },
    { icon: Snowflake, label: "Cold", value: "cold" }
  ];

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="gradient-text">How's the weather?</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-4 gap-4">
          {weather.map(({ icon: Icon, label, value }) => (
            <button
              key={value}
              onClick={() => onWeatherSelect(value)}
              className={`p-4 rounded-lg border flex flex-col items-center transition-all duration-300 hover:border-gradient-middle ${
                selectedWeather === value ? 'border-gradient-middle bg-white/5' : 'border-white/10'
              }`}
            >
              <Icon className={`w-8 h-8 mb-2 ${
                selectedWeather === value ? 'text-gradient-middle' : 'text-foreground/60'
              }`} />
              <div className="text-sm">{label}</div>
            </button>
          ))}
        </div>
        
        {selectedWeather && (
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Rate today's weather (1-10)</p>
            <Slider
              value={[weatherRating]}
              onValueChange={(value) => onWeatherRatingChange(value[0])}
              max={10}
              min={1}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>1</span>
              <span>5</span>
              <span>10</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default WeatherSection;