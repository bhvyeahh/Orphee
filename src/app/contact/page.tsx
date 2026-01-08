"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Menu as MenuIcon, 
  X, 
  ArrowUpRight,
  Mail,
  MapPin,
  Phone,
  MessageSquare
} from "lucide-react";

// GSAP & Lenis
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import Navbar from "@/components/Navbar";

gsap.registerPlugin(ScrollTrigger);

export default function ContactPage() {
  const container = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // --- 1. SMOOTH SCROLL ---
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  // --- 2. GSAP ANIMATIONS ---
  useGSAP(() => {
    const tl = gsap.timeline();

    // A. Hero Reveal
    tl.from(".contact-hero-text", {
      y: 100,
      opacity: 0,
      rotate: 2,
      stagger: 0.1,
      duration: 1.2,
      ease: "power3.out",
      delay: 0.2
    });

    // B. Form Reveal
    gsap.from(".contact-form-row", {
        scrollTrigger: {
            trigger: ".contact-form-section",
            start: "top 70%",
        },
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: "power2.out"
    });

    // C. Info Cards Reveal
    gsap.from(".info-card", {
        scrollTrigger: {
            trigger: ".info-grid",
            start: "top 80%",
        },
        y: 50,
        opacity: 0,
        stagger: 0.2,
        duration: 1.2,
        ease: "power3.out"
    });

  }, { scope: container });

  return (
    <div ref={container} className="relative w-full min-h-screen bg-[#050505] text-[#EAE6D9] font-sans selection:bg-[#D4AF37] selection:text-black">
      
      <Navbar />

      {/* --- FULLSCREEN MENU OVERLAY --- */}
      <div className={`fixed inset-0 bg-[#0F0F0F] z-40 transition-transform duration-700 ease-[bezier(0.76,0,0.24,1)] ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="h-full flex flex-col justify-center items-center gap-8">
            <Link href="/" className="font-serif text-5xl md:text-7xl cursor-pointer hover:text-[#D4AF37] hover:italic transition-all duration-300">
               Home
            </Link>
            <Link href="/about" className="font-serif text-5xl md:text-7xl cursor-pointer hover:text-[#D4AF37] hover:italic transition-all duration-300">
               Story
            </Link>
            <Link href="/menu" className="font-serif text-5xl md:text-7xl cursor-pointer hover:text-[#D4AF37] hover:italic transition-all duration-300">
               Menu Collection
            </Link>
            <Link href="/contact" className="font-serif text-5xl md:text-7xl cursor-pointer text-[#D4AF37] italic transition-all duration-300">
               Contact
            </Link>
        </div>
      </div>

      {/* --- HERO SECTION --- */}
      <header className="relative w-full pt-48 pb-24 px-6 md:px-24">
        <div className="max-w-4xl">
            <span className="contact-hero-text block font-mono text-[#D4AF37] text-xs tracking-[0.4em] mb-6 uppercase">
                Concierge Service
            </span>
            <h1 className="font-serif text-6xl md:text-8xl leading-[0.9] mb-12">
               <span className="block contact-hero-text">Start a</span>
               <span className="block contact-hero-text italic text-[#D4AF37]">Conversation.</span>
            </h1>
            <p className="contact-hero-text text-white/60 text-lg font-light leading-relaxed max-w-xl">
                Whether you wish to commission a bespoke wedding cake, inquire about wholesale partnerships, or simply say bonjour.
            </p>
        </div>
      </header>

      {/* --- MAIN CONTENT GRID --- */}
      <section className="w-full px-6 md:px-24 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
            
            {/* LEFT: FORM */}
            <div className="contact-form-section">
                <form className="space-y-12">
                    <div className="contact-form-row group">
                        <label className="block font-mono text-[10px] uppercase tracking-widest text-white/40 mb-2 group-focus-within:text-[#D4AF37] transition-colors">Your Name</label>
                        <input type="text" placeholder="John Doe" className="w-full bg-transparent border-b border-white/20 py-4 text-xl font-serif focus:outline-none focus:border-[#D4AF37] transition-colors placeholder:text-white/10" />
                    </div>
                    
                    <div className="contact-form-row group">
                        <label className="block font-mono text-[10px] uppercase tracking-widest text-white/40 mb-2 group-focus-within:text-[#D4AF37] transition-colors">Email Address</label>
                        <input type="email" placeholder="john@example.com" className="w-full bg-transparent border-b border-white/20 py-4 text-xl font-serif focus:outline-none focus:border-[#D4AF37] transition-colors placeholder:text-white/10" />
                    </div>

                    <div className="contact-form-row group">
                        <label className="block font-mono text-[10px] uppercase tracking-widest text-white/40 mb-2 group-focus-within:text-[#D4AF37] transition-colors">Inquiry Type</label>
                        <select className="w-full bg-transparent border-b border-white/20 py-4 text-xl font-serif focus:outline-none focus:border-[#D4AF37] transition-colors text-[#EAE6D9] appearance-none cursor-pointer">
                            <option className="bg-[#111]">General Inquiry</option>
                            <option className="bg-[#111]">Wedding / Events</option>
                            <option className="bg-[#111]">Wholesale / B2B</option>
                            <option className="bg-[#111]">Press & Media</option>
                        </select>
                    </div>

                    <div className="contact-form-row group">
                        <label className="block font-mono text-[10px] uppercase tracking-widest text-white/40 mb-2 group-focus-within:text-[#D4AF37] transition-colors">Message</label>
                        <textarea rows={4} placeholder="Tell us about your needs..." className="w-full bg-transparent border-b border-white/20 py-4 text-xl font-serif focus:outline-none focus:border-[#D4AF37] transition-colors placeholder:text-white/10 resize-none"></textarea>
                    </div>

                    <div className="contact-form-row pt-8">
                        <button type="button" className="group flex items-center gap-4 text-xl font-serif hover:text-[#D4AF37] transition-colors">
                            <span>Send Message</span>
                            <div className="w-12 h-[1px] bg-white/20 group-hover:bg-[#D4AF37] transition-colors"></div>
                            <ArrowUpRight className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </button>
                    </div>
                </form>
            </div>

            {/* RIGHT: INFO & DIRECT LINES */}
            <div className="space-y-16">
                
                {/* Visual Map/Image */}
                <div className="info-card relative h-[300px] w-full bg-[#111] overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
                    <Image 
                        src="https://images.unsplash.com/photo-1496449903678-68ddcb189a24?q=80&w=2670&auto=format&fit=crop"
                        alt="Haren Location"
                        fill
                        className="object-cover opacity-60"
                    />
                    <div className="absolute inset-0 p-8 flex flex-col justify-end">
                        <h3 className="font-serif text-3xl">Visit Haren</h3>
                        <p className="text-sm text-white/70 mt-2">Rijksstraatweg 220, 9752 Haren</p>
                    </div>
                </div>

                {/* Direct Contacts Grid */}
                <div className="info-grid grid grid-cols-1 sm:grid-cols-2 gap-8">
                    
                    <div className="info-card p-6 border border-white/10 hover:border-[#D4AF37]/50 transition-colors group">
                        <Mail className="text-[#D4AF37] mb-4" />
                        <h4 className="font-serif text-xl mb-2">General</h4>
                        <a href="mailto:info@orphee.nl" className="text-sm text-white/50 group-hover:text-white transition-colors">info@orphee.nl</a>
                    </div>

                    <div className="info-card p-6 border border-white/10 hover:border-[#D4AF37]/50 transition-colors group">
                        <MessageSquare className="text-[#D4AF37] mb-4" />
                        <h4 className="font-serif text-xl mb-2">Wholesale</h4>
                        <a href="mailto:b2b@orphee.nl" className="text-sm text-white/50 group-hover:text-white transition-colors">b2b@orphee.nl</a>
                    </div>

                    <div className="info-card p-6 border border-white/10 hover:border-[#D4AF37]/50 transition-colors group">
                        <Phone className="text-[#D4AF37] mb-4" />
                        <h4 className="font-serif text-xl mb-2">Atelier</h4>
                        <span className="text-sm text-white/50 group-hover:text-white transition-colors">+31 50 123 4567</span>
                    </div>

                    <div className="info-card p-6 border border-white/10 hover:border-[#D4AF37]/50 transition-colors group">
                        <MapPin className="text-[#D4AF37] mb-4" />
                        <h4 className="font-serif text-xl mb-2">Hours</h4>
                        <span className="text-sm text-white/50 block">Wed-Sun: 08:00 - 17:00</span>
                    </div>

                </div>

            </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="relative w-full py-20 px-6 md:px-12 bg-[#050505] border-t border-white/5">
         <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-12">
            <div className="md:w-1/2">
               <h2 className="font-serif text-4xl mb-6">Orphée.</h2>
               <p className="text-white/50 text-sm leading-relaxed max-w-sm">
                 We bake with the rhythm of the seasons. A piece of France in the sturdy north of the Netherlands.
               </p>
            </div>
            <div className="grid grid-cols-2 gap-12 font-mono text-xs uppercase tracking-widest text-white/40">
               <div>
                  <h4 className="text-white mb-4">Visit</h4>
                  <ul className="space-y-2">
                     <li>Rijksstraatweg 220</li>
                     <li>9752 Haren</li>
                     <li>The Netherlands</li>
                  </ul>
               </div>
               <div>
                  <h4 className="text-white mb-4">Contact</h4>
                  <ul className="space-y-2">
                     <li className="hover:text-[#D4AF37] cursor-pointer">Instagram</li>
                     <li className="hover:text-[#D4AF37] cursor-pointer">info@orphee.nl</li>
                  </ul>
               </div>
            </div>
         </div>
         <div className="mt-20 text-center text-white/10 text-[10px] uppercase font-mono">
            © 2026 Orphée Pâtisserie • Holland
         </div>
      </footer>

    </div>
  );
}