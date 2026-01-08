"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Menu as MenuIcon, 
  X, 
  Instagram, 
  Linkedin, 
  Mail,
  MapPin,
  Clock
} from "lucide-react";

// GSAP & Lenis
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import Navbar from "@/components/Navbar";

gsap.registerPlugin(ScrollTrigger);

export default function AboutPage() {
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
    tl.from(".about-title-char", {
      y: 100,
      opacity: 0,
      rotate: 5,
      stagger: 0.05,
      duration: 1.2,
      ease: "power3.out",
      delay: 0.2
    })
    .from(".about-subtitle", {
        opacity: 0, 
        y: 20, 
        duration: 1
    }, "-=0.5");

    // B. Profile Image Reveal
    gsap.utils.toArray<HTMLElement>(".profile-card").forEach((card) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: "top 80%",
            },
            y: 50,
            opacity: 0,
            duration: 1.2,
            ease: "power3.out"
        });
    });

    // C. Text Fade Ins
    gsap.utils.toArray<HTMLElement>(".fade-in-text").forEach((text) => {
        gsap.from(text, {
            scrollTrigger: {
                trigger: text,
                start: "top 85%",
            },
            y: 30,
            opacity: 0,
            duration: 1,
        });
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
            <Link href="/about" className="font-serif text-5xl md:text-7xl cursor-pointer text-[#D4AF37] italic transition-all duration-300">
               Story
            </Link>
            <Link href="/menu" className="font-serif text-5xl md:text-7xl cursor-pointer hover:text-[#D4AF37] hover:italic transition-all duration-300">
               Menu Collection
            </Link>
            <Link href="#contact" className="font-serif text-5xl md:text-7xl cursor-pointer hover:text-[#D4AF37] hover:italic transition-all duration-300">
               Contact
            </Link>
        </div>
      </div>

      {/* --- HERO SECTION --- */}
<header className="relative w-full h-screen flex flex-col items-center justify-center px-6 md:px-24 overflow-hidden">
  {/* BACKGROUND IMAGE */}
  <div className="absolute inset-0 z-0 opacity-50 parallax-wrapper">
    <Image 
      src="/about.jpg" 
      alt="Orphée Pâtisserie Atelier"
      fill
      className="object-cover scale-125"
      priority
    />
    {/* Gradient Overlay for Readability */}
    <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505] z-10" />
  </div>

  <div className="relative z-20 max-w-4xl mx-auto text-center">
    <span className="about-subtitle block font-mono text-[#D4AF37] text-xs tracking-[0.4em] mb-6 uppercase">
      The Architects of Taste
    </span>
    <h1 className="font-serif text-6xl md:text-8xl leading-[0.9] mb-12">
      <span className="inline-block about-title-char">Crafting</span>{' '}
      <span className="inline-block about-title-char italic text-[#D4AF37]">Legacy</span>{' '}
      <span className="inline-block about-title-char">in Haren</span>
    </h1>
    <p className="about-subtitle text-white/60 text-lg font-light leading-relaxed max-w-2xl mx-auto">
      Orphée is the collision of two distinct worlds. A rigorous pursuit of Dutch perfectionism and the chaotic, buttery soul of the French bakery.
    </p>
  </div>
</header>

      {/* --- THE OWNERS --- */}
      <section className="w-full px-6 md:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* OWNER 1: The Dutch Architect */}
            <div className="profile-card relative h-[80vh] bg-[#111] overflow-hidden group">
                <Image 
                    src="https://images.unsplash.com/photo-1583394293214-28ded15ee548?q=80&w=2680&auto=format&fit=crop"
                    alt="Lucas van der Berg"
                    fill
                    className="object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute bottom-0 left-0 w-full p-12 bg-gradient-to-t from-black/90 to-transparent">
                    <span className="font-mono text-[#D4AF37] text-xs tracking-widest uppercase mb-2 block">Head Chocolatier</span>
                    <h2 className="font-serif text-4xl mb-4">Kleo</h2>
                    <p className="text-white/60 text-sm max-w-sm mb-6">
                        "Chocolate is engineering. The temperature, the snap, the crystal structure—it must be precise. Groningen taught me that quality speaks louder than decoration."
                    </p>
                    <div className="flex gap-4">
                        <a href="#" className="p-2 border border-white/20 rounded-full hover:bg-[#D4AF37] hover:text-black hover:border-[#D4AF37] transition-all"><Instagram size={16}/></a>
                        <a href="#" className="p-2 border border-white/20 rounded-full hover:bg-[#D4AF37] hover:text-black hover:border-[#D4AF37] transition-all"><Linkedin size={16}/></a>
                    </div>
                </div>
            </div>

            {/* OWNER 2: The French Artist */}
            <div className="profile-card relative h-[80vh] bg-[#111] overflow-hidden group mt-12 md:mt-24">
                 <Image 
                    src="https://images.unsplash.com/photo-1583394293214-28ded15ee548?q=80&w=2680&auto=format&fit=crop"
                    alt="Elodie Dubois"
                    fill
                    className="object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute bottom-0 left-0 w-full p-12 bg-gradient-to-t from-black/90 to-transparent">
                    <span className="font-mono text-[#D4AF37] text-xs tracking-widest uppercase mb-2 block">Executive Pâtissier</span>
                    <h2 className="font-serif text-4xl mb-4">Jordane</h2>
                    <p className="text-white/60 text-sm max-w-sm mb-6">
                        "I brought my grandmother's sourdough starter from Lyon. Bread is alive; you cannot force it. You must listen to the dough."
                    </p>
                    <div className="flex gap-4">
                        <a href="#" className="p-2 border border-white/20 rounded-full hover:bg-[#D4AF37] hover:text-black hover:border-[#D4AF37] transition-all"><Instagram size={16}/></a>
                        <a href="#" className="p-2 border border-white/20 rounded-full hover:bg-[#D4AF37] hover:text-black hover:border-[#D4AF37] transition-all"><Mail size={16}/></a>
                    </div>
                </div>
            </div>

        </div>
      </section>

      {/* --- TEXT SCROLL SECTION --- */}
      <section className="py-32 px-6 md:px-24 max-w-5xl mx-auto text-center">
        <h3 className="fade-in-text font-serif text-3xl md:text-5xl leading-tight mb-12">
            "We chose Haren because it understands quiet luxury. It is not about the loudest sign on the street, but the deepest flavor in the bite."
        </h3>
        <div className="fade-in-text w-[1px] h-24 bg-[#D4AF37] mx-auto"></div>
      </section>

      {/* --- LOCATION / ATELIER --- */}
      <section id="contact" className="w-full bg-[#0A0A0A] border-t border-white/5">
        <div className="grid grid-cols-1 md:grid-cols-2">
            
            {/* Info Side */}
            <div className="p-12 md:p-24 flex flex-col justify-center">
                <span className="font-mono text-[#D4AF37] text-xs tracking-[0.2em] mb-8 uppercase">Visit The Atelier</span>
                <h2 className="font-serif text-5xl mb-12">Orphée Haren</h2>
                
                <div className="space-y-8">
                    <div className="flex gap-6 items-start fade-in-text">
                        <MapPin className="text-[#D4AF37] mt-1 shrink-0" />
                        <div>
                            <h4 className="font-bold text-lg mb-2">Address</h4>
                            <p className="text-white/60 font-light">Rijksstraatweg 220<br/>9752 Haren<br/>The Netherlands</p>
                        </div>
                    </div>

                    <div className="flex gap-6 items-start fade-in-text">
                        <Clock className="text-[#D4AF37] mt-1 shrink-0" />
                        <div>
                            <h4 className="font-bold text-lg mb-2">Opening Hours</h4>
                            <div className="grid grid-cols-2 gap-x-12 text-white/60 font-light text-sm">
                                <span>Wed - Fri</span><span>08:00 - 17:00</span>
                                <span>Saturday</span><span>08:00 - 16:00</span>
                                <span>Sunday</span><span>09:00 - 14:00</span>
                                <span className="text-[#D4AF37]">Mon - Tue</span><span className="text-[#D4AF37]">Closed</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-6 items-start fade-in-text">
                        <Mail className="text-[#D4AF37] mt-1 shrink-0" />
                        <div>
                            <h4 className="font-bold text-lg mb-2">Contact</h4>
                            <p className="text-white/60 font-light">
                                <a href="mailto:info@orphee.nl" className="hover:text-white underline decoration-white/20 underline-offset-4">info@orphee.nl</a>
                                <br/>+31 50 123 4567
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Map / Image Side */}
            <div className="relative h-[50vh] md:h-auto min-h-[600px] bg-[#111]">
                 <Image 
                    src="https://images.unsplash.com/photo-1497215842964-222b430dc094?q=80&w=2670&auto=format&fit=crop"
                    alt="Storefront"
                    fill
                    className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="bg-black/80 backdrop-blur-md p-6 border border-[#D4AF37]/30 rounded-sm">
                        <span className="font-serif text-2xl text-[#D4AF37]">View Map</span>
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