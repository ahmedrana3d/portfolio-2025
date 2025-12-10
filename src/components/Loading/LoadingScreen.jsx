import { useState, useEffect, useRef } from 'react'

const LoadingScreen = ({ onLoaded, threeProgress = 0, threeActive = true }) => {
  const [pageProgress, setPageProgress] = useState(0)
  const [imageProgress, setImageProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const fadeTimeoutRef = useRef(null)

  // Track page/dom loading
  useEffect(() => {
    const updatePageProgress = () => {
      if (document.readyState === 'complete') {
        setPageProgress(100)
      } else if (document.readyState === 'interactive') {
        setPageProgress(50)
      } else {
        setPageProgress(10)
      }
    }

    updatePageProgress()

    const handleLoad = () => {
      setPageProgress(100)
    }

    const handleProgress = () => {
      updatePageProgress()
    }

    window.addEventListener('load', handleLoad)
    document.addEventListener('readystatechange', handleProgress)

    return () => {
      window.removeEventListener('load', handleLoad)
      document.removeEventListener('readystatechange', handleProgress)
    }
  }, [])

  // Track image loading - check periodically for images that may load later
  useEffect(() => {
    const updateImageProgress = () => {
      const images = document.querySelectorAll('img')
      if (images.length === 0) {
        setImageProgress(100)
        return
      }

      let loadedCount = 0
      const totalImages = images.length

      images.forEach((img) => {
        if (img.complete || img.naturalHeight > 0) {
          loadedCount++
        }
      })

      const progress = totalImages > 0 ? (loadedCount / totalImages) * 100 : 100
      setImageProgress(progress)
    }

    // Initial check
    updateImageProgress()

    // Check periodically for images that load later
    const interval = setInterval(updateImageProgress, 100)

    // Also listen for image load events
    const handleImageLoad = () => {
      updateImageProgress()
    }

    window.addEventListener('load', handleImageLoad)
    document.addEventListener('load', handleImageLoad, true)

    return () => {
      clearInterval(interval)
      window.removeEventListener('load', handleImageLoad)
      document.removeEventListener('load', handleImageLoad, true)
    }
  }, [])

  // Calculate overall progress
  // Three.js progress: 70% weight (most important)
  // Page progress: 20% weight
  // Image progress: 10% weight
  const overallProgress = Math.min(
    100,
    Math.round(
      (threeProgress * 0.7) +
      (pageProgress * 0.2) +
      (imageProgress * 0.1)
    )
  )

  // Check if loading is complete
  useEffect(() => {
    // Wait for Three.js to finish loading and be inactive
    // Also ensure we're at high progress
    if (!threeActive && overallProgress >= 95 && pageProgress >= 90) {
      // Small delay to ensure everything is ready
      if (fadeTimeoutRef.current) {
        clearTimeout(fadeTimeoutRef.current)
      }

      fadeTimeoutRef.current = setTimeout(() => {
        setIsComplete(true)
        // Call onLoaded callback after fade animation
        setTimeout(() => {
          if (onLoaded) onLoaded()
        }, 500) // Match fade duration
      }, 300)
    }

    return () => {
      if (fadeTimeoutRef.current) {
        clearTimeout(fadeTimeoutRef.current)
      }
    }
  }, [threeActive, overallProgress, pageProgress, onLoaded])

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-black transition-opacity duration-500 ${
        isComplete ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {/* Loading Text */}
        <div className="mb-8 text-center">
          <h2 className="text-white text-2xl md:text-3xl font-light tracking-wide mb-2">
            Loading...
          </h2>
          <p className="text-white/60 text-sm md:text-base">
          Good things take time
          </p>
        </div>

        {/* Progress Bar Container */}
        <div className="w-full max-w-md px-8">
          {/* Progress Bar Background */}
          <div className="relative h-1 bg-white/10 rounded-full overflow-hidden">
            {/* Progress Bar Fill */}
            <div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#F4E4A6] to-white transition-all duration-300 ease-out rounded-full"
              style={{
                width: `${overallProgress}%`,
                boxShadow: '0 0 10px rgba(244, 228, 166, 0.5)',
              }}
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
            </div>
          </div>

          {/* Progress Percentage */}
          <div className="mt-4 text-center">
            <span className="text-white/80 text-sm font-light">
              {overallProgress}%
            </span>
          </div>
        </div>
      </div>

      {/* Add shimmer animation to CSS */}
      <style>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  )
}

export default LoadingScreen

