import { useState, useEffect, useCallback } from 'react'

interface CursorPosition {
  x: number
  y: number
}

/**
 * Custom hook for cursor-based water interaction effects
 * Tracks mouse position and calculates influence on nearby elements
 */
export function useCursorInteraction() {
  const [cursorPos, setCursorPos] = useState<CursorPosition>({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY })
    }

    const handleMouseEnter = () => setIsHovering(true)
    const handleMouseLeave = () => setIsHovering(false)

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseenter', handleMouseEnter)
    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  /**
   * Calculate the influence of cursor on an element
   * Returns a value between 0 and 1 based on distance
   */
  const getCursorInfluence = useCallback(
    (elementX: number, elementY: number, maxDistance: number = 200): number => {
      if (!isHovering) return 0

      const dx = cursorPos.x - elementX
      const dy = cursorPos.y - elementY
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance > maxDistance) return 0

      // Inverse distance with smooth falloff
      const influence = 1 - distance / maxDistance
      return Math.max(0, Math.min(1, influence * influence)) // Quadratic falloff
    },
    [cursorPos, isHovering]
  )

  return {
    cursorPos,
    isHovering,
    getCursorInfluence,
  }
}

