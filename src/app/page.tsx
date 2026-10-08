import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import About from '@/components/About';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0A1A2F] text-white font-sans antialiased">
      <Navbar />
      <main className="pt-16">
        <Hero />
        <Features />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}