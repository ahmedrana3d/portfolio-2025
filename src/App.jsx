import Scene from './components/Scene/Scene'
import './App.css'
import { useEffect, useRef, useState } from 'react'
import ReactLenis from 'lenis/react'
import Frontend from './components/UI/Frontend'
import { useScrollTriggerManager } from './hooks/useScrollTriggerManager'
import LoadingScreen from './components/Loading/LoadingScreen'

function App() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [threeProgress, setThreeProgress] = useState(0)
  const [threeActive, setThreeActive] = useState(true)
  const containerRef = useRef(null)
  const { createTrigger } = useScrollTriggerManager()
  const rafRef = useRef(null)
  const lastProgressRef = useRef(0)

  // Handle Three.js progress updates
  const handleProgressUpdate = (progressData) => {
    setThreeProgress(progressData.progress)
    setThreeActive(progressData.active)
  }

  // Handle loading complete
  const handleLoadingComplete = () => {
    setIsLoading(false)
  }

  useEffect(() => {
    const trigger = createTrigger({
      trigger: '.app-container',
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      scroller: window,
      onUpdate: (self) => {
        // Use requestAnimationFrame for smooth updates without throttling
        // This ensures smooth dissolve animation
        if (rafRef.current) {
          cancelAnimationFrame(rafRef.current)
        }
        
        rafRef.current = requestAnimationFrame(() => {
          setScrollProgress(self.progress)
          lastProgressRef.current = self.progress
          rafRef.current = null
        })
      }
    })

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
      trigger.kill()
    }
  }, [createTrigger])

  return (
    <div ref={containerRef} style={{ position: 'relative' }}>
      {/* Loading Screen */}
      {isLoading && (
        <LoadingScreen
          onLoaded={handleLoadingComplete}
          threeProgress={threeProgress}
          threeActive={threeActive}
        />
      )}

      <ReactLenis 
        root
        options={{
          duration: 1.5, // Slower scroll animation (default is 1.2)
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Smooth easing
          smoothWheel: true, // Enable smooth wheel scrolling
          wheelMultiplier: 0.5, // Reduce wheel scroll speed (default is 1)
          touchMultiplier: 0.5, // Reduce touch scroll speed
          smoothTouch: true, // Enable smooth touch scrolling
        }}
      />

      <div>
        <div className="app-container " style={{ width: '100%', height: '200vh', zIndex: 0 }}>
          <Scene scrollProgress={scrollProgress} onProgressUpdate={handleProgressUpdate} />
        </div>
      </div>
      <div className='relative z-50 pointer-events-auto'>
        <Frontend scrollProgress={scrollProgress} />
      </div>
      <div className='chapter-1-end h-2 absolute bottom-0' />
    </div>
  )
}

export default App
