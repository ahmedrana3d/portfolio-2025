import { useEffect } from 'react'
import { useProgress } from '@react-three/drei'

// This component tracks Three.js loading progress and updates a callback
const ProgressTracker = ({ onProgressUpdate }) => {
  const { progress, active, item, loaded, total } = useProgress()

  useEffect(() => {
    if (onProgressUpdate) {
      onProgressUpdate({ progress, active, item, loaded, total })
    }
  }, [progress, active, item, loaded, total, onProgressUpdate])

  return null
}

export default ProgressTracker

