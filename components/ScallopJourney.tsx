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
  // --- JANUARY ---
  {
    id: "vision",
    date: "Jan 1, 2025",
    title: "Watching our success unfold",
    image: "/pepe-cinema.jpg",
    description: "The community watching Scallop take over the Sui ecosystem.",
    link: "https://x.com/Scallop_io", 
  },
  {
    id: "bucket",
    date: "Jan 2, 2025",
    title: "$BUT Token Airdrop",
    image: "/bucket.jpg", 
    description: "Kicking off 2025 with a bang! Partnered with Bucket Protocol to reward eligible veSCA holders with the $BUT airdrop.",
    link: "https://x.com/Scallop_io",
  },
  {
    id: "meme-swap",
    date: "Jan 6, 2025",
    title: "Meme Swap Campaign #3",
    image: "/meme-swap.jpg",
    description: "Kicking off the new year with a $20,000 USD prize pool! Featuring Blub, Hippo, Fud the Pug, and more.",
    link: "https://x.com/Scallop_io",
  },
 
  {
    id: "scallop-swap",
    date: "Jan 23, 2025",
    title: "Scallop Swap: 10 Months",
    image: "/scallop-swap.jpg",
    description: "Celebrating 10 months of Scallop Swap! Now supporting ALL top aggregators on Sui with over $308M+ in Total Volume.",
    link: "https://x.com/Scallop_io",
  },

  // --- FEBRUARY ---
  {
    id: "suins",
    date: "Feb 20, 2025",
    title: "SuiNS Swap Campaign",
    image: "/suins-swap.jpg", 
    description: "Ride the SuiNS wave! Swap $SCA or $NS on Scallop to win from a $5,000 USD prize pool.",
    link: "https://x.com/Scallop_io",
  },
  {
    id: "loyalty-4m",
    date: "Feb 25, 2025",
    title: "$4M Revenue Loyalty Program",
    image: "/loyalty-4m.jpg", 
    description: "Daily sSCA rewards distributed to eligible Scallopers holding >1,500 veSCA to celebrate $4M revenue.",
    link: "https://x.com/Scallop_io",
  },

  // --- MARCH ---
  {
    id: "coinstore",
    date: "Mar 3, 2025",
    title: "Coinstore Listing",
    image: "/coinstore.jpg", 
    description: "SCA/USDT pair is now live on Coinstore! Celebrating with a $5,000 Prize Pool Deposit Campaign.",
    link: "https://x.com/Scallop_io",
  },
  {
    id: "ecosystem-swap",
    date: "Mar 8, 2025",
    title: "Ecosystem Swap Campaign",
    image: "/ecosystem-swap.jpg", 
    description: "Win up to $10,000 USD prize pool! Featuring @blubsui, @KriyaDEX, and @SuiNSdapp.",
    link: "https://x.com/Scallop_io",
  },
  {
    id: "binance-wallet",
    date: "Mar 26, 2025",
    title: "Binance Wallet Simple Yield",
    image: "/binance-wallet.jpg", 
    description: "Scallop is LIVE on Binance Wallet! Deposit USDC to win a share of $300,000 in rewards.",
    link: "https://x.com/Scallop_io",
  },
  {
    id: "milestone-200m",
    date: "Mar 31, 2025",
    title: "$200M Milestone Achieved",
    image: "/milestone-200m.jpg", 
    description: "Scallop has crossed $200M in Total Supply and Collateral Deposits! A testament to our leading position on Sui.",
    link: "https://x.com/Scallop_io",
  },

  // --- APRIL ---
  {
    id: "beeg-airdrop",
    date: "Apr 3, 2025",
    title: "$BEEG Airdrop",
    image: "/beeg-airdrop.jpg", 
    description: "Scallop Airdrop of 200M $BEEG tokens (2% supply) has been sent to the top 1,000 veSCA holders!",
    link: "https://x.com/Scallop_io",
  },
  {
    id: "loyalty-5m",
    date: "Apr 30, 2025",
    title: "$5M Revenue Loyalty Program",
    image: "/loyalty-5m.jpg", 
    description: "Crossed $5 Million in Total Revenue! Giving away $200,000 USD worth of sSCA to loyal Scallopers.",
    link: "https://x.com/Scallop_io",
  },

  // --- MAY ---
  {
    id: "palau-id",
    date: "May 8, 2025",
    title: "Scallop x RNS Palau ID",
    image: "/palau-id.jpg", 
    description: "Scallopers can now own the first on-chain legal ID for the Republic of Palau through RNS.ID collaboration.",
    link: "https://x.com/Scallop_io",
  },
  {
    id: "binance-listing",
    date: "May 13, 2025",
    title: "New Listing: Binance Alpha",
    image: "/binance-listing.jpg", 
    description: "Scallop's $SCA is now listed on Binance Alpha! The pre-listing token selection pool for promising crypto projects.",
    link: "https://x.com/Scallop_io",
  },
  {
    id: "binance-trading",
    date: "May 16, 2025",
    title: "Binance Alpha Trading Comp",
    image: "/binance-trading.png", 
    description: "Trade $SCA on Binance Alpha to win from a pool of 1,248,000 $SCA and 60,000 $SUI.",
    link: "https://x.com/Scallop_io",
  },
  {
    id: "vesca-merge",
    date: "May 22, 2025",
    title: "veSCA Feature: Merge & Split",
    image: "/vesca-merge.jpg", 
    description: "Greater flexibility! Users can now merge multiple veSCA keys or split their veSCA across multiple keys.",
    link: "https://x.com/Scallop_io",
  },

  // --- JUNE ---
  {
    id: "backpack",
    date: "Jun 17, 2025",
    title: "Scallop x Backpack Campaign",
    image: "/backpack-campaign.png", 
    description: "Partnered with Backpack Wallet! Borrow $50 USD worth of assets to share a $10,000 SCA prize pool.",
    link: "https://x.com/Scallop_io",
  },

  // --- JULY ---
  {
    id: "security-update",
    date: "Jul 7, 2025",
    title: "Scallop Security Update",
    image: "/image_3a6d86.png",
    description: "MoveBit has successfully completed a security audit for key components of the Scallop ecosystem, including VeSCA and SCoin.",
    link: "https://x.com/Scallop_io",
  },
  {
    id: "anniversary",
    date: "Jul 16, 2025",
    title: "2nd Anniversary Giveaway",
    image: "/anniversary-box.png", 
    description: "Celebrating 2 years! Exclusive Anniversary Gift Boxes for loyal supporters holding at least 100,000 veSCA.",
    link: "https://x.com/Scallop_io",
  },
  {
    id: "okx-dex",
    date: "Jul 23, 2025",
    title: "Integration: OKX DEX",
    image: "/okx-dex.png", 
    description: "OKX DEX is now integrated on Scallop's Swap Aggregators, enabling seamless swaps for favorite assets on Sui.",
    link: "https://x.com/Scallop_io",
  },
  {
    id: "revenue-6m",
    date: "Jul 31, 2025",
    title: "$6M Revenue Milestone",
    image: "/revenue-6m.png", 
    description: "Crossed $6 Million in Total Revenue! Celebrating by giving away $200,000 USD worth of $SCA to loyal users.",
    link: "https://x.com/Scallop_io",
  },

  // --- AUGUST ---
  {
    id: "okx-gasless",
    date: "Aug 8, 2025",
    title: "OKX Sui EcoHub Gasless",
    image: "/okx-gasless.png", 
    description: "Live on OKX Sui EcoHub! Limited time zero gas fees for Borrow and Repay transactions using OKX Wallet.",
    link: "https://x.com/Scallop_io",
  },
  {
    id: "lifi",
    date: "Aug 14, 2025",
    title: "Integration: LI.FI Protocol",
    image: "/lifi-integration.png", 
    description: "LI.FI is now live on Scallop Bridge! Swap and Bridge assets across 30+ chains within a single transaction.",
    link: "https://x.com/Scallop_io",
  },

  // --- OCTOBER ---
  {
    id: "swap-500m",
    date: "Oct 6, 2025",
    title: "$500M Swap Volume",
    image: "/swap-500m.png", 
    description: "Scallop has crossed $500 MILLION in Total Swap Volume! Providing seamless and secure swaps for the community.",
    link: "https://x.com/Scallop_io",
  },
  {
    id: "locked-50m",
    date: "Oct 14, 2025",
    title: "Milestone: 50M $SCA Locked",
    image: "/locked-50m.png", 
    description: "Over 40% of SCA's circulating supply (50 Million+) is now locked, reflecting the community's long-term trust.",
    link: "https://x.com/Scallop_io",
  },
  {
    id: "kraken",
    date: "Oct 27, 2025",
    title: "New Listing: Kraken",
    image: "/kraken-listing.jpg", 
    description: "Major Milestone! $SCA is now listed on Kraken, one of the world's longest-standing crypto exchanges.",
    link: "https://x.com/Scallop_io",
  },

  // --- NOVEMBER ---
  {
    id: "suins-subdomain",
    date: "Nov 25, 2025",
    title: "SuiNS Subdomain Campaign",
    image: "/suins-subdomain.png", 
    description: "Exclusive for Scallopers! Holders with >2,000 veSCA can now mint their own .scalloper subdomain.",
    link: "https://x.com/Scallop_io",
  },

  // --- DECEMBER ---
  {
    id: "audit",
    date: "Dec 17, 2025",
    title: "Formal Verification Audit",
    image: "/audit-complete.png", 
    description: "Security First. Scallop Lending has completed a formal verification-based audit conducted by Asymptotic.",
    link: "https://x.com/Scallop_io",
  },
  {
    id: "xbtc",
    date: "Dec 18, 2025",
    title: "xBTC Pool Listing - LIVE!",
    image: "/xbtc.jpg",
    description: "Supporting the BTCFi wave on Sui. Scallopers can now supply, borrow, and deposit xBTC.",
    link: "https://x.com/Scallop_io",
  },
  {
    id: "upgrade",
    date: "Dec 22, 2025",
    title: "Scallop DApp Upgrade",
    image: "/dapp-upgrade.png", 
    description: "New Features, Better Experiences. Introducing Flash Loans and a smoother UI for all users.",
    link: "https://x.com/Scallop_io",
  },
];

export default function ScallopJourney() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={containerRef} className="relative w-full min-h-screen bg-[#051125] overflow-hidden pb-40" style={{ fontFamily: '"Poppins", sans-serif' }}>
      
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
        
        {/* --- HEADER --- */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24 relative z-20"
        >
          <h2 className="text-white font-bold tracking-wide text-lg md:text-2xl mb-2 drop-shadow-md">
            Scallop Rewind 2025
          </h2>
          <h1 className="text-5xl md:text-8xl font-black tracking-tight text-white drop-shadow-[0_0_35px_rgba(59,130,246,0.6)] uppercase">
            A YEAR OF SCALLOP
          </h1>
          <p className="text-white font-semibold text-sm md:text-xl tracking-wide mt-6 drop-shadow-md opacity-90">
            Dive into a year of Scallop Achievements and Milestones!
          </p>
        </motion.div>

        {/* --- THE TIMELINE --- */}
        <div className="relative">
          
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] md:-translate-x-1/2 h-full z-0">
             <div className="w-full h-full bg-white/5" />
             <motion.div 
               style={{ scaleY: scrollYProgress, transformOrigin: "top" }}
               className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-cyan-400 via-blue-500 to-purple-600 shadow-[0_0_15px_cyan]"
             />
          </div>

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
          className="relative block" 
        >
          <a href={event.link} target="_blank" rel="noopener noreferrer" className="block w-full h-full">
            
            <CardBubbles active={isHovered} />

            <GlassCard isFeatured={isFirst}>
              {/* External Link Icon */}
              <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-50 transition-opacity">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              </div>

              <div className="flex justify-between items-start mb-4">
                  <span className="text-cyan-400 text-xs font-bold tracking-widest uppercase border border-cyan-500/30 px-2 py-1 rounded bg-cyan-950/30">
                    {event.date}
                  </span>
              </div>

              {/* UPDATED: aspect-video forces 16:9 ratio */}
              <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-5 border border-white/10 shadow-lg bg-[#020c1b]">
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
            
          </a>
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
      "relative p-6 rounded-2xl backdrop-blur-xl border transition-all duration-300 z-10 group", 
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