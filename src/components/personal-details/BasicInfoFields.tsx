import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Control } from "react-hook-form";
import { PersonalDetailsFormData } from "./PersonalDetailsForm";
import { differenceInYears } from "date-fns";

interface BasicInfoFieldsProps {
  control: Control<PersonalDetailsFormData>;
  watch: (name: string) => any;
}

export const BasicInfoFields = ({ control, watch }: BasicInfoFieldsProps) => {
  const birthDate = watch("birthDate");
  const calculatedAge = birthDate 
    ? differenceInYears(new Date(), new Date(birthDate))
    : 0;

  return (
    <div className="space-y-6">
      <FormField
        control={control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-foreground">Full Name</FormLabel>
            <FormControl>
              <Input 
                placeholder="Enter your full name" 
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
        name="birthDate"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-foreground">Birth Date</FormLabel>
            <FormControl>
              <Input 
                type="date" 
                {...field} 
                className="modern-input bg-white/5"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {calculatedAge >= 18 && (
        <FormField
          control={control}
          name="relationshipStatus"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-foreground">Relationship Status</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-wrap gap-4"
                >
                  {["Single", "In a Relationship", "Married", "Prefer not to say"].map((status) => (
                    <FormItem key={status} className="flex items-center space-x-2">
                      <FormControl>
                        <RadioGroupItem value={status} />
                      </FormControl>
                      <FormLabel className="font-normal text-foreground/80">{status}</FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </div>
  );
};