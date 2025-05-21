import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { BasicInfoFields } from "./BasicInfoFields";
import { LifestyleFields } from "./LifestyleFields";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { ArrowRight } from "lucide-react";

const personalDetailsSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  birthDate: z.string(),
  occupation: z.string(),
  hobbies: z.string(),
  sleepTime: z.string(),
  wakeTime: z.string(),
});

export type PersonalDetailsFormData = z.infer<typeof personalDetailsSchema>;

interface PersonalDetailsFormProps {
  onSubmit: (values: PersonalDetailsFormData) => Promise<void>;
}

export const PersonalDetailsForm = ({ onSubmit }: PersonalDetailsFormProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const form = useForm<PersonalDetailsFormData>({
    resolver: zodResolver(personalDetailsSchema),
    defaultValues: {
      name: "",
      birthDate: "",
      occupation: "",
      hobbies: "",
      sleepTime: "",
      wakeTime: "",
    },
  });

  const handleAlreadyFilled = () => {
    localStorage.setItem("personalDetailsFilled", "true");
    toast({
      title: "Welcome back!",
      description: "Redirecting to your dashboard.",
    });
    navigate("/welcome");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <BasicInfoFields control={form.control} watch={form.watch} />
        <LifestyleFields control={form.control} />
        <Button 
          type="submit" 
          className="w-full gradient-bg hover:opacity-90 text-white font-medium rounded-lg transform hover:scale-105 transition-all duration-300"
        >
          Complete Profile
        </Button>
      </form>
    </Form>
  );
};