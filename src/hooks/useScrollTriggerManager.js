import { useEffect, useRef, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Centralized ScrollTrigger manager to consolidate all scroll triggers
 * and prevent duplicate instances
 */
export function useScrollTriggerManager() {
  const triggersRef = useRef([])

  // Cleanup all triggers on unmount
  useEffect(() => {
    return () => {
      triggersRef.current.forEach(trigger => {
        if (trigger && typeof trigger.kill === 'function') {
          trigger.kill()
        }
      })
      triggersRef.current = []
    }
  }, [])

  /**
   * Create a new ScrollTrigger instance
   * @param {Object} config - ScrollTrigger configuration
   * @returns {Object} - ScrollTrigger instance
   */
  const createTrigger = useCallback((config) => {
    // Only throttle non-scrub animations to reduce re-renders
    // Scrub animations need smooth updates for dissolve effects
    if (config.onUpdate && !config.scrub) {
      const originalOnUpdate = config.onUpdate
      let rafId = null
      let lastProgress = null
      
      config.onUpdate = (self) => {
        // Skip if progress hasn't changed significantly (only for non-scrub)
        if (lastProgress !== null && Math.abs(self.progress - lastProgress) < 0.01) {
          return
        }
        
        if (rafId) {
          cancelAnimationFrame(rafId)
        }
        
        rafId = requestAnimationFrame(() => {
          originalOnUpdate(self)
          lastProgress = self.progress
          rafId = null
        })
      }
    }
    
    const trigger = ScrollTrigger.create(config)
    triggersRef.current.push(trigger)
    return trigger
  }, [])

  /**
   * Kill a specific trigger
   * @param {Object} trigger - ScrollTrigger instance to kill
   */
  const killTrigger = useCallback((trigger) => {
    if (trigger && typeof trigger.kill === 'function') {
      trigger.kill()
      triggersRef.current = triggersRef.current.filter(t => t !== trigger)
    }
  }, [])

  /**
   * Kill all triggers
   */
  const killAll = useCallback(() => {
    triggersRef.current.forEach(trigger => {
      if (trigger && typeof trigger.kill === 'function') {
        trigger.kill()
      }
    })
    triggersRef.current = []
  }, [])

  return {
    createTrigger,
    killTrigger,
    killAll,
    triggers: triggersRef.current
  }
}

