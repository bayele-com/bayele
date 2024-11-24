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

      // Ensure all required fields are present
      const productData = {
        business_id: user.id,
        name: formData.name,
        description: formData.description || null,
        price: formData.price,
        commission_rate: formData.commission_rate,
        category: formData.category,
        status: formData.status || 'active',
        image_urls: formData.image_urls || [],
        metadata: {} // Add default metadata as required by the schema
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
    } catch (error: any) {
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