import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import SignupForm from "@/components/SignupForm";
import { ArrowLeft } from "lucide-react";

const userTypes = [
  {
    id: "affiliate",
    title: "Affiliate",
    description: "Promote products and earn commissions",
    icon: "💰",
  },
  {
    id: "business",
    title: "Business",
    description: "List your products and manage sales",
    icon: "🏪",
  },
  {
    id: "classified",
    title: "Classified User",
    description: "Post ads and reach potential customers",
    icon: "📢",
  },
];

const Signup = () => {
  const [searchParams] = useSearchParams();
  const [selectedType, setSelectedType] = useState(searchParams.get("type") || "");
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Button
        variant="ghost"
        className="mb-8"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>

      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Create your account</h1>
          <p className="mt-2 text-gray-600">
            Join Bayele and start earning today
          </p>
        </div>

        {!selectedType ? (
          <div className="grid gap-6 md:grid-cols-3">
            {userTypes.map((type) => (
              <Card
                key={type.id}
                className="p-6 cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => setSelectedType(type.id)}
              >
                <div className="text-4xl mb-4">{type.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{type.title}</h3>
                <p className="text-gray-600 text-sm">{type.description}</p>
              </Card>
            ))}
          </div>
        ) : (
          <SignupForm
            userType={selectedType}
            onBack={() => setSelectedType("")}
          />
        )}
      </div>
    </div>
  );
};

export default Signup;