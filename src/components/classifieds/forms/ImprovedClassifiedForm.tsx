import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import PersonalInfoSection from "./sections/PersonalInfoSection";
import CategorySection from "./sections/CategorySection";
import AdDetailsSection from "./sections/AdDetailsSection";
import LocationPriceSection from "./sections/LocationPriceSection";
import ContactSection from "./sections/ContactSection";
import ImageSection from "./sections/ImageSection";
import ManagementOptions from "./ManagementOptions";

const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  category: z.string().min(1, "Category is required"),
  location: z.string().min(1, "Location is required"),
  price: z.string().optional(),
  managementType: z.string().optional(),
  contact: z.object({
    email: z.string().email().optional(),
    phone: z.string().optional(),
    whatsapp: z.string().optional(),
  }),
  image_urls: z.array(z.string()).max(7, "Maximum 7 images allowed"),
});

type FormData = z.infer<typeof formSchema>;

interface ImprovedClassifiedFormProps {
  onSubmit: (data: FormData) => Promise<void>;
}

const ImprovedClassifiedForm = ({ onSubmit }: ImprovedClassifiedFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      title: "",
      description: "",
      category: "",
      location: "",
      price: "",
      managementType: "self",
      contact: {
        email: "",
        phone: "",
        whatsapp: "",
      },
      image_urls: [],
    },
  });

  const showManagementOptions = ["rental_home", "furnished_apartment"].includes(selectedCategory);

  const handleSubmit = async (data: FormData) => {
    try {
      setIsSubmitting(true);
      await onSubmit(data);
      form.reset();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <PersonalInfoSection form={form} />
        <CategorySection form={form} onCategoryChange={setSelectedCategory} />
        
        {showManagementOptions && (
          <ManagementOptions form={form} category={selectedCategory} />
        )}

        <AdDetailsSection form={form} />
        <LocationPriceSection form={form} />
        <ImageSection form={form} />
        <ContactSection form={form} />

        <Button 
          type="submit" 
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit Ad"}
        </Button>
      </form>
    </Form>
  );
};

export default ImprovedClassifiedForm;