import { useState } from "react";
import CustomerDetailsForm from "./forms/CustomerDetailsForm";
import DeliveryInfoForm from "./forms/DeliveryInfoForm";
import PaymentMethodForm from "./forms/PaymentMethodForm";
import OrderSummary from "./OrderSummary";
import { Button } from "@/components/ui/button";

interface OrderFormStepsProps {
  productId: string;
  onSubmit: (data: any) => Promise<void>;
}

const OrderFormSteps = ({ productId, onSubmit }: OrderFormStepsProps) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    customerDetails: {},
    deliveryInfo: {},
    paymentMethod: "",
  });

  const updateFormData = (stepData: any, stepName: string) => {
    setFormData((prev) => ({
      ...prev,
      [stepName]: stepData,
    }));
    setStep((prev) => prev + 1);
  };

  const handleSubmit = async () => {
    await onSubmit(formData);
  };

  return (
    <div className="space-y-8">
      {step === 1 && (
        <CustomerDetailsForm
          onNext={(data) => updateFormData(data, "customerDetails")}
        />
      )}
      {step === 2 && (
        <DeliveryInfoForm
          onNext={(data) => updateFormData(data, "deliveryInfo")}
          onBack={() => setStep(1)}
        />
      )}
      {step === 3 && (
        <PaymentMethodForm
          onNext={(data) => updateFormData(data, "paymentMethod")}
          onBack={() => setStep(2)}
        />
      )}
      {step === 4 && (
        <div className="space-y-6">
          <OrderSummary
            productId={productId}
            formData={formData}
          />
          <div className="flex justify-between">
            <Button variant="outline" onClick={() => setStep(3)}>
              Back
            </Button>
            <Button onClick={handleSubmit}>
              Place Order
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderFormSteps;