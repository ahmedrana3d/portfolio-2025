import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Sparkles } from '@react-three/drei'
import MetallicText from '../Text3D/MetallicText'
import Lighting from '../Lighting/Lighting'
import { Bloom, ChromaticAberration, DepthOfField, DotScreen, EffectComposer, Noise, Vignette } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import { ACESFilmicToneMapping, LinearToneMapping, Vector2 } from 'three'
import GradientBackground from '../GrainyBackground/GrainyBackground'
import { useState, useEffect, useRef } from 'react'
import { Perf } from 'r3f-perf'

// Component to handle mouse-based camera movement
function CameraController({ mousePosition }) {
  const { camera } = useThree()
  
  useFrame(() => {
    // Calculate camera position based on mouse
    const radius = 5 // Distance from center
    const targetX = Math.sin(mousePosition.x * 0.2) * radius
    const targetY = mousePosition.y * 0.4
    const targetZ = Math.cos(mousePosition.x * 0.2) * radius
    
    // Smooth lerp to target position
    camera.position.x += (targetX - camera.position.x) * 0.02
    camera.position.y += (targetY - camera.position.y) * 0.02
    camera.position.z += (targetZ - camera.position.z) * 0.02
    
    // Always look at the center
    camera.lookAt(0, -1, 0)
  })
  
  return null
}

function Scene({ scrollProgress = 0 }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const [config, setConfig] = useState({
    colors: ['#111212', 'black'],
    grainScale: 0.005,
    noiseAlpha: 0.15,
    smooth: [0, 1.0],
    scale: [0.8, 1],
    aspectCorrection: true
  });

  useEffect(() => {
    let rafId = null
    let lastUpdateTime = 0
    const throttleMs = 16 // ~60fps throttling

    const handleMouseMove = (event) => {
      const now = Date.now()
      
      // Throttle updates to ~60fps
      if (now - lastUpdateTime < throttleMs) {
        return
      }
      
      lastUpdateTime = now
      
      // Use requestAnimationFrame for smooth updates
      if (rafId) {
        cancelAnimationFrame(rafId)
      }
      
      rafId = requestAnimationFrame(() => {
        // Normalize mouse position to -1 to 1 range
        const x = (event.clientX / window.innerWidth) * 2 - 1
        const y = -(event.clientY / window.innerHeight) * 2 + 1
        
        setMousePosition({ x, y })
      })
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (rafId) {
        cancelAnimationFrame(rafId)
      }
    }
  }, [])



  return (
    <Canvas 
    className="canvas-background"
    camera={{ position: [0, 0, 20], fov: 50 }}
    gl={{
      powerPreference: "high-performance",
      alpha: false,
      toneMapping: LinearToneMapping,
      antialias: true,
      stencil: false,
      depth: false
    }}
    dpr={[1, 2]}
    performance={{ min: 0.5 }}
    frameloop="always"
    style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 0,
      willChange: 'transform',
      transform: 'translateZ(0)',
      backfaceVisibility: 'hidden',
      WebkitBackfaceVisibility: 'hidden',
      contain: 'strict'
    }}
    >


<Perf/>

<GradientBackground {...config} />

      <CameraController mousePosition={mousePosition} />
      {/* <OrbitControls enableRotate={false} /> */}
      
      <Lighting />
      <MetallicText scrollProgress={scrollProgress} />
      <Sparkles count={100} scale={5 * 2} size={1} speed={0.4} />

      {/* <color attach="background" args={["#050505"]} /> */}
      {/* <fog color="#161616" attach="fog" near={8} far={30} /> */}

      <EffectComposer multisampling={0} disableNormalPass>
  <DepthOfField
    focusDistance={2.5}
    focalLength={0.3}
    bokehScale={0.3}
    height={240}
  />

<Bloom
  intensity={1} // Intensity of the bloom effect

/>

  {/* Adds RGB color split like your screenshot */}
  <ChromaticAberration
    offset={new Vector2(0.009, 0.009)} // increase for stronger RGB split
    radialModulation={true}
    modulationOffset={0.5}
  />

</EffectComposer>

    </Canvas> 
  )
}

export default Scene
