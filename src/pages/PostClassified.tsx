import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ImprovedClassifiedForm from "@/components/classifieds/forms/ImprovedClassifiedForm";

const PostClassified = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (formData: any) => {
    try {
      const { error } = await supabase
        .from("classified_ads")
        .insert({
          title: formData.title,
          description: formData.description,
          category: formData.category,
          ad_type: formData.ad_type || 'offer', // Add required ad_type field
          location: formData.location,
          price: formData.price ? parseFloat(formData.price) : null,
          contact_info: {
            first_name: formData.firstName,
            last_name: formData.lastName,
            ...formData.contact
          },
          image_urls: formData.image_urls,
          status: "pending",
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Your classified ad has been submitted for review",
      });
      navigate("/classifieds");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to post classified ad. Please try again.",
      });
      throw error;
    }
  };

  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-24 pb-16 px-4 md:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Post a Classified Ad</h1>
          <p className="text-gray-600 mb-8">Fill in the details below to submit your ad for review</p>
          <ImprovedClassifiedForm onSubmit={handleSubmit} />
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default PostClassified;