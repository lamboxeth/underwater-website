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
    id: "bucket",
    date: "Jan 2, 2025",
    title: "$BUT Token Airdrop",
    image: "/bucket.jpg", 
    description: "Kicking off 2025 with a bang! Partnered with Bucket Protocol to reward eligible veSCA holders with the $BUT airdrop.",
    link: "https://x.com/Scallop_io/status/1874845775651639705?s=20",
  },
  {
    id: "meme-swap",
    date: "Jan 6, 2025",
    title: "Meme Swap Campaign #3",
    image: "/meme-swap.jpg",
    description: "Kicking off the new year with a $20,000 USD prize pool! Featuring Blub, Hippo, Fud the Pug, and more.",
    link: "https://x.com/Scallop_io/status/1876569640811499927?s=20",
  },
  {
    id: "scallop-swap",
    date: "Jan 23, 2025",
    title: "Scallop Swap: 10 Months",
    image: "/scallop-swap.jpg",
    description: "Celebrating 10 months of Scallop Swap! Now supporting ALL top aggregators on Sui with over $308M+ in Total Volume.",
    link: "https://x.com/Scallop_io/status/1882367962801402303?s=20",
  },
  {
    id: "lunar-new-year",
    date: "Jan 28, 2025",
    title: "Happy Lunar New Year",
    image: "/lunar-new-year.jpg",
    description: "Wishing all Scallopers a prosperous and joyous Lunar New Year! May this year bring success and good health.",
    link: "https://x.com/Scallop_io/status/1884270569966952753?s=20",
  },
  {
    id: "suins",
    date: "Feb 20, 2025",
    title: "SuiNS Swap Campaign",
    image: "/suins-swap.jpg", 
    description: "Ride the SuiNS wave! Swap $SCA or $NS on Scallop to win from a $5,000 USD prize pool.",
    link: "https://x.com/Scallop_io/status/1892584286840295588?s=20",
  },
  {
    id: "loyalty-4m",
    date: "Feb 25, 2025",
    title: "$4M Revenue Loyalty Program",
    image: "/loyalty-4m.jpg", 
    description: "$100k worth of sSCA rewards distributed to eligible Scallopers holding >1,500 veSCA to celebrate $4M revenue.",
    link: "https://x.com/Scallop_io/status/1893693870233604577?s=20",
  },
  {
    id: "coinstore",
    date: "Mar 3, 2025",
    title: "Coinstore Listing",
    image: "/coinstore.jpg", 
    description: "SCA/USDT pair is now live on Coinstore! Celebrating with a $5,000 Prize Pool Deposit Campaign.",
    link: "https://x.com/Scallop_io/status/1896439788372451789?s=20",
  },
  {
    id: "ecosystem-swap",
    date: "Mar 8, 2025",
    title: "Ecosystem Swap Campaign",
    image: "/ecosystem-swap.jpg", 
    description: "Win up to $10,000 USD prize pool! Featuring @blubsui, @KriyaDEX, and @SuiNSdapp.",
    link: "https://x.com/Scallop_io/status/1898297010358481296?s=20",
  },
  {
    id: "mpoints",
    date: "Mar 17, 2025",
    title: "mPOINTS Live",
    image: "/mpoints.jpg",
    description: "mPOINTS are now live on the Scallop mUSD Pool! Borrow $mUSD to earn rewards and mPOINTS for MetaStables.",
    link: "https://x.com/Scallop_io/status/1901662433187610640?s=20",
  },
  {
    id: "binance-wallet",
    date: "Mar 26, 2025",
    title: "Binance Wallet Simple Yield",
    image: "/binance-wallet.jpg", 
    description: "Scallop is LIVE on Binance Wallet! Deposit USDC to win a share of $300,000 in rewards.",
    link: "https://x.com/Scallop_io/status/1904754717953319334?s=20",
  },
  {
    id: "milestone-200m",
    date: "Mar 31, 2025",
    title: "$200M Milestone Achieved",
    image: "/milestone-200m.jpg", 
    description: "Scallop has crossed $200M in Total Supply and Collateral Deposits!",
    link: "https://x.com/Scallop_io/status/1906715503579775244?s=20",
  },
  {
    id: "beeg-airdrop",
    date: "Apr 3, 2025",
    title: "$BEEG Airdrop",
    image: "/beeg-airdrop.jpg", 
    description: "Scallop Airdrop of 200M $BEEG tokens sent to the top 1,000 veSCA holders!",
    link: "https://x.com/Scallop_io/status/1907676202619543859?s=20",
  },
  {
    id: "slush",
    date: "Apr 26, 2025",
    title: "Slush Wallet Integration",
    image: "/slush-wallet.jpg",
    description: "Slush Wallet is now officially live on the Scallop DApp, offering zkLogin for seamless onboarding.",
    link: "https://x.com/Scallop_io/status/1916037679541850581?s=20",
  },
  {
    id: "loyalty-5m",
    date: "Apr 30, 2025",
    title: "$5M Revenue Loyalty Program",
    image: "/loyalty-5m.jpg", 
    description: "Crossed $5 Million in Total Revenue! Giving away $200,000 USD worth of sSCA.",
    link: "https://x.com/Scallop_io/status/1917540986462560477?s=20",
  },
  {
    id: "basecamp",
    date: "May 1, 2025",
    title: "Sui Basecamp 2025",
    image: "/sui-basecamp.jpg",
    description: "Official Silver Sponsor for Sui Basecamp in Dubai, joining the global community.",
    link: "https://x.com/Scallop_io/status/1894790667932704964?s=20",
  },
  {
    id: "nemo",
    date: "May 7, 2025",
    title: "Nemo Protocol DeFi Yields",
    image: "/nemo-yields.jpg",
    description: "Stake Scallop sCoins in Nemo Protocol’s pools for boosted APY and Nemo Points.",
    link: "https://x.com/Scallop_io/status/1919977283265429853?s=20",
  },
  {
    id: "giverep",
    date: "May 8, 2025",
    title: "GiveRep Loyalty Campaign",
    image: "/giverep.jpg",
    description: "Launched the Scallop x GiveRep Loyalty Campaign to reward content creators.",
    link: "https://x.com/Scallop_io/status/1920365026743103504?s=20",
  },
  {
    id: "palau-id",
    date: "May 8, 2025",
    title: "Scallop x RNS Palau ID",
    image: "/palau-id.jpg", 
    description: "Scallopers can now own the first on-chain legal ID for the Republic of Palau.",
    link: "https://x.com/Scallop_io/status/1920495405714051104?s=20",
  },
  {
    id: "haedal",
    date: "May 9, 2025",
    title: "$HAEDAL Listing",
    image: "/haedal-listing.jpg",
    description: "$HAEDAL is now listed! Borrow HAEDAL as an isolated asset with sHAEDAL incentives.",
    link: "https://x.com/Scallop_io/status/1920861855658172799?s=20",
  },
  {
    id: "binance-listing",
    date: "May 13, 2025",
    title: "New Listing: Binance Alpha",
    image: "/binance-listing.jpg", 
    description: "Scallop's $SCA is now listed on Binance Alpha!",
    link: "https://x.com/Scallop_io/status/1922316922970112394?s=20",
  },
  {
    id: "binance-trading",
    date: "May 16, 2025",
    title: "Binance Alpha Trading Comp",
    image: "/binance-trading.png", 
    description: "Trade $SCA on Binance Alpha to win from 1,248,000 $SCA prize pool.",
    link: "https://x.com/Scallop_io/status/1923385102375211220?s=20",
  },
  {
    id: "vesca-merge",
    date: "May 22, 2025",
    title: "veSCA Feature: Merge & Split",
    image: "/vesca-merge.jpg", 
    description: "Greater flexibility for users to merge or split their veSCA across multiple keys.",
    link: "https://x.com/Scallop_io/status/1920781856749879550?s=20",
  },
  {
    id: "momentum-lp",
    date: "Jun 1, 2025",
    title: "SCA Pools on Momentum",
    image: "/momentum-sca.jpg",
    description: "SCA Liquidity Pools are live on Momentum with active rewards and daily Bricks.",
    link: "https://x.com/scallop_io/status/1929111820692050137?s=46",
  },
  {
    id: "backpack",
    date: "Jun 17, 2025",
    title: "Scallop x Backpack Campaign",
    image: "/backpack-campaign.png", 
    description: "Partnered with Backpack Wallet! Share a $10,000 SCA prize pool.",
    link: "https://x.com/Scallop_io/status/1934899689197064634?s=20",
  },
  {
    id: "istanbul-blockchain",
    date: "Jun 26, 2025",
    title: "Istanbul Blockchain Week",
    image: "/istanbul-block-week.jpg",
    description: "CEO Kris Lai discussed 'Defai Trading - Future Onchain Agents' in Istanbul.",
    link: "https://x.com/Scallop_io/status/1937419589039849808?s=20",
  },
  {
    id: "security-update",
    date: "Jul 7, 2025",
    title: "Scallop Security Update",
    image: "/image_3a6d86.png",
    description: "MoveBit completed a security audit for VeSCA and SCoin components.",
    link: "https://x.com/Scallop_io/status/1942098209498939736?s=20",
  },
  {
    id: "anniversary",
    date: "Jul 16, 2025",
    title: "2nd Anniversary Giveaway",
    image: "/anniversary-box.png", 
    description: "Exclusive Anniversary Gift Boxes for supporters holding 100k+ veSCA.",
    link: "https://x.com/Scallop_io/status/1945378686179664198?s=20",
  },
  {
    id: "okx-dex",
    date: "Jul 23, 2025",
    title: "Integration: OKX DEX",
    image: "/okx-dex.png", 
    description: "OKX DEX integrated for seamless swaps on Scallop Aggregators.",
    link: "https://x.com/Scallop_io/status/1947926662458331241?s=20",
  },
  {
    id: "ika-integration",
    date: "Jul 29, 2025",
    title: "$IKA Integration",
    image: "/ika-integration.png", 
    description: "$IKA by Ika Network is now live on Scallop Swap and Mini Wallet.",
    link: "https://x.com/Scallop_io/status/1950154651313058006?s=20",
  },
  {
    id: "revenue-6m",
    date: "Jul 31, 2025",
    title: "$6M Revenue Milestone",
    image: "/revenue-6m.png", 
    description: "Crossed $6 Million in Total Revenue! $200k SCA giveaway.",
    link: "https://x.com/Scallop_io/status/1950872305502167211?s=20",
  },
  {
    id: "bitrue-listing",
    date: "Aug 5, 2025",
    title: "Bitrue Listing",
    image: "/bitrue-listing.png", 
    description: "SCA/USDT pair is now live on Bitrue global exchange.",
    link: "https://x.com/Scallop_io/status/1952579226848342354?s=20",
  },
  {
    id: "okx-gasless",
    date: "Aug 8, 2025",
    title: "OKX Sui EcoHub Gasless",
    image: "/okx-gasless.png", 
    description: "Zero gas fees for Borrow/Repay transactions using OKX Wallet.",
    link: "https://x.com/Scallop_io/status/1953734583427780857?s=20",
  },
  {
    id: "lifi",
    date: "Aug 14, 2025",
    title: "Integration: LI.FI Protocol",
    image: "/lifi-integration.png", 
    description: "Swap and Bridge across 30+ chains within a single transaction.",
    link: "https://x.com/Scallop_io/status/1955903484878008532?s=20",
  },
  {
    id: "bitkub-listing",
    date: "Aug 26, 2025",
    title: "Bitkub Listing",
    image: "/bitkub-listing.png", 
    description: "$SCA is now listed on Bitkub, the leading exchange in Thailand.",
    link: "https://x.com/Scallop_io/status/1960178890837749819?s=20",
  },
  {
    id: "usdb-integration",
    date: "Sep 17, 2025",
    title: "$USDB Integration",
    image: "/usdb-integration.png", 
    description: "Bucket Protocol's $USDB verified on Scallop Swap and Mini Wallet.",
    link: "https://x.com/Scallop_io/status/1968188910548492523?s=20",
  },
  {
    id: "kbw-2025",
    date: "Sep 21, 2025",
    title: "Korea Blockchain Week",
    image: "/kbw-2025.png", 
    description: "Scallop team connecting with global partners at KBW Seoul.",
    link: "https://x.com/Scallop_io/status/1969609745494593906?s=20",
  },
  {
    id: "swap-500m",
    date: "Oct 6, 2025",
    title: "$500M Swap Volume",
    image: "/swap-500m.png", 
    description: "Scallop has crossed $500 MILLION in Total Swap Volume!",
    link: "https://x.com/Scallop_io/status/1975087692003336217?s=20",
  },
  {
    id: "locked-50m",
    date: "Oct 14, 2025",
    title: "Milestone: 50M $SCA Locked",
    image: "/locked-50m.png", 
    description: "Over 40% of circulating supply is now locked in veSCA.",
    link: "https://x.com/Scallop_io/status/1977917271981834601?s=20",
  },
  {
    id: "weex-competition",
    date: "Oct 24, 2025",
    title: "WEEX Trading Competition",
    image: "/weex-competition.png", 
    description: "Share a 10,000 USDT prize pool on WEEX.",
    link: "https://x.com/Scallop_io/status/1981676155989377164?s=20",
  },
  {
    id: "kraken",
    date: "Oct 27, 2025",
    title: "New Listing: Kraken",
    image: "/kraken-listing.jpg", 
    description: "Major Milestone! $SCA listed on Kraken global exchange.",
    link: "https://x.com/Scallop_io/status/1982819617992028219?s=20",
  },
  {
    id: "mmt-integration",
    date: "Nov 4, 2025",
    title: "$MMT Integration",
    image: "/mmt-integration.png",
    description: "Momentum's $MMT token now verified on Scallop ecosystem.",
    link: "https://x.com/Scallop_io/status/1985745529570279444?s=20",
  },
  {
    id: "tbook-sbt",
    date: "Nov 5, 2025",
    title: "Scalloper SBT on TBook",
    image: "/tbook-sbt.png", 
    description: "The Scalloper Soulbound Token (SBT) is live on TBook!",
    link: "https://x.com/Scallop_io/status/1986041129196798188?s=20",
  },
  {
    id: "tato-integration",
    date: "Nov 15, 2025",
    title: "$TATO Integration",
    image: "/tato-integration.png", 
    description: "Pawtato Finance's $TATO integrated into Scallop Mini Wallet.",
    link: "https://x.com/Scallop_io/status/1989725601192882322?s=20",
  },
  {
    id: "suins-subdomain",
    date: "Nov 25, 2025",
    title: "SuiNS Subdomain Campaign",
    image: "/suins-subdomain.png", 
    description: "Mint your own .scalloper subdomain for veSCA holders.",
    link: "https://x.com/Scallop_io/status/1993265073067114624?s=20",
  },
  {
    id: "audit",
    date: "Dec 17, 2025",
    title: "Formal Verification Audit",
    image: "/audit-complete.png", 
    description: "Security First. Audit completed by Asymptotic.",
    link: "https://x.com/Scallop_io/status/2001302732028920305?s=20",
  },
  {
    id: "xbtc",
    date: "Dec 18, 2025",
    title: "xBTC Pool Listing - LIVE!",
    image: "/xbtc.jpg",
    description: "Supporting the BTCFi wave on Sui. Supply and borrow xBTC.",
    link: "https://x.com/scallop_io/status/2001631694823268468?s=46",
  },
  {
    id: "crypto-onchain",
    date: "Dec 20, 2025",
    title: "Crypto.com Onchain Wallet",
    image: "/crypto-onchain.png", 
    description: "Connect Crypto.com Onchain Wallet to Scallop DApp.",
    link: "https://x.com/Scallop_io/status/2002247551228232008?s=20",
  },
  {
    id: "upgrade",
    date: "Dec 22, 2025",
    title: "Scallop DApp Upgrade",
    image: "/dapp-upgrade.png", 
    description: "Introducing Flash Loans, Burn Expired SuiNS, Account Overview Feature, Risk Level Simulator, Toggle Market Status Option and a smoother UI for all users.",
    link: "https://x.com/scallop_io/status/2003009806643392718?s=46",
  },
];

export default function ScallopJourney() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={containerRef} className="relative w-full min-h-screen bg-[#051125] overflow-hidden pb-10" style={{ fontFamily: '"Poppins", sans-serif' }}>
      
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
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
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
        <div className="relative mb-32">
          
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

        {/* --- NEW YEAR GREETING SECTION --- */}
        <GreetingSection />

        {/* --- FOOTER SECTION --- */}
        <div className="relative z-20 flex flex-col items-center mt-32">
          
          {/* BRAND LOGO (Floating) */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="mb-8"
          >
            <div className="relative w-40 h-40 md:w-60 md:h-60">
              <Image 
                src="/logo.png" 
                alt="Scallop Logo" 
                fill 
                className="object-contain drop-shadow-[0_0_25px_rgba(34,211,238,0.4)]" 
              />
            </div>
          </motion.div>

          {/* SOCIAL LINKS */}
          <SocialFooter />

        </div>

      </div>
    </div>
  );
}

// --- NEW YEAR GREETING COMPONENT ---
function GreetingSection() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="relative z-20 max-w-4xl mx-auto text-center mt-32 px-6"
    >
      <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-[#0a192f]/60 backdrop-blur-xl p-8 md:p-12 group">
        
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
           <Image 
             src="/image_996b62.jpg" 
             alt="Happy New Year 2026" 
             fill 
             className="object-cover opacity-30 group-hover:opacity-40 transition-opacity duration-700"
           />
           <div className="absolute inset-0 bg-gradient-to-t from-[#0a192f] via-[#0a192f]/80 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-8 drop-shadow-[0_0_25px_rgba(34,211,238,0.5)] tracking-tight">
            Happy New Year Scallopers! 🎆
          </h2>
          
          <div className="space-y-6 text-blue-100/90 text-lg md:text-xl font-medium leading-relaxed max-w-2xl mx-auto">
            <p>
              As we step into a brand new year, the Scallop Team wants to thank every Scalloper for your support, energy, and trust along the way.
            </p>
            <p>
              May 2026 be filled with growth, good health, new wins, and exciting opportunities ahead!
            </p>
            <p className="text-cyan-400 font-bold pt-4 text-xl md:text-2xl drop-shadow-md">
              Here’s to building and achieving more together in the year ahead! 🥂
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
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
              
              {/* ✅ THIS IS THE PART I CHANGED FOR YOU ✅ */}
              {/* Custom Brand Logo in top right corner */}
              <div className="absolute top-6 right-6 opacity-80 group-hover:scale-110 transition-transform duration-300">
                <div className="w-8 h-8 relative">
                  <Image 
                    src="/scallop-mark.png" 
                    alt="Open Link" 
                    fill 
                    className="object-contain" 
                  />
                </div>
              </div>
              {/* -------------------------------------- */}

              <div className="flex justify-between items-start mb-4">
                  <span className="text-cyan-400 text-xs font-bold tracking-widest uppercase border border-cyan-500/30 px-2 py-1 rounded bg-cyan-950/30">
                    {event.date}
                  </span>
              </div>

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

// --- SOCIAL FOOTER ---
function SocialFooter() {
  const socials = [
    { 
      name: "X (Twitter)", 
      url: "https://x.com/Scallop_io", 
      icon: <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" /> 
    },
    { 
      name: "Telegram", 
      url: "https://t.me/scallop_io", 
      icon: <path d="M20.665 3.717l-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42l10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701l-.332 4.981c.488 0 .704-.223.977-.485l2.35-2.285l4.888 3.61c.9.497 1.547.241 1.772-.83l3.202-15.077c.328-1.315-.499-1.91-1.357-1.52z" /> 
    },
    { 
      name: "Website", 
      url: "https://scallop.io", 
      icon: <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM13 7h-2v10h2V7zm-4 3H7v4h2v-4zm8 0h-2v4h2v-4z" /> 
    },
    {
      name: "Discord",
      url: "https://discord.gg/WqJWGejxgH",
      icon: <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.419 0 1.334-.956 2.419-2.157 2.419zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.419 0 1.334-.946 2.419-2.157 2.419z"/>
    }
  ];

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-2xl mx-auto">
      
      {/* Social Bubbles */}
      <div className="flex items-center gap-6">
        {socials.map((social) => (
          <motion.a 
            key={social.name} 
            href={social.url} 
            target="_blank" 
            rel="noopener noreferrer"
            whileHover={{ y: -5, scale: 1.1 }}
            className="group relative p-4 rounded-full bg-white/5 border border-white/10 hover:border-cyan-400/50 hover:bg-cyan-500/10 transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0.2)] hover:shadow-[0_0_20px_rgba(34,211,238,0.3)]"
          >
            <div className="w-6 h-6 fill-white/80 group-hover:fill-cyan-400 transition-colors">
              <svg viewBox="0 0 24 24" className="w-full h-full">{social.icon}</svg>
            </div>
          </motion.a>
        ))}
      </div>

      {/* Return to Top Button */}
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
        className="group flex flex-col items-center gap-3 opacity-60 hover:opacity-100 transition-opacity mt-4"
      >
        <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:border-cyan-400/50 group-hover:bg-cyan-500/10 transition-all">
          <span className="text-white group-hover:text-cyan-400 text-lg">↑</span>
        </div>
        <span className="text-[10px] uppercase tracking-[0.2em] text-white/70 group-hover:text-cyan-400 transition-colors">Return to Surface</span>
      </button>

      {/* Copyright */}
      <div className="text-white/20 text-xs font-light">
        © 2025 Scallop. All rights reserved.
      </div>
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
            animate={{ opacity: [0, 1, 0], y: -40 - (Math.random() * 20), scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
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
      "relative p-6 rounded-2xl backdrop-blur-xl border transition-all duration-300 z-10 group bg-[#0a192f]/60 border-white/10 shadow-2xl hover:border-cyan-400/30",
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
    setBubbles(Array.from({ length: 40 }).map((_, i) => ({ id: i, left: Math.random() * 100, size: Math.random() * 15 + 5, duration: Math.random() * 10 + 10, delay: Math.random() * 10 })));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
      {bubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          className="absolute rounded-full border border-cyan-400/20 bg-cyan-400/5 backdrop-blur-[1px]"
          style={{ left: `${bubble.left}%`, width: bubble.size, height: bubble.size, bottom: -50 }}
          animate={{ y: -1200, opacity: [0, 1, 0] }}
          transition={{ y: { duration: bubble.duration, repeat: Infinity, ease: "linear", delay: bubble.delay }, opacity: { duration: bubble.duration, repeat: Infinity, times: [0, 0.2, 0.9], delay: bubble.delay } }}
        />
      ))}
    </div>
  );
}