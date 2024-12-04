import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ContactInfo {
  phone?: string;
  email?: string;
  whatsapp?: string;
}

interface ContactDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  contactInfo?: ContactInfo;
}

const ContactDialog = ({ isOpen, onOpenChange, title, contactInfo }: ContactDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-gray-600">
            Contact information:
          </p>
          <div className="bg-gray-50 p-4 rounded-lg">
            {contactInfo?.whatsapp && (
              <Button
                className="w-full"
                onClick={() => window.open(`https://wa.me/${contactInfo.whatsapp}`, '_blank')}
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Contact via WhatsApp
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContactDialog;