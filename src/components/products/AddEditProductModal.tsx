import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ProductForm, ProductFormData } from "./ProductForm";

interface AddEditProductModalProps {
  open: boolean;
  onClose: () => void;
  product?: Partial<ProductFormData> & { id?: string } | null;
}

const AddEditProductModal = ({ open, onClose, product }: AddEditProductModalProps) => {
  const { toast } = useToast();

  const onSubmit = async (formData: ProductFormData) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user?.id) {
        throw new Error("User not authenticated");
      }

      const productData = {
        ...formData,
        business_id: user.id,
      };

      if (product?.id) {
        const { error } = await supabase
          .from("products")
          .update(productData)
          .eq("id", product.id)
          .single();

        if (error) throw error;

        toast({
          title: "Success",
          description: "Product updated successfully",
        });
      } else {
        const { error } = await supabase
          .from("products")
          .insert(productData)
          .single();

        if (error) throw error;

        toast({
          title: "Success",
          description: "Product created successfully",
        });
      }

      onClose();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save product",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {product ? "Edit Product" : "Add New Product"}
          </DialogTitle>
        </DialogHeader>
        <ProductForm
          onSubmit={onSubmit}
          onClose={onClose}
          defaultValues={product}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AddEditProductModal;