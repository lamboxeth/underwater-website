// Initialize and optimize video background
function initializeVideoBackground() {
    const video = document.getElementById('backgroundVideo');
    
    if (video) {
        // Ensure video plays with high quality
        video.setAttribute('playsinline', '');
        video.setAttribute('webkit-playsinline', '');
        
        // Set video quality preferences
        if (video.canPlayType && video.canPlayType('video/mp4')) {
            // Prefer high quality
            video.load();
        }
        
        // Handle video loading
        video.addEventListener('loadedmetadata', function() {
            // Ensure video covers full screen
            adjustVideoSize();
        });
        
        video.addEventListener('loadeddata', function() {
            video.play().catch(function(error) {
                console.log('Video autoplay prevented:', error);
                // Try playing again on user interaction
                document.addEventListener('click', function playVideo() {
                    video.play();
                    document.removeEventListener('click', playVideo);
                }, { once: true });
            });
        });
        
        // Adjust video size on window resize
        window.addEventListener('resize', adjustVideoSize);
        
        // Ensure video loops smoothly
        video.addEventListener('ended', function() {
            video.currentTime = 0;
            video.play();
        });
    }
}

// Adjust video size to cover entire viewport
function adjustVideoSize() {
    const video = document.getElementById('backgroundVideo');
    if (!video) return;
    
    const container = video.parentElement;
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;
    const videoAspectRatio = video.videoWidth / video.videoHeight;
    const containerAspectRatio = containerWidth / containerHeight;
    
    if (containerAspectRatio > videoAspectRatio) {
        // Container is wider - fit to height
        video.style.width = 'auto';
        video.style.height = '100%';
    } else {
        // Container is taller - fit to width
        video.style.width = '100%';
        video.style.height = 'auto';
    }
}

// Dynamic creature positioning and movement
document.addEventListener('DOMContentLoaded', function() {
    // Initialize video background
    initializeVideoBackground();
    
    const creatures = document.querySelectorAll('.creature');
    const bubblesContainer = document.querySelector('.bubbles-container');
    
    // Initialize creature positions with random starting points
    creatures.forEach((creature, index) => {
        const randomX = Math.random() * (window.innerWidth - 200) + 100;
        const randomY = Math.random() * (window.innerHeight - 200) + 100;
        const randomDelay = Math.random() * 2;
        
        creature.style.left = randomX + 'px';
        creature.style.top = randomY + 'px';
        creature.style.animationDelay = randomDelay + 's';
        
        // Add unique movement patterns
        animateCreature(creature, index);
    });
    
    // Create bubbles dynamically
    createBubbles();
    setInterval(createBubbles, 3000);
    
    // Parallax effect on mouse move
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 20;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 20;
        
        creatures.forEach((creature, index) => {
            const speed = (index % 3 + 1) * 0.5;
            const x = mouseX * speed;
            const y = mouseY * speed;
            creature.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
    
    // Water current effect
    setInterval(() => {
        creatures.forEach(creature => {
            const currentX = parseFloat(creature.style.left) || 0;
            const currentY = parseFloat(creature.style.top) || 0;
            
            const driftX = (Math.random() - 0.5) * 2;
            const driftY = (Math.random() - 0.5) * 2;
            
            let newX = currentX + driftX;
            let newY = currentY + driftY;
            
            // Keep creatures within bounds
            newX = Math.max(50, Math.min(window.innerWidth - 150, newX));
            newY = Math.max(50, Math.min(window.innerHeight - 150, newY));
            
            creature.style.left = newX + 'px';
            creature.style.top = newY + 'px';
        });
    }, 5000);
});

// Animate individual creatures with unique paths
function animateCreature(creature, index) {
    const type = creature.classList[1]; // turtle, shark, scallop, or fish
    const duration = 15 + Math.random() * 10; // 15-25 seconds
    const delay = index * 0.5;
    
    // Create keyframes for smooth swimming paths
    const keyframes = generateSwimmingPath(type, index);
    
    // Apply animation
    creature.style.animation = `swimPath ${duration}s ease-in-out infinite`;
    creature.style.animationDelay = delay + 's';
    
    // Add CSS keyframes dynamically
    if (!document.getElementById('dynamic-keyframes')) {
        const style = document.createElement('style');
        style.id = 'dynamic-keyframes';
        document.head.appendChild(style);
    }
    
    const styleSheet = document.getElementById('dynamic-keyframes').sheet;
    const rule = `@keyframes swimPath {
        0% { transform: translate(${keyframes[0].x}px, ${keyframes[0].y}px) rotate(${keyframes[0].rotate}deg); }
        25% { transform: translate(${keyframes[1].x}px, ${keyframes[1].y}px) rotate(${keyframes[1].rotate}deg); }
        50% { transform: translate(${keyframes[2].x}px, ${keyframes[2].y}px) rotate(${keyframes[2].rotate}deg); }
        75% { transform: translate(${keyframes[3].x}px, ${keyframes[3].y}px) rotate(${keyframes[3].rotate}deg); }
        100% { transform: translate(${keyframes[0].x}px, ${keyframes[0].y}px) rotate(${keyframes[0].rotate}deg); }
    }`;
    
    try {
        styleSheet.insertRule(rule, styleSheet.cssRules.length);
    } catch (e) {
        // Fallback if rule already exists
    }
}

// Generate swimming path based on creature type
function generateSwimmingPath(type, index) {
    const paths = {
        turtle: [
            { x: 0, y: 0, rotate: 0 },
            { x: 200, y: -50, rotate: 15 },
            { x: 400, y: 30, rotate: -10 },
            { x: 200, y: 80, rotate: 5 }
        ],
        shark: [
            { x: 0, y: 0, rotate: 0 },
            { x: -300, y: -80, rotate: -20 },
            { x: -600, y: 20, rotate: 10 },
            { x: -300, y: 100, rotate: -5 }
        ],
        scallop: [
            { x: 0, y: 0, rotate: 0 },
            { x: 150, y: -30, rotate: 5 },
            { x: 300, y: 20, rotate: -5 },
            { x: 150, y: 50, rotate: 0 }
        ],
        fish: [
            { x: 0, y: 0, rotate: 0 },
            { x: 250, y: -40, rotate: 12 },
            { x: 500, y: 10, rotate: -8 },
            { x: 250, y: 60, rotate: 4 }
        ]
    };
    
    const basePath = paths[type] || paths.fish;
    
    // Add variation based on index
    return basePath.map(point => ({
        x: point.x + (index % 3 - 1) * 50,
        y: point.y + (index % 2) * 30,
        rotate: point.rotate + (index % 5 - 2) * 5
    }));
}

// Create bubbles
function createBubbles() {
    const bubbleCount = 15;
    
    for (let i = 0; i < bubbleCount; i++) {
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        
        const size = Math.random() * 30 + 10; // 10-40px
        const startX = Math.random() * window.innerWidth;
        const duration = Math.random() * 5 + 5; // 5-10 seconds
        const drift = (Math.random() - 0.5) * 100;
        
        bubble.style.width = size + 'px';
        bubble.style.height = size + 'px';
        bubble.style.left = startX + 'px';
        bubble.style.bottom = '-50px';
        bubble.style.animationDuration = duration + 's';
        bubble.style.setProperty('--drift', drift + 'px');
        
        bubblesContainer.appendChild(bubble);
        
        // Remove bubble after animation
        setTimeout(() => {
            if (bubble.parentNode) {
                bubble.parentNode.removeChild(bubble);
            }
        }, duration * 1000);
    }
}

// Add interactive hover effects
document.querySelectorAll('.creature').forEach(creature => {
    creature.addEventListener('mouseenter', function() {
        this.style.transform += ' scale(1.2)';
        this.style.transition = 'transform 0.3s ease';
    });
    
    creature.addEventListener('mouseleave', function() {
        this.style.transform = this.style.transform.replace(' scale(1.2)', '');
    });
});

// Handle window resize
window.addEventListener('resize', function() {
    document.querySelectorAll('.creature').forEach(creature => {
        const currentX = parseFloat(creature.style.left) || 0;
        const currentY = parseFloat(creature.style.top) || 0;
        
        const newX = Math.max(50, Math.min(window.innerWidth - 150, currentX));
        const newY = Math.max(50, Math.min(window.innerHeight - 150, currentY));
        
        creature.style.left = newX + 'px';
        creature.style.top = newY + 'px';
    });
});

// Add water surface effect
function createWaterSurfaceEffect() {
    const waterSurface = document.createElement('div');
    waterSurface.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 20%;
        background: linear-gradient(to bottom, 
            rgba(255, 255, 255, 0.1) 0%,
            rgba(255, 255, 255, 0.05) 50%,
            transparent 100%);
        z-index: 4;
        pointer-events: none;
        animation: surfaceWave 4s ease-in-out infinite;
    `;
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes surfaceWave {
            0%, 100% { transform: translateY(0) scaleY(1); }
            50% { transform: translateY(-5px) scaleY(1.1); }
        }
    `;
    document.head.appendChild(style);
    document.querySelector('.background-container').appendChild(waterSurface);
}

// Initialize water surface effect
createWaterSurfaceEffect();

