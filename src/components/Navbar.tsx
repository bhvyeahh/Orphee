"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu as MenuIcon, X } from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* --- NAVBAR --- */}
      <nav className="fixed top-0 left-0 w-full z-50 px-8 py-8 flex justify-between items-center mix-blend-difference text-[#EAE6D9]">
        <Link href="/" className="font-serif text-xl font-bold tracking-tighter">
          ORPHÉE.NL
        </Link>
        
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="group flex items-center gap-3 cursor-pointer"
        >
          <span className="hidden md:block font-mono text-[9px] uppercase tracking-[0.2em] group-hover:text-[#D4AF37] transition-colors">
            {isMenuOpen ? "Close" : "Menu"}
          </span>
          <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-[#D4AF37] group-hover:border-[#D4AF37] group-hover:text-black transition-all duration-300">
            {isMenuOpen ? <X size={14} /> : <MenuIcon size={14} />}
          </div>
        </button>
      </nav>

      {/* --- FULLSCREEN MENU OVERLAY --- */}
      <div className={`fixed inset-0 bg-[#0F0F0F] z-40 transition-transform duration-700 ease-[bezier(0.76,0,0.24,1)] ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="h-full flex flex-col justify-center items-center gap-8">
            <Link 
              href="/" 
              onClick={() => setIsMenuOpen(false)}
              className="font-serif text-5xl md:text-7xl cursor-pointer hover:text-[#D4AF37] hover:italic transition-all duration-300"
            >
               Home
            </Link>
            <Link 
              href="/about" 
              onClick={() => setIsMenuOpen(false)}
              className="font-serif text-5xl md:text-7xl cursor-pointer hover:text-[#D4AF37] hover:italic transition-all duration-300"
            >
               Story
            </Link>
            <Link 
              href="/menu" 
              onClick={() => setIsMenuOpen(false)}
              className="font-serif text-5xl md:text-7xl cursor-pointer hover:text-[#D4AF37] hover:italic transition-all duration-300"
            >
               Menu Collection
            </Link>
            <Link 
              href="/contact" 
              onClick={() => setIsMenuOpen(false)}
              className="font-serif text-5xl md:text-7xl cursor-pointer hover:text-[#D4AF37] hover:italic transition-all duration-300"
            >
               Contact
            </Link>
        </div>
      </div>
    </>
  );
}