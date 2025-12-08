import Scene from './components/Scene/Scene'
import './App.css'
import { useEffect, useRef, useState } from 'react'
import ReactLenis from 'lenis/react'
import Frontend from './components/UI/Frontend'
import { useScrollTriggerManager } from './hooks/useScrollTriggerManager'

function App() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const containerRef = useRef(null)
  const { createTrigger } = useScrollTriggerManager()
  const rafRef = useRef(null)
  const lastProgressRef = useRef(0)

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
      <ReactLenis root />
      <div className="app-container" style={{ width: '100%', height: '200vh', zIndex: 0 }}>
        <Scene scrollProgress={scrollProgress} />
      </div>
      <div className='relative z-50 pointer-events-auto'>
        <Frontend scrollProgress={scrollProgress} />
      </div>
      <div className='chapter-1-end h-2 absolute bottom-0' />
    </div>
  )
}

export default App
