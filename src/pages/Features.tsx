import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Features = () => {
  return (
    <main className="min-h-screen">
      <Navbar />
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-16">Our Features</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-card p-8 rounded-2xl">
              <h2 className="text-2xl font-semibold mb-4">Promote and Earn</h2>
              <p className="text-gray-600">
                Join our affiliate program to promote products and services. Earn commissions
                for every successful referral.
              </p>
            </div>
            
            <div className="glass-card p-8 rounded-2xl">
              <h2 className="text-2xl font-semibold mb-4">List and Sell</h2>
              <p className="text-gray-600">
                Create your business profile and list your products or services.
                Reach potential customers across Cameroon.
              </p>
            </div>
            
            <div className="glass-card p-8 rounded-2xl">
              <h2 className="text-2xl font-semibold mb-4">Post Ads</h2>
              <p className="text-gray-600">
                Post classified ads to reach your target audience. Boost visibility
                with sponsored listings.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default Features;