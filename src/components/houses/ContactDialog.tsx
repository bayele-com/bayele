import { Button } from "@/components/ui/button";
import { MessageSquare, Phone } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface ContactInfo {
  phone?: string;
  whatsapp?: string;
}

interface ContactDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  contactInfo?: ContactInfo;
}

const ContactDialog = ({ isOpen, onOpenChange, title, contactInfo }: ContactDialogProps) => {
  const { toast } = useToast();

  const handleContactClick = (type: string, value?: string) => {
    if (!value) {
      toast({
        variant: "destructive",
        title: "Contact information unavailable",
        description: `No ${type} contact information provided.`,
      });
      return;
    }

    switch (type) {
      case 'whatsapp':
        window.open(`https://wa.me/${value}`, '_blank');
        break;
      case 'phone':
        window.open(`tel:${value}`, '_blank');
        break;
    }

    toast({
      title: "Contact initiated",
      description: `Opening ${type} contact method...`,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            Choose your preferred method of contact
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {contactInfo?.whatsapp && (
              <Button
                className="w-full"
                onClick={() => handleContactClick('whatsapp', contactInfo.whatsapp)}
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Contact via WhatsApp
              </Button>
            )}
            {contactInfo?.phone && (
              <Button
                variant="outline"
                className="w-full"
                onClick={() => handleContactClick('phone', contactInfo.phone)}
              >
                <Phone className="w-4 h-4 mr-2" />
                Contact via Phone
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContactDialog;