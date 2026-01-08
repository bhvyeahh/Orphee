"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  ArrowUpRight, 
  Coffee, 
  Wheat, 
  Croissant, 
  Cake,
  Menu as MenuIcon, // Added import
  X                 // Added import
} from "lucide-react";

// GSAP & Lenis
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import Lenis from "lenis";
import Navbar from "@/components/Navbar";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// --- DATA: THE FULL MENU ---
const CATEGORIES = [
  {
    id: "viennoiserie",
    label: "Viennoiserie",
    subtitle: "The Art of Lamination",
    icon: <Croissant size={14} />,
    items: [
      { name: "Croissant au Beurre", price: 3.50, desc: "Isigny AOP Butter, 24 layers.", img: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=2526&auto=format&fit=crop" },
      { name: "Pain au Chocolat", price: 4.20, desc: "Valrhona dark chocolate batons.", img: "https://images.pexels.com/photos/7688286/pexels-photo-7688286.jpeg" },
      { name: "Almond Croissant", price: 5.50, desc: "Double baked, frangipane cream.", img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=2672&auto=format&fit=crop" },
      { name: "Cruffin Salted Caramel", price: 6.00, desc: "Croissant-muffin hybrid.", img: "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?q=80&w=2574&auto=format&fit=crop" },
    ]
  },
  {
    id: "boulangerie",
    label: "Boulangerie",
    subtitle: "Sourdough & Ancient Grains",
    icon: <Wheat size={14} />,
    items: [
      { name: "Baguette Tradition", price: 2.50, desc: "The Paris classic. 24h ferment.", img: "https://images.pexels.com/photos/461060/pexels-photo-461060.jpeg" },
      { name: "Pain de Campagne", price: 6.50, desc: "Rye & whole wheat sourdough.", img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=2672&auto=format&fit=crop" }, 
      { name: "Focaccia Rosemary", price: 5.50, desc: "Olive oil, sea salt, fresh herbs.", img: "https://images.pexels.com/photos/209143/pexels-photo-209143.jpeg" },
      { name: "Olive & Thyme Loaf", price: 7.00, desc: "Kalamata olives, fresh thyme.", img: "https://images.pexels.com/photos/209143/pexels-photo-209143.jpeg" },
    ]
  },
  {
    id: "patisserie",
    label: "Pâtisserie",
    subtitle: "Refined Desserts",
    icon: <Cake size={14} />,
    items: [
      { name: "Paris-Brest", price: 9.00, desc: "Choux pastry, praline mousseline.", img: "https://images.pexels.com/photos/267308/pexels-photo-267308.jpeg" },
      { name: "Opera Cake", price: 9.50, desc: "Coffee soaked sponge, ganache.", img: "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?q=80&w=2574&auto=format&fit=crop" },
      { name: "Tarte Tatin", price: 8.50, desc: "Caramelized apples, vanilla cream.", img: "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?q=80&w=2568&auto=format&fit=crop" },
      { name: "Eclair Pistachio", price: 7.50, desc: "Bronte pistachio, white chocolate.", img: "https://images.pexels.com/photos/267308/pexels-photo-267308.jpeg" },
    ]
  },
  {
    id: "coffee",
    label: "Café",
    subtitle: "Specialty Roasts",
    icon: <Coffee size={14} />,
    items: [
      { name: "Flat White", price: 4.50, desc: "Double shot, micro-foam.", img: "https://images.pexels.com/photos/302901/pexels-photo-302901.jpeg" },
      { name: "Espresso Tonic", price: 5.00, desc: "Double shot, fever tree tonic.", img: "https://images.pexels.com/photos/2659387/pexels-photo-2659387.jpeg" },
      { name: "V60 Pour Over", price: 6.50, desc: "Single origin Ethiopian beans.", img: "https://images.pexels.com/photos/2659387/pexels-photo-2659387.jpeg" },
      { name: "Matcha Latte", price: 5.50, desc: "Ceremonial grade, oat milk.", img: "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?q=80&w=2671&auto=format&fit=crop" },
    ]
  },
];

export default function MenuPage() {
  const container = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState("viennoiserie");
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Added State

  // --- 1. SMOOTH SCROLL ---
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
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
    
    // A. Hero Reveal
    const tl = gsap.timeline();
    tl.from(".menu-hero-text", {
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
      delay: 0.5
    });

    // B. Category Highlight on Scroll
    CATEGORIES.forEach((cat) => {
      ScrollTrigger.create({
        trigger: `#${cat.id}`,
        start: "top 60%",
        end: "bottom 60%",
        onEnter: () => setActiveCategory(cat.id),
        onEnterBack: () => setActiveCategory(cat.id),
      });
    });

    // C. Menu Items Stagger Reveal
    CATEGORIES.forEach((cat) => {
      gsap.from(`.item-${cat.id}`, {
        scrollTrigger: {
          trigger: `#${cat.id}`,
          start: "top 80%",
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out"
      });
    });

  }, { scope: container });

  // --- 3. SCROLL TO FUNCTION ---
  const scrollToCategory = (id: string) => {
    gsap.to(window, { duration: 1, scrollTo: { y: `#${id}`, offsetY: 100 }, ease: "power4.out" });
  };

  return (
    <div ref={container} className="relative w-full min-h-screen bg-[#050505] text-[#EAE6D9] font-sans selection:bg-[#D4AF37] selection:text-black">
      
      <Navbar />

      {/* --- FULLSCREEN MENU OVERLAY --- */}
      <div className={`fixed inset-0 bg-[#0F0F0F] z-40 transition-transform duration-700 ease-[bezier(0.76,0,0.24,1)] ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="h-full flex flex-col justify-center items-center gap-8">
            <Link href="/" className="font-serif text-5xl md:text-7xl cursor-pointer hover:text-[#D4AF37] hover:italic transition-all duration-300">
               Home
            </Link>
            <Link href="/#story" className="font-serif text-5xl md:text-7xl cursor-pointer hover:text-[#D4AF37] hover:italic transition-all duration-300">
               Story
            </Link>
            <Link href="/menu" className="font-serif text-5xl md:text-7xl cursor-pointer text-[#D4AF37] italic transition-all duration-300">
               Menu Collection
            </Link>
            <Link href="/#contact" className="font-serif text-5xl md:text-7xl cursor-pointer hover:text-[#D4AF37] hover:italic transition-all duration-300">
               Contact
            </Link>
        </div>
      </div>

      {/* --- HERO SECTION --- */}
      <header className="relative w-full h-[60vh] flex flex-col justify-end pb-24 px-6 md:px-24 border-b border-white/10">
        <div className="absolute inset-0 z-0">
            {/* Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/50 to-transparent z-10" />
            <Image 
                src="https://images.unsplash.com/photo-1509365465985-25d11c17e812?q=80&w=2532&auto=format&fit=crop"
                alt="Menu Background"
                fill
                className="object-cover opacity-50"
            />
        </div>
        
        <div className="relative z-20">
            <span className="menu-hero-text block font-mono text-[#D4AF37] text-xs tracking-[0.4em] mb-4">SEASONAL MENU</span>
            <h1 className="menu-hero-text font-serif text-7xl md:text-9xl leading-[0.85]">
                La Carte
            </h1>
        </div>
      </header>

      {/* --- STICKY CATEGORY NAVIGATION --- */}
      <div className="sticky top-0 z-30 w-full bg-[#050505]/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 overflow-x-auto no-scrollbar">
            <div className="flex gap-8 md:gap-12 min-w-max py-6">
                {CATEGORIES.map((cat) => (
                    <button 
                        key={cat.id}
                        onClick={() => scrollToCategory(cat.id)}
                        className={`flex items-center gap-3 text-sm font-mono uppercase tracking-widest transition-all duration-300 ${activeCategory === cat.id ? 'text-[#D4AF37]' : 'text-white/40 hover:text-white'}`}
                    >
                        {activeCategory === cat.id && (
                            <span className="text-[#D4AF37] animate-pulse">●</span>
                        )}
                        {cat.label}
                    </button>
                ))}
            </div>
        </div>
      </div>

      {/* --- MAIN MENU CONTENT --- */}
      <main className="max-w-7xl mx-auto px-6 md:px-24 py-24 space-y-32">
        {CATEGORIES.map((cat, index) => (
            <section key={cat.id} id={cat.id} className="relative">
                
                {/* Category Header */}
                <div className="flex flex-col md:flex-row items-baseline gap-6 mb-16 border-b border-white/10 pb-6">
                    <div className="p-3 border border-[#D4AF37] rounded-full text-[#D4AF37]">
                        {cat.icon}
                    </div>
                    <div>
                        <h2 className="font-serif text-5xl md:text-7xl">{cat.label}</h2>
                        <p className="font-mono text-[#D4AF37] text-xs tracking-[0.2em] mt-2 uppercase opacity-80">{cat.subtitle}</p>
                    </div>
                    <span className="ml-auto font-mono text-white/20 text-xs">0{index + 1} / 04</span>
                </div>

                {/* Items Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
                    {cat.items.map((item, idx) => (
                        <div key={idx} className={`item-${cat.id} group flex gap-6 items-start cursor-pointer`}>
                            {/* Image Thumbnail */}
                            <div className="relative w-24 h-24 md:w-32 md:h-32 shrink-0 overflow-hidden rounded-sm bg-white/5">
                                <Image 
                                    src={item.img} 
                                    alt={item.name}
                                    fill
                                    className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
                                />
                            </div>
                            
                            {/* Text Info */}
                            <div className="flex-1 pt-1">
                                <div className="flex justify-between items-baseline border-b border-white/10 pb-2 mb-2 group-hover:border-[#D4AF37]/50 transition-colors">
                                    <h3 className="font-serif text-2xl group-hover:text-[#D4AF37] transition-colors">{item.name}</h3>
                                    <span className="font-mono text-lg text-[#D4AF37]">€{item.price.toFixed(2)}</span>
                                </div>
                                <p className="text-white/50 text-sm font-light leading-relaxed mb-3">
                                    {item.desc}
                                </p>
                                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                                    <span className="text-[10px] uppercase tracking-widest text-[#D4AF37]">Order Now</span>
                                    <ArrowUpRight size={12} className="text-[#D4AF37]" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        ))}
      </main>

      {/* --- FOOTER CTA --- */}
      <section className="w-full py-24 bg-[#111] text-center">
        <h3 className="font-serif text-4xl mb-6">Have an allergy?</h3>
        <p className="text-white/50 mb-8">Please ask our staff for the allergen register.</p>
        <button className="px-8 py-3 border border-[#D4AF37] text-[#D4AF37] uppercase font-mono text-xs tracking-widest hover:bg-[#D4AF37] hover:text-black transition-all">
            Download PDF Menu
        </button>
      </section>

    </div>
  );
}