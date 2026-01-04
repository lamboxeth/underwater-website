import { useState, useRef, useCallback } from 'react'
import { useAnimationFrame } from './useAnimationFrame'

interface BuoyancyState {
  y: number
  rotation: number
  opacity: number
  velocity: number
  rotationVelocity: number
}

/**
 * Custom hook for buoyancy physics simulation
 * Creates smooth, natural floating motion with sine-wave patterns
 */
export function useBuoyancy(
  initialY: number = 0,
  options: {
    amplitude?: number
    speed?: number
    rotationAmplitude?: number
    opacityVariation?: number
  } = {}
) {
  const {
    amplitude = 30,
    speed = 0.001,
    rotationAmplitude = 5,
    opacityVariation = 0.1,
  } = options

  const [state, setState] = useState<BuoyancyState>({
    y: initialY,
    rotation: 0,
    opacity: 0.9,
    velocity: 0,
    rotationVelocity: 0,
  })

  const timeRef = useRef(0)
  const baseYRef = useRef(initialY)
  const baseRotationRef = useRef(0)
  const baseOpacityRef = useRef(0.9)

  // Animate buoyancy motion
  useAnimationFrame((delta) => {
    timeRef.current += delta * speed

    // Sine wave for smooth vertical motion
    const sineY = Math.sin(timeRef.current) * amplitude
    const cosineY = Math.cos(timeRef.current * 0.7) * (amplitude * 0.5)

    // Gentle rotation
    const rotation = Math.sin(timeRef.current * 0.5) * rotationAmplitude

    // Subtle opacity shimmer
    const opacity =
      baseOpacityRef.current +
      Math.sin(timeRef.current * 1.2) * opacityVariation

    setState({
      y: baseYRef.current + sineY + cosineY,
      rotation: baseRotationRef.current + rotation,
      opacity: Math.max(0.7, Math.min(1, opacity)),
      velocity: Math.cos(timeRef.current) * amplitude * speed,
      rotationVelocity: Math.cos(timeRef.current * 0.5) * rotationAmplitude * speed,
    })
  })

  // Trigger buoyancy on interaction
  const triggerBuoyancy = useCallback(
    (direction: 'up' | 'down' = 'up', intensity: number = 1) => {
      const targetY = direction === 'up' ? -amplitude * intensity : amplitude * intensity
      const targetRotation = direction === 'up' ? -rotationAmplitude * intensity : rotationAmplitude * intensity

      // Smooth transition to new position
      const startY = baseYRef.current
      const startRotation = baseRotationRef.current
      const startTime = Date.now()
      const duration = 2000 // 2 seconds

      const animate = () => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / duration, 1)

        // Ease-in-out curve
        const ease = progress < 0.5
          ? 2 * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 2) / 2

        baseYRef.current = startY + (targetY - startY) * ease
        baseRotationRef.current = startRotation + (targetRotation - startRotation) * ease

        // Return to base after animation
        if (progress >= 1) {
          setTimeout(() => {
            const returnStartY = baseYRef.current
            const returnStartRotation = baseRotationRef.current
            const returnStartTime = Date.now()

            const returnAnimate = () => {
              const returnElapsed = Date.now() - returnStartTime
              const returnProgress = Math.min(returnElapsed / duration, 1)
              const returnEase = returnProgress < 0.5
                ? 2 * returnProgress * returnProgress
                : 1 - Math.pow(-2 * returnProgress + 2, 2) / 2

              baseYRef.current = returnStartY + (initialY - returnStartY) * returnEase
              baseRotationRef.current = returnStartRotation + (0 - returnStartRotation) * returnEase

              if (returnProgress < 1) {
                requestAnimationFrame(returnAnimate)
              }
            }

            requestAnimationFrame(returnAnimate)
          }, 500)
        } else {
          requestAnimationFrame(animate)
        }
      }

      requestAnimationFrame(animate)
    },
    [amplitude, rotationAmplitude, initialY]
  )

  return {
    y: state.y,
    rotation: state.rotation,
    opacity: state.opacity,
    triggerBuoyancy,
  }
}

