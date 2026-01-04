'use client'

import { useEffect, useRef } from 'react'
import { useAnimationFrame } from '@/hooks/useAnimationFrame'

/**
 * UnderwaterBackground Component
 * Creates an animated underwater scene with:
 * - Gradient water movement
 * - Subtle noise texture
 * - Light rays
 * - Parallax drift
 */
export default function UnderwaterBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const gradientRef = useRef<CanvasGradient | null>(null)
  const noiseCanvasRef = useRef<HTMLCanvasElement>(null)
  const timeRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    const noiseCanvas = noiseCanvasRef.current
    if (!canvas || !noiseCanvas) return

    const ctx = canvas.getContext('2d', { alpha: false })
    const noiseCtx = noiseCanvas.getContext('2d', { alpha: false })
    if (!ctx || !noiseCtx) return

    // Set canvas size with device pixel ratio for crisp rendering
    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      const width = window.innerWidth
      const height = window.innerHeight

      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.scale(dpr, dpr)

      noiseCanvas.width = width * dpr
      noiseCanvas.height = height * dpr
      noiseCanvas.style.width = `${width}px`
      noiseCanvas.style.height = `${height}px`
      noiseCtx.scale(dpr, dpr)
    }
    resize()
    
    // Generate noise texture
    const generateNoise = () => {
      const dpr = window.devicePixelRatio || 1
      const width = Math.floor(window.innerWidth)
      const height = Math.floor(window.innerHeight)
      const imageData = noiseCtx.createImageData(width, height)
      const data = imageData.data

      for (let i = 0; i < data.length; i += 4) {
        const value = Math.random() * 20 // Subtle noise
        data[i] = value // R
        data[i + 1] = value * 1.1 // G
        data[i + 2] = value * 1.2 // B
        data[i + 3] = 30 // Alpha (subtle)
      }

      noiseCtx.putImageData(imageData, 0, 0)
    }
    generateNoise()
    
    const handleResize = () => {
      resize()
      generateNoise()
    }
    window.addEventListener('resize', handleResize)

    // Create gradient
    gradientRef.current = ctx.createLinearGradient(0, 0, 0, canvas.height)
    gradientRef.current.addColorStop(0, '#0a2540')
    gradientRef.current.addColorStop(0.3, '#1a4a6b')
    gradientRef.current.addColorStop(0.6, '#2d6b8f')
    gradientRef.current.addColorStop(1, '#0a1929')

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // Animate water movement
  useAnimationFrame((delta) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx || !gradientRef.current) return

    timeRef.current += delta * 0.001

    // Get canvas dimensions accounting for device pixel ratio
    const dpr = window.devicePixelRatio || 1
    const width = canvas.width / dpr
    const height = canvas.height / dpr

    // Clear canvas
    ctx.fillStyle = '#0a1929'
    ctx.fillRect(0, 0, width, height)

    // Animated gradient with parallax drift
    
    const offsetX = Math.sin(timeRef.current * 0.3) * 50
    const offsetY = Math.cos(timeRef.current * 0.2) * 30

    const gradient = ctx.createLinearGradient(
      offsetX,
      offsetY,
      offsetX,
      height + offsetY
    )
    gradient.addColorStop(0, '#0a2540')
    gradient.addColorStop(0.2, '#1a4a6b')
    gradient.addColorStop(0.5, '#2d6b8f')
    gradient.addColorStop(0.8, '#1a4a6b')
    gradient.addColorStop(1, '#0a1929')

    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, width, height)

    // Draw light rays
    ctx.save()
    ctx.globalAlpha = 0.15
    ctx.fillStyle = '#ffffff'
    for (let i = 0; i < 5; i++) {
      const rayX = (width / 6) * (i + 1) + Math.sin(timeRef.current * 0.1 + i) * 100
      const rayWidth = 2 + Math.sin(timeRef.current * 0.2 + i) * 1
      const rayGradient = ctx.createLinearGradient(rayX, 0, rayX, height)
      rayGradient.addColorStop(0, 'rgba(255, 255, 255, 0.3)')
      rayGradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.1)')
      rayGradient.addColorStop(1, 'rgba(255, 255, 255, 0)')
      ctx.fillStyle = rayGradient
      ctx.fillRect(rayX - rayWidth / 2, 0, rayWidth, height)
    }
    ctx.restore()

    // Overlay noise texture
    const noiseCanvas = noiseCanvasRef.current
    if (noiseCanvas) {
      ctx.globalAlpha = 0.1
      ctx.drawImage(noiseCanvas, 0, 0, width, height)
    }
  })

  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ imageRendering: 'auto' }}
      />
      <canvas
        ref={noiseCanvasRef}
        className="absolute inset-0 w-full h-full opacity-30"
        style={{ display: 'none' }}
      />
    </div>
  )
}

