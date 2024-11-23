import { CheckCircle, Users, DollarSign, BarChart } from "lucide-react";

const steps = [
  {
    title: "Sign Up",
    description: "Create your account as an Affiliate, Business, or Classified Poster in minutes.",
    icon: Users,
  },
  {
    title: "Promote or Post",
    description: "Share products with your audience or list your offerings to reach potential customers.",
    icon: CheckCircle,
  },
  {
    title: "Earn",
    description: "Get commissions for successful referrals or receive inquiries for your listings.",
    icon: DollarSign,
  },
  {
    title: "Track Success",
    description: "Monitor your performance with detailed analytics and real-time reporting.",
    icon: BarChart,
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            How It Works
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Start earning in four simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="glass-card rounded-2xl p-8 text-center hover-scale"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 mb-6 bg-primary/10 rounded-full">
                <step.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {step.title}
              </h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;