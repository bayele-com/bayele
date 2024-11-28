import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ProductForm, ProductFormData } from "./ProductForm";
import { Json } from "@/integrations/supabase/types";

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
        business_id: user.id,
        name: formData.name,
        description: formData.description || null,
        price: formData.price,
        commission_rate: formData.commission_rate,
        category: formData.category,
        status: formData.status || 'active',
        image_urls: formData.image_urls || [],
        metadata: {} as Json
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
      <DialogContent className="max-w-[800px] max-h-[90vh] overflow-y-auto p-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {product ? "Edit Product" : "Add New Product"}
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <ProductForm
            onSubmit={onSubmit}
            onClose={onClose}
            defaultValues={product}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddEditProductModal;