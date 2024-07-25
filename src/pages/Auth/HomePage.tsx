import AboutSection from "../../components/home/AboutSection";
import Contact from "../../components/home/Contact";
import Footer from "../../components/home/Footer";
import Header from "../../components/home/Header";
import HeroSection from "../../components/home/Hero";
import HowItWorks from "../../components/home/How";
import Services from "../../components/home/Services";

export default function HomePage() {
  return (
    <article className="bg-black text-white">
      <Header />
      <HeroSection />
      <AboutSection />
      <HowItWorks />
      <Services />
      <Contact />
      <Footer />
    </article>
  );
}
