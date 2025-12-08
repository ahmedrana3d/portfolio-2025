import { Environment } from "@react-three/drei"

function Lighting() {
  return (
    <>
      {/* Premium studio lighting with custom accents */}
      <Environment
        preset="studio"
        environmentIntensity={0.8}
      />
      
      {/* Key light - main dramatic light */}
      <directionalLight 
        position={[5, 5, 5]} 
        intensity={2} 
        color="#ffffff"
        castShadow
      />
      
      {/* Rim light - creates premium edge glow */}
      <directionalLight 
        position={[-5, 2, -5]} 
        intensity={1.5} 
        color="#ffffff"
      />
      
      {/* Accent light from below - luxury feel */}
      <pointLight 
        position={[0, -3, 2]} 
        intensity={1.2} 
        color="#ffffff"
        distance={10}
        decay={2}
      />
      
      {/* Soft fill light */}
      <ambientLight intensity={0.3} color="#ffffff" />
      
      {/* Accent spot for extra premium touch */}
      <spotLight
        position={[0, 5, 0]}
        angle={0.5}
        penumbra={1}
        intensity={0.8}
        color="#ffffff"
        castShadow
      />
    </>
  )
}

export default Lighting
