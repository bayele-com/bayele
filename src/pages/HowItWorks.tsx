import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const HowItWorksPage = () => {
  return (
    <main className="min-h-screen">
      <Navbar />
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-16">How It Works</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h2 className="text-2xl font-semibold mb-4">Promote and Earn</h2>
              <p className="text-gray-600">
                Sign up as an affiliate, choose products to promote, share with your
                audience, and earn commissions on successful referrals.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-primary">2</span>
              </div>
              <h2 className="text-2xl font-semibold mb-4">List and Sell</h2>
              <p className="text-gray-600">
                Create your business profile, add your products or services,
                set prices, and start receiving orders from customers.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <h2 className="text-2xl font-semibold mb-4">Post Ads</h2>
              <p className="text-gray-600">
                Create your classified ad, choose your target location,
                add contact details, and optionally boost visibility with sponsorship.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default HowItWorksPage;