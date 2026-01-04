'use client'

import { useState, useRef, useEffect } from 'react'
import { useBuoyancy } from '@/hooks/useBuoyancy'
import { useCursorInteraction } from '@/hooks/useCursorInteraction'

interface MarineCharacterProps {
  name: string
  x: number // Percentage from left
  y: number // Percentage from top
  width: number // Percentage of viewport width
  height: number // Percentage of viewport height
  color: string
  shape: 'fish' | 'whale-shark' | 'manta-ray' | 'turtle' | 'jellyfish' | 'plant'
  children?: React.ReactNode
  hitAreaScale?: number // Scale factor for hit area (default 1.5)
}

/**
 * MarineCharacter Component
 * Interactive marine life with buoyancy physics and cursor interaction
 */
export default function MarineCharacter({
  name,
  x,
  y,
  width,
  height,
  color,
  shape,
  children,
  hitAreaScale = 1.5,
}: MarineCharacterProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isClicked, setIsClicked] = useState(false)
  const elementRef = useRef<HTMLDivElement>(null)
  const { getCursorInfluence } = useCursorInteraction()

  // Calculate initial position in pixels
  const [initialY, setInitialY] = useState(0)
  const [elementPos, setElementPos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const updatePosition = () => {
      if (elementRef.current) {
        const rect = elementRef.current.getBoundingClientRect()
        setInitialY(rect.top + rect.height / 2)
        setElementPos({
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        })
      }
    }

    updatePosition()
    window.addEventListener('resize', updatePosition)
    return () => window.removeEventListener('resize', updatePosition)
  }, [])

  const { y: buoyancyY, rotation, opacity, triggerBuoyancy } = useBuoyancy(initialY, {
    amplitude: 20,
    speed: 0.0008,
    rotationAmplitude: 3,
    opacityVariation: 0.15,
  })

  // Get cursor influence for subtle water movement
  const cursorInfluence = elementRef.current
    ? getCursorInfluence(elementPos.x, elementPos.y, 250)
    : 0

  const handleMouseEnter = () => {
    setIsHovered(true)
    triggerBuoyancy('up', 1.5)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  const handleClick = () => {
    setIsClicked(true)
    triggerBuoyancy('up', 2)
    setTimeout(() => setIsClicked(false), 1000)
  }

  // Calculate transform with cursor influence
  const translateY = isHovered || isClicked
    ? buoyancyY - initialY
    : buoyancyY - initialY + cursorInfluence * 10

  const translateX = cursorInfluence * 15 * Math.sin(Date.now() * 0.001)
  const currentRotation = rotation + cursorInfluence * 2

  // Render shape based on type
  const renderShape = () => {
    const baseStyle: React.CSSProperties = {
      width: '100%',
      height: '100%',
      backgroundColor: color,
      borderRadius: shape === 'jellyfish' ? '50% 50% 0 0' : shape === 'plant' ? '0' : '50%',
      position: 'relative',
      opacity,
      transition: 'opacity 0.3s ease',
    }

    switch (shape) {
      case 'fish':
        return (
          <div
            style={baseStyle}
            className="relative"
          >
            <div
              className="absolute top-1/2 -right-2 w-0 h-0"
              style={{
                borderTop: `8px solid transparent`,
                borderBottom: `8px solid transparent`,
                borderLeft: `12px solid ${color}`,
              }}
            />
            <div
              className="absolute top-1/3 left-1/4 w-2 h-2 rounded-full"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.6)' }}
            />
          </div>
        )
      case 'whale-shark':
        return (
          <div
            style={{
              ...baseStyle,
              borderRadius: '40% 50% 50% 40%',
            }}
            className="relative"
          >
            <div
              className="absolute inset-0"
              style={{
                background: `radial-gradient(circle at 30% 50%, rgba(255,255,255,0.3) 0%, transparent 50%)`,
              }}
            />
            <div
              className="absolute top-1/2 -right-4 w-0 h-0"
              style={{
                borderTop: `15px solid transparent`,
                borderBottom: `15px solid transparent`,
                borderLeft: `20px solid ${color}`,
              }}
            />
          </div>
        )
      case 'manta-ray':
        return (
          <div
            style={{
              ...baseStyle,
              borderRadius: '50%',
              clipPath: 'polygon(0% 50%, 50% 0%, 100% 50%, 50% 100%)',
            }}
            className="relative"
          >
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/3 h-1/3 rounded-full"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
            />
          </div>
        )
      case 'turtle':
        return (
          <div
            style={{
              ...baseStyle,
              borderRadius: '45% 45% 50% 50%',
            }}
            className="relative"
          >
            <div
              className="absolute -top-2 left-1/2 -translate-x-1/2 w-1/2 h-1/3 rounded-full"
              style={{
                backgroundColor: color,
                border: '2px solid rgba(255, 255, 255, 0.2)',
              }}
            />
            <div
              className="absolute bottom-0 left-0 w-1/4 h-1/4 rounded-full"
              style={{ backgroundColor: color }}
            />
            <div
              className="absolute bottom-0 right-0 w-1/4 h-1/4 rounded-full"
              style={{ backgroundColor: color }}
            />
          </div>
        )
      case 'jellyfish':
        return (
          <div className="relative w-full h-full">
            <div
              style={{
                ...baseStyle,
                borderRadius: '50% 50% 40% 40%',
              }}
            />
            <div
              className="absolute top-full left-1/2 -translate-x-1/2 w-1/2 h-1/2"
              style={{
                background: `linear-gradient(to bottom, ${color}, transparent)`,
                clipPath: 'polygon(0% 0%, 100% 0%, 80% 100%, 20% 100%)',
              }}
            />
          </div>
        )
      case 'plant':
        return (
          <div
            style={{
              ...baseStyle,
              background: `linear-gradient(to top, ${color}, ${color}dd)`,
              borderRadius: '0',
            }}
            className="relative"
          >
            <div
              className="absolute inset-0"
              style={{
                background: `repeating-linear-gradient(
                  90deg,
                  transparent,
                  transparent 10px,
                  rgba(255,255,255,0.1) 10px,
                  rgba(255,255,255,0.1) 12px
                )`,
              }}
            />
          </div>
        )
      default:
        return <div style={baseStyle} />
    }
  }

  return (
    <div
      ref={elementRef}
      className="absolute gpu-accelerated cursor-pointer touch-none"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: `clamp(${width * 0.5}%, ${width}vw, ${width}%)`,
        height: `clamp(${height * 0.5}%, ${height}vh, ${height}%)`,
        transform: `translate(${translateX}px, ${translateY}px) rotate(${currentRotation}deg)`,
        transformOrigin: 'center center',
        willChange: 'transform, opacity',
        transition: 'transform 0.1s ease-out',
        minWidth: '20px',
        minHeight: '20px',
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      onTouchStart={(e) => {
        e.preventDefault()
        handleClick()
      }}
      role="button"
      tabIndex={0}
      aria-label={`Interactive ${name}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          handleClick()
        }
      }}
    >
      {/* Invisible hit area for better interaction */}
      <div
        className="absolute inset-0 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: `${hitAreaScale * 100}%`,
          height: `${hitAreaScale * 100}%`,
          left: '50%',
          top: '50%',
        }}
      />
      {children || renderShape()}
    </div>
  )
}

