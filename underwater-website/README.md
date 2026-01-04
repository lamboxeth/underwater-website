# Underwater World - Animated Ocean Website

A beautiful, interactive underwater website with animated marine creatures and water effects.

## Features

- 🐢 **Animated Turtles** - Swimming with realistic flipper movements
- 🦈 **Sharks** - Gliding through the water with fin animations
- 🐚 **Scallops** - Floating and opening/closing animations
- 🐟 **Fish** - Multiple colorful fish swimming in various patterns
- 💧 **Water Effects** - Ripples, bubbles, and light rays
- 🌊 **Interactive** - Creatures respond to mouse movement with parallax effects
- 📱 **Responsive** - Works on desktop, tablet, and mobile devices

## Setup Instructions

1. **Add Your Background Video**
   - Place your underwater background video in the same directory as `index.html`
   - **Recommended formats:** MP4 (primary) and WebM (fallback for better browser support)
   - **Recommended names:** 
     - `underwater-background.mp4` (primary)
     - `underwater-background.webm` (optional fallback)
   - **Video Requirements:**
     - High resolution (1920x1080 or higher recommended)
     - MP4 format (H.264 codec for best compatibility)
     - WebM format (optional, for better compression)
     - Keep file size reasonable (10-50MB recommended for web)
   
   - **Optional:** Add a poster image `underwater-background.jpg` that shows while video loads
   
   - **To use different filenames:** Update the video source paths in `index.html` (lines 13-14)

2. **Open the Website**
   - **Important:** Use a local web server for video playback (videos may not autoplay when opening HTML directly)
   - **Using Python:**
     ```bash
     python -m http.server 8000
     ```
     Then open: `http://localhost:8000`
   
   - **Using Node.js (http-server):**
     ```bash
     npx http-server
     ```
   
   - **Using PHP:**
     ```bash
     php -S localhost:8000
     ```

## File Structure

```
underwater-website/
├── index.html              # Main HTML structure
├── styles.css              # All styling and CSS animations
├── script.js               # JavaScript for dynamic animations
├── underwater-background.mp4   # Your background video (REQUIRED)
├── underwater-background.webm  # Optional: WebM format for better compression
└── underwater-background.jpg  # Optional: Poster image shown while video loads
```

## Customization

### Adjust Animation Speed
Edit the animation durations in `styles.css`:
- Turtle: `turtleSwim` animation (default: 3s)
- Shark: `sharkSwim` animation (default: 2.5s)
- Fish: `fishSwim` animation (default: 2s)

### Change Creature Colors
Modify the background colors in `styles.css`:
- Turtles: `.turtle-shell` background
- Sharks: `.shark-head` background
- Fish: `.fish-body` background
- Scallops: `.scallop-top` background

### Add More Creatures
Simply duplicate the creature HTML elements in `index.html` and the JavaScript will automatically position them.

## Browser Compatibility

- Chrome/Edge (recommended)
- Firefox
- Safari
- Opera

## Video Background Features

- ✅ **Full Screen Coverage** - Video automatically adjusts to cover entire viewport
- ✅ **High Quality** - Optimized for crisp, clear video playback
- ✅ **Responsive** - Adapts to all screen sizes and aspect ratios
- ✅ **Auto-play** - Starts playing automatically (muted for browser compatibility)
- ✅ **Looping** - Seamlessly loops for continuous playback
- ✅ **Fallback Support** - Falls back to image if video fails to load
- ✅ **Mobile Optimized** - Uses `playsinline` for mobile devices

## Notes

- The website uses CSS animations and JavaScript for smooth performance
- All creatures are positioned dynamically on page load
- Bubbles are generated continuously for a realistic effect
- **Video must be served via HTTP/HTTPS** - Opening HTML file directly may prevent autoplay
- For best performance, use MP4 (H.264) format
- Video automatically adjusts size to perfectly fit the viewport

Enjoy your underwater world! 🌊

