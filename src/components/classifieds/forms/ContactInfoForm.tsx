import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UseFormReturn } from "react-hook-form";

interface ContactInfoFormProps {
  form: UseFormReturn<any>;
  onSubmit: () => void;
  onBack: () => void;
  isSubmitting: boolean;
}

const ContactInfoForm = ({ form, onSubmit, onBack, isSubmitting }: ContactInfoFormProps) => {
  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="contact_info.email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email (optional)</FormLabel>
            <FormControl>
              <Input type="email" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="contact_info.phone"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Phone (optional)</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="contact_info.whatsapp"
        render={({ field }) => (
          <FormItem>
            <FormLabel>WhatsApp (optional)</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="flex gap-4">
        <Button type="button" variant="outline" onClick={onBack} className="flex-1">
          Back
        </Button>
        <Button 
          type="button" 
          onClick={onSubmit} 
          disabled={isSubmitting}
          className="flex-1"
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </div>
    </div>
  );
};

export default ContactInfoForm;