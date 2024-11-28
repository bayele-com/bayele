import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import BasicInfoForm from "./forms/BasicInfoForm";
import PricingLocationForm from "./forms/PricingLocationForm";
import ContactInfoForm from "./forms/ContactInfoForm";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  category: z.string().min(1, "Category is required"),
  ad_type: z.string().min(1, "Ad type is required"),
  price: z.number().optional(),
  location: z.string().min(1, "Location is required"),
  contact_info: z.object({
    email: z.string().email().optional(),
    phone: z.string().optional(),
    whatsapp: z.string().optional(),
  }),
  image_urls: z.array(z.string()).optional(),
});

type FormData = z.infer<typeof formSchema>;

interface PostClassifiedFormProps {
  onSubmit: (data: FormData) => Promise<void>;
}

const PostClassifiedForm = ({ onSubmit }: PostClassifiedFormProps) => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      ad_type: "",
      price: undefined,
      location: "",
      contact_info: {
        email: "",
        phone: "",
        whatsapp: "",
      },
      image_urls: [],
    },
  });

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const data = form.getValues();
      await onSubmit(data);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form className="space-y-6">
        {step === 1 && (
          <BasicInfoForm
            form={form}
            onNext={() => setStep(2)}
          />
        )}
        {step === 2 && (
          <PricingLocationForm
            form={form}
            onNext={() => setStep(3)}
            onBack={() => setStep(1)}
          />
        )}
        {step === 3 && (
          <ContactInfoForm
            form={form}
            onSubmit={handleSubmit}
            onBack={() => setStep(2)}
            isSubmitting={isSubmitting}
          />
        )}
      </form>
    </Form>
  );
};

export default PostClassifiedForm;