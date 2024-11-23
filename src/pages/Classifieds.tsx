import Navbar from "../components/Navbar";
import ClassifiedsSection from "../components/Classifieds";
import Footer from "../components/Footer";

const ClassifiedsPage = () => {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-16">
        <ClassifiedsSection />
      </div>
      <Footer />
    </main>
  );
};

export default ClassifiedsPage;