"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Menu as MenuIcon, X, Wind, ArrowUpRight } from "lucide-react";

// GSAP Imports
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import Navbar from "@/components/Navbar";

gsap.registerPlugin(ScrollTrigger);

// --- DATA: THE HAREN COLLECTION ---
const MENU_ITEMS = [
  {
    id: 1,
    name: "The Haren Hazelnut",
    desc: "Valrhona praline, Piedmont hazelnuts, gold leaf.",
    price: 9.5,
    cat: "Signature",
    // High-res chocolate dessert image
    img: "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?q=80&w=2670&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Tarte Citron Meringuée",
    desc: "Sicilian lemon curd, burnt Italian meringue.",
    price: 8.0,
    cat: "Patisserie",
    // Lemon tart image
    img: "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?q=80&w=2568&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Groninger Koek (Elevated)",
    desc: "Traditional spiced cake, ginger confit, pearl sugar.",
    price: 6.5,
    cat: "Local Heritage",
    // Spiced cake/loaf image (Your specific link preserved)
    img: "https://images.unsplash.com/photo-1645805740318-31bb7604ffd9?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 4,
    name: "Pain au Chocolat Bicolore",
    desc: "Double fermented dough, dark chocolate baton.",
    price: 4.5,
    cat: "Viennoiserie",
    // Croissant image
    img: "https://images.unsplash.com/photo-1530610476181-d83430b64dcd?q=80&w=2670&auto=format&fit=crop",
  },
];

export default function OrpheeHaren() {
  const container = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);
  const menuSectionRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // --- 1. SMOOTH SCROLL (LENIS) ---
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

  // --- 2. GSAP ORCHESTRATION ---
  useGSAP(
    () => {
      const tl = gsap.timeline();

      // A. Loader & Hero Reveal
      tl.to(".loader-curtain", {
        y: "-100%",
        duration: 1.2,
        ease: "power4.inOut",
        delay: 0.2,
      })
        .from(
          ".hero-title-line",
          {
            y: 150,
            rotate: 3,
            opacity: 0,
            stagger: 0.1,
            duration: 1.2,
            ease: "power3.out",
          },
          "-=0.8"
        )
        .from(
          ".hero-meta",
          {
            opacity: 0,
            y: 20,
            duration: 1,
          },
          "-=0.5"
        );

      // B. Horizontal Scroll Story Section
      const sections = gsap.utils.toArray(".h-item");
      gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: horizontalRef.current,
          pin: true,
          scrub: 1,
          end: "+=3000",
        },
      });

      // C. Menu Grid Reveal Animation
      gsap.from(".menu-card", {
        scrollTrigger: {
          trigger: menuSectionRef.current,
          start: "top 70%",
        },
        y: 100,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: "power3.out",
      });

      // D. Image Parallax Generic
      gsap.utils
        .toArray<HTMLElement>(".parallax-wrapper")
        .forEach((wrapper) => {
          const img = wrapper.querySelector("img");
          gsap.fromTo(
            img,
            { y: "-10%" }, // Adjusted to -10% to prevent black bars
            {
              y: "10%", // Adjusted to 10% to prevent black bars
              ease: "none",
              scrollTrigger: {
                trigger: wrapper,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            }
          );
        });
    },
    { scope: container }
  );

  return (
    <div
      ref={container}
      className="relative w-full min-h-screen bg-[#050505] text-[#EAE6D9] font-sans selection:bg-[#D4AF37] selection:text-black"
    >
      {/* --- PREMIUM LOADER --- */}
      <div className="loader-curtain fixed inset-0 bg-[#0F0F0F] z-[9999] flex items-center justify-center pointer-events-none">
        <div className="text-center">
          <h1 className="font-serif text-5xl md:text-7xl text-[#D4AF37] tracking-widest uppercase mb-4">
            Orphée
          </h1>
          <p className="font-mono text-[10px] text-white/50 uppercase tracking-[0.4em]">
            Haren • Netherlands
          </p>
        </div>
      </div>

      <Navbar />

      {/* --- FULLSCREEN MENU --- */}
      <div
        className={`fixed inset-0 bg-[#0F0F0F] z-40 transition-transform duration-700 ease-[bezier(0.76,0,0.24,1)] ${
          isMenuOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="h-full flex flex-col justify-center items-center gap-8">
          {["Home", "Story", "Menu Collection", "Contact"].map((item, i) => (
            <h2
              key={i}
              className="font-serif text-5xl md:text-7xl cursor-pointer hover:text-[#D4AF37] hover:italic transition-all duration-300"
            >
              {item}
            </h2>
          ))}
        </div>
      </div>

      {/* --- HERO SECTION --- */}
      <section className="relative w-full h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-60 parallax-wrapper">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover scale-125 pointer-events-none"
            style={{ filter: "brightness(0.6)" }} // Maintains the moody atmosphere
          >
            <source src="/menu.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative z-10 text-center mix-blend-normal">
          <div className="overflow-hidden mb-2">
            <p className="hero-title-line font-mono text-[#D4AF37] text-xs tracking-[0.4em] uppercase">
              Est. Haren
            </p>
          </div>
          <h1 className="font-serif text-6xl md:text-8xl leading-[0.9] tracking-tight mb-8">
            <div className="overflow-hidden">
              <span className="hero-title-line block">Dutch</span>
            </div>
            <div className="overflow-hidden">
              <span className="hero-title-line block italic text-[#D4AF37] pr-6">
                Precision,
              </span>
            </div>
            <div className="overflow-hidden">
              <span className="hero-title-line block">French Soul</span>
            </div>
          </h1>
          <div className="hero-meta mt-8 flex flex-col items-center">
            <p className="max-w-md text-white/70 text-sm font-light leading-relaxed mb-8">
              A culinary sanctuary in the heart of Groningen. Where artisan
              chocolate meets the finest local dairy.
            </p>
            <div className="w-[1px] h-24 bg-gradient-to-b from-[#D4AF37] to-transparent"></div>
          </div>
        </div>
      </section>

      {/* --- HORIZONTAL STORY --- */}
      <section
        ref={horizontalRef}
        className="relative w-full h-screen overflow-hidden bg-[#EAE6D9] text-black"
      >
        <div className="absolute top-12 left-12 z-10">
          
        </div>
        <div className="flex h-full w-[300vw]">
          {/* SLIDE 1 */}
          <div className="h-item w-screen h-full flex flex-col md:flex-row items-center justify-center p-12 md:p-24 gap-12">
            <div className="md:w-1/2">
              <h2 className="font-serif text-6xl md:text-8xl mb-6">
                Two Worlds
                <br />
                Colliding
              </h2>
              <p className="text-lg md:text-xl font-light leading-relaxed max-w-lg">
                It began with a shared obsession for perfection. One brought the
                rigorous discipline of Dutch design; the other, the chaotic
                beauty of French pastry arts.
              </p>
            </div>
            <div className="md:w-1/3 h-[60vh] relative overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
              <Image
                src="https://images.unsplash.com/photo-1601205741712-b261aff33a7d?q=80&w=2582&auto=format&fit=crop"
                alt="Baker hands"
                fill
                className="object-cover"
              />
            </div>
          </div>
          {/* SLIDE 2 */}
          <div className="h-item w-screen h-full flex flex-col md:flex-row-reverse items-center justify-center p-12 md:p-24 gap-12 bg-[#D4AF37] text-[#050505]">
            <div className="md:w-1/2">
              <Wind className="mb-6 w-12 h-12" />
              <h2 className="font-serif text-6xl md:text-8xl mb-6">
                Not Just
                <br />
                Butter.
              </h2>
              <p className="text-lg md:text-xl font-medium leading-relaxed max-w-lg">
                "We use Groningen's cream, famous for its richness, and pair it
                with single-origin Valrhona chocolate. It is the taste of the
                Netherlands, dressed in Paris fashion."
              </p>
            </div>
            <div className="md:w-1/3 h-[60vh] relative border-2 border-black p-4">
              <div className="relative w-full h-full overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1579372786545-d24232daf58c?q=80&w=2670&auto=format&fit=crop"
                  alt="Flour Dust"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
          {/* SLIDE 3 */}
          <div className="h-item w-screen h-full flex flex-col md:flex-row items-center justify-center p-12 md:p-24 gap-12 bg-[#050505] text-[#EAE6D9]">
            <div className="md:w-1/2 text-center md:text-left">
              <h2 className="font-serif text-6xl md:text-8xl mb-6">
                The Atelier
              </h2>
              <p className="text-white/60 mb-8">
                Located at Rijksstraatweg, Haren.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- NEW IMAGE MENU SECTION --- */}
      <section
        ref={menuSectionRef}
        className="relative w-full py-32 px-6 md:px-24 bg-[#0A0A0A]"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 pb-8 border-b border-white/10">
            <div>
              <span className="font-mono text-[#D4AF37] text-xs tracking-[0.2em]">
                PÂTISSERIE & CHOCOLATERIE
              </span>
              <h2 className="font-serif text-5xl md:text-7xl mt-2">
                The Collection
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-20">
            {MENU_ITEMS.map((item) => (
              <div key={item.id} className="menu-card group cursor-pointer">
                {/* Image Container with Hover Effect */}
                <div className="relative w-full h-[400px] mb-8 overflow-hidden rounded-sm bg-[#111]">
                  <Image
                    src={item.img}
                    alt={item.name}
                    fill
                    className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="font-mono text-[9px] text-[#D4AF37] bg-black/80 backdrop-blur-md px-3 py-1 uppercase tracking-widest">
                      {item.cat}
                    </span>
                  </div>
                </div>

                {/* Item Details */}
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-serif text-3xl mb-2 group-hover:text-[#D4AF37] transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-white/50 font-light text-sm max-w-sm">
                      {item.desc}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="block font-serif text-2xl group-hover:text-[#D4AF37] transition-colors">
                      €{item.price.toFixed(2)}
                    </span>
                    <ArrowUpRight
                      size={18}
                      className="ml-auto mt-2 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-[#D4AF37]"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="relative w-full py-20 px-6 md:px-12 bg-[#050505] border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-12">
          <div className="md:w-1/2">
            <h2 className="font-serif text-4xl mb-6">Orphée.</h2>
            <p className="text-white/50 text-sm leading-relaxed max-w-sm">
              We bake with the rhythm of the seasons. A piece of France in the
              sturdy north of the Netherlands.
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
                <li className="hover:text-[#D4AF37] cursor-pointer">
                  Instagram
                </li>
                <li className="hover:text-[#D4AF37] cursor-pointer">
                  info@orphee.nl
                </li>
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
