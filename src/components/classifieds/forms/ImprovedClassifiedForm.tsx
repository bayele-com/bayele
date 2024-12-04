import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ImageUpload } from "../ImageUpload";
import { toast } from "sonner";

const MAX_FILE_SIZE = 512000; // 0.5MB in bytes
const MAX_FILES = 7;

const categories = [
  { value: "rental_home", label: "Rental Home" },
  { value: "furnished_apartment", label: "Furnished Apartment" },
  { value: "announcements", label: "Announcements" },
  { value: "jobs", label: "Jobs" },
  { value: "miscellaneous", label: "Miscellaneous" },
];

const locations = [
  { value: "Yaounde", label: "Yaoundé" },
  { value: "Douala", label: "Douala" },
];

const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  category: z.string().min(1, "Category is required"),
  location: z.string().min(1, "Location is required"),
  price: z.string().optional(),
  contact: z.object({
    email: z.string().email().optional(),
    phone: z.string().optional(),
    whatsapp: z.string().optional(),
  }),
  image_urls: z.array(z.string()).max(MAX_FILES, `Maximum ${MAX_FILES} images allowed`),
});

type FormData = z.infer<typeof formSchema>;

interface ImprovedClassifiedFormProps {
  onSubmit: (data: FormData) => Promise<void>;
}

const ImprovedClassifiedForm = ({ onSubmit }: ImprovedClassifiedFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      contact: {
        email: "",
        phone: "",
        whatsapp: "",
      },
      image_urls: [],
    },
  });

  const handleSubmit = async (data: FormData) => {
    try {
      setIsSubmitting(true);
      await onSubmit(data);
      form.reset();
      toast.success("Ad submitted successfully!");
    } catch (error) {
      toast.error("Failed to submit ad. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="John" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter a descriptive title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a location" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {locations.map((location) => (
                    <SelectItem key={location.value} value={location.value}>
                      {location.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price (Optional)</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Enter price in FCFA" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Provide detailed information about your ad"
                  className="min-h-[150px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="image_urls"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Images (Max {MAX_FILES} images, 0.5MB each)</FormLabel>
              <FormControl>
                <ImageUpload
                  value={field.value}
                  onChange={field.onChange}
                  maxFiles={MAX_FILES}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-4">
          <h3 className="font-medium">Contact Information</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="contact.email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email (Optional)</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="your@email.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="contact.phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="+237..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="contact.whatsapp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>WhatsApp (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="+237..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

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