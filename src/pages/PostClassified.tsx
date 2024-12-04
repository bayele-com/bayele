import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PostClassifiedForm from "@/components/classifieds/PostClassifiedForm";

const PostClassified = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (formData: any) => {
    try {
      const { error } = await supabase
        .from("classified_ads")
        .insert({
          ...formData,
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
        description: "Failed to post classified ad. Please try again.",
      });
    }
  };

  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-24 pb-16 px-4 md:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Post a Classified Ad</h1>
          <PostClassifiedForm onSubmit={handleSubmit} />
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default PostClassified;