import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";
import { PersonalDetailsFormData } from "./PersonalDetailsForm";

interface LifestyleFieldsProps {
  control: Control<PersonalDetailsFormData>;
}

export const LifestyleFields = ({ control }: LifestyleFieldsProps) => {
  return (
    <div className="space-y-6">
      <FormField
        control={control}
        name="occupation"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-foreground">Occupation</FormLabel>
            <FormControl>
              <Input 
                placeholder="Your occupation" 
                {...field} 
                className="modern-input bg-white/5"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={control}
        name="hobbies"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-foreground">Hobbies & Interests</FormLabel>
            <FormControl>
              <Input 
                placeholder="Your hobbies and interests" 
                {...field} 
                className="modern-input bg-white/5"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={control}
          name="sleepTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-foreground">What time do you usually go to sleep?</FormLabel>
              <FormControl>
                <Input 
                  type="time" 
                  {...field} 
                  className="modern-input bg-white/5"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={control}
          name="wakeTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-foreground">What time do you usually wake up?</FormLabel>
              <FormControl>
                <Input 
                  type="time" 
                  {...field} 
                  className="modern-input bg-white/5"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};