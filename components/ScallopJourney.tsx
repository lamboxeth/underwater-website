"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- DATA ---
const events = [
  {
    id: "vision",
    date: "2025 Vision",
    title: "Watching our success unfold",
    image: "/pepe-cinema.jpg",
    description: "The community watching Scallop take over the Sui ecosystem.",
  },
  {
    id: "mexc",
    date: "Nov 30, 2025",
    title: "MEXC Thanksgiving Gathering",
    image: "/thanksgiving.jpg",
    description: "Catching the Scallop Team at the MEXC Thanksgiving Gathering! Networking with fellow DeFi degens.",
  },
  {
    id: "xbtc",
    date: "Dec 18, 2025",
    title: "xBTC Pool Listing - LIVE!",
    image: "/xbtc.jpg",
    description: "Supporting the BTCFi wave on Sui. Scallopers can now supply, borrow, and deposit xBTC.",
  },
  {
    id: "upgrade",
    date: "Dec 22, 2025",
    title: "Scallop DApp Upgrade",
    image: "/upgrade.jpg",
    description: "New Features, Better Experiences. Introducing Flash Loans and a smoother UI for all users.",
  },
];

export default function ScallopJourney() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    // UPDATED: Using 'Poppins' font family
    <div ref={containerRef} className="relative w-full min-h-screen bg-[#051125] overflow-hidden pb-40" style={{ fontFamily: '"Poppins", sans-serif' }}>
      
      {/* UPDATED: Importing Poppins Font */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;900&display=swap');
      `}</style>

      {/* --- BACKGROUND --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Image
          src="/underwater-bg.jpg" 
          alt="Underwater"
          fill
          className="object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-[#051125]/80" />
      </div>

      <RisingBubbles />

      <div className="relative z-10 max-w-5xl mx-auto px-4 pt-32">
        
        {/* --- HEADER (UPDATED FONTS TO MATCH IMAGE) --- */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24 relative z-20"
        >
          {/* Top: Bold, White/Cyan mix like image */}
          <h2 className="text-white font-bold tracking-wide text-lg md:text-2xl mb-2 drop-shadow-md">
            Scallop Rewind 2025
          </h2>

          {/* Middle: SOLID WHITE, EXTRA BOLD (Poppins Black), Blue Glow */}
          <h1 className="text-5xl md:text-8xl font-black tracking-tight text-white drop-shadow-[0_0_35px_rgba(59,130,246,0.6)] uppercase">
            A YEAR OF SCALLOP
          </h1>
          
          {/* Bottom: SemiBold, slightly smaller than title */}
          <p className="text-white font-semibold text-sm md:text-xl tracking-wide mt-6 drop-shadow-md opacity-90">
            Dive into a year of Scallop Achievements and Milestones!
          </p>
        </motion.div>

        {/* --- THE TIMELINE --- */}
        <div className="relative">
          
          {/* Central Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] md:-translate-x-1/2 h-full z-0">
             <div className="w-full h-full bg-white/5" />
             <motion.div 
               style={{ scaleY: scrollYProgress, transformOrigin: "top" }}
               className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-cyan-400 via-blue-500 to-purple-600 shadow-[0_0_15px_cyan]"
             />
          </div>

          {/* Cards Loop */}
          <div className="flex flex-col gap-24 relative z-10">
            {events.map((event, index) => (
              <TimelineItem key={index} event={event} index={index} />
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}

// --- TIMELINE ITEM ---
function TimelineItem({ event, index }: { event: any; index: number }) {
  const isFirst = index === 0;
  const isEven = index % 2 === 0;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className={cn(
      "flex items-center w-full relative",
      isFirst 
        ? "justify-center md:mb-12" 
        : isEven ? "flex-col md:flex-row" : "flex-col md:flex-row-reverse"
    )}>
      
      <div className={cn(
        "w-full pl-12 md:pl-0 relative", 
        isFirst ? "md:w-[60%]" : "md:w-[45%]"
      )}>
        <motion.div
          initial={isFirst 
            ? { opacity: 0, y: 50, scale: 0.9 } 
            : { opacity: 0, x: isEven ? -50 : 50, y: 20 }
          }
          whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
          whileHover={{ y: -15, scale: 1.02 }} 
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          onTapStart={() => setIsHovered(true)}
          onTapCancel={() => setIsHovered(false)}
          transition={{ duration: 0.4, type: "spring", stiffness: 200 }}
          viewport={{ once: true, margin: "-100px" }}
          className="relative"
        >
          <CardBubbles active={isHovered} />

          <GlassCard isFeatured={isFirst}>
             <div className="flex justify-between items-start mb-4">
                <span className="text-cyan-400 text-xs font-bold tracking-widest uppercase border border-cyan-500/30 px-2 py-1 rounded bg-cyan-950/30">
                  {event.date}
                </span>
             </div>

             <div className="relative w-full h-64 rounded-lg overflow-hidden mb-5 border border-white/10 shadow-lg group bg-[#020c1b]">
                <Image 
                  src={event.image} 
                  alt={event.title} 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-110" 
                />
             </div>

             <h3 className={cn("font-bold text-white mb-2", isFirst ? "text-3xl" : "text-2xl")}>
               {event.title}
             </h3>
             <p className="text-sm text-blue-200/80 leading-relaxed font-medium">{event.description}</p>
          </GlassCard>
        </motion.div>
      </div>

      {/* CONNECTOR DOT */}
      <div className={cn(
        "absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#051125] border-2 border-cyan-400 z-20 shadow-[0_0_10px_cyan]",
        isFirst ? "top-[-20px] md:top-[-40px]" : ""
      )}>
         <div className="absolute inset-0 bg-cyan-400 rounded-full animate-ping opacity-20" />
      </div>

      {!isFirst && <div className="hidden md:block w-[45%]" />}

    </div>
  );
}

// --- CARD HOVER BUBBLES ---
function CardBubbles({ active }: { active: boolean }) {
  const bubbles = [10, 30, 60, 80]; 

  return (
    <div className="absolute -top-4 left-0 w-full h-12 pointer-events-none z-0 overflow-visible">
      <AnimatePresence>
        {active && bubbles.map((leftPos, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10, scale: 0 }}
            animate={{ 
              opacity: [0, 1, 0], 
              y: -40 - (Math.random() * 20), 
              x: (i % 2 === 0 ? 10 : -10), 
              scale: 1 
            }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity, 
              repeatDelay: Math.random() * 0.5, 
              delay: i * 0.1 
            }}
            className="absolute w-3 h-3 rounded-full bg-cyan-400/40 border border-cyan-200/20 shadow-[0_0_10px_cyan]"
            style={{ left: `${leftPos}%`, top: "100%" }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

// --- GLASS CARD ---
function GlassCard({ children, isFeatured }: { children: React.ReactNode, isFeatured?: boolean }) {
  return (
    <div className={cn(
      "relative p-6 rounded-2xl backdrop-blur-xl border transition-all duration-300 z-10", 
      "bg-[#0a192f]/60 border-white/10 shadow-2xl hover:border-cyan-400/30",
      isFeatured && "border-cyan-500/30 bg-[#0a192f]/80 shadow-[0_0_30px_rgba(34,211,238,0.15)]"
    )}>
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      {children}
    </div>
  );
}

// --- RISING BUBBLES ---
function RisingBubbles() {
  const [bubbles, setBubbles] = useState<any[]>([]);

  useEffect(() => {
    const newBubbles = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: Math.random() * 20 + 5,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 10,
    }));
    setBubbles(newBubbles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
      {bubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          className="absolute rounded-full border border-cyan-400/20 bg-cyan-400/5 backdrop-blur-[1px]"
          style={{
            left: `${bubble.left}%`,
            width: bubble.size,
            height: bubble.size,
            bottom: -50,
          }}
          animate={{
            y: -1200,
            x: [0, 30, -30, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            y: { duration: bubble.duration, repeat: Infinity, ease: "linear", delay: bubble.delay },
            x: { duration: 5, repeat: Infinity, ease: "easeInOut" },
            opacity: { duration: bubble.duration, repeat: Infinity, times: [0, 0.2, 0.9], delay: bubble.delay },
          }}
        />
      ))}
    </div>
  );
}