'use client'

/**
 * GlassmorphismUI Component
 * Premium glass-like UI overlay with ocean-inspired design
 */
export default function GlassmorphismUI() {
  return (
    <div className="fixed inset-0 z-10 pointer-events-none">
      {/* Top navigation bar */}
      <nav className="absolute top-0 left-0 right-0 p-4 md:p-6 pointer-events-auto">
        <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-4">
          <div className="px-4 py-2 md:px-6 md:py-3 rounded-xl md:rounded-2xl backdrop-blur-md bg-white/5 border border-white/10 shadow-lg">
            <h1 className="text-base md:text-xl font-light text-white/90 tracking-wide">
              Underwater Experience
            </h1>
          </div>
          <div className="flex gap-2 md:gap-4">
            <button className="px-4 py-2 md:px-6 md:py-3 rounded-xl md:rounded-2xl backdrop-blur-md bg-white/5 border border-white/10 text-white/90 hover:bg-white/10 transition-all duration-300 shadow-lg text-sm md:text-base">
              Explore
            </button>
            <button className="px-4 py-2 md:px-6 md:py-3 rounded-xl md:rounded-2xl backdrop-blur-md bg-white/5 border border-white/10 text-white/90 hover:bg-white/10 transition-all duration-300 shadow-lg text-sm md:text-base">
              About
            </button>
          </div>
        </div>
      </nav>

      {/* Center content card */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto w-full px-4 md:px-0">
        <div className="px-6 py-10 md:px-12 md:py-16 rounded-2xl md:rounded-3xl backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-light text-white/95 mb-3 md:mb-4 tracking-wide">
            Dive Into the Depths
          </h2>
          <p className="text-base md:text-lg text-white/70 mb-6 md:mb-8 leading-relaxed">
            Experience an immersive underwater world where marine life responds to your presence.
            Hover and click on the creatures to see them come alive with gentle buoyancy motion.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
            <button className="px-6 py-3 md:px-8 md:py-4 rounded-xl md:rounded-2xl backdrop-blur-md bg-white/10 border border-white/20 text-white/95 hover:bg-white/15 transition-all duration-300 shadow-lg font-medium text-sm md:text-base">
              Begin Journey
            </button>
            <button className="px-6 py-3 md:px-8 md:py-4 rounded-xl md:rounded-2xl backdrop-blur-md bg-transparent border border-white/20 text-white/90 hover:bg-white/5 transition-all duration-300 text-sm md:text-base">
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Bottom info bar */}
      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 pointer-events-auto">
        <div className="max-w-7xl mx-auto">
          <div className="px-4 py-3 md:px-6 md:py-4 rounded-xl md:rounded-2xl backdrop-blur-md bg-white/5 border border-white/10 shadow-lg inline-block">
            <p className="text-xs md:text-sm text-white/60 text-center md:text-left">
              <span className="hidden md:inline">Move your cursor to feel the water's influence • </span>
              <span>Click creatures to interact</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

