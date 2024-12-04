import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";

interface ContactSectionProps {
  form: UseFormReturn<any>;
}

const ContactSection = ({ form }: ContactSectionProps) => {
  return (
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
  );
};

export default ContactSection;