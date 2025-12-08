import { Center, Text3D, useTexture } from '@react-three/drei'
import { useLoader } from '@react-three/fiber'
import { EXRLoader } from 'three/examples/jsm/loaders/EXRLoader'
import { RepeatWrapping } from 'three'
import { DissolveMaterial } from '../DissolveMaterial/DissolveMaterial'
// import { useControls } from 'leva'

function MetallicText({ scrollProgress = 0 }) {

//  const dissolveColor = useControls({
//   dissolveColor: { value: '#111212' },
//  })

  // Load standard texture formats
  const [diffuseMap, aoMap, displacementMap] = useTexture([
    './textures/coast_sand_05_diff_1k.jpg',
    './textures/coast_sand_05_ao_1k.jpg',
    './textures/coast_sand_05_disp_1k.png',
  ])

  // Load EXR textures with special loader
  const normalMap = useLoader(EXRLoader, './textures/coast_sand_05_nor_gl_1k.exr')
  const roughnessMap = useLoader(EXRLoader, './textures/coast_sand_05_rough_1k.exr')

  // Configure texture wrapping and repeat for better appearance
  diffuseMap.wrapS = diffuseMap.wrapT = RepeatWrapping
  normalMap.wrapS = normalMap.wrapT = RepeatWrapping
  roughnessMap.wrapS = roughnessMap.wrapT = RepeatWrapping
  
  // Scale textures for better detail
  const scale = 2
  diffuseMap.repeat.set(scale, scale)
  normalMap.repeat.set(scale, scale)
  roughnessMap.repeat.set(scale, scale)

  return (
    <Center>
      <Text3D
        position={[0, 0, 0]}
        size={1.5}
        height={0.3}
        curveSegments={32}
        bevelEnabled
        bevelThickness={0.05}
        bevelSize={0.04}
        bevelOffset={0}
        bevelSegments={10}
        font="./HardanVintage.json"
        center
      >
        AHMED
        <DissolveMaterial
          baseMaterial="MeshStandardMaterial"
          map={diffuseMap}
          normalMap={normalMap}
          normalScale={[1, 1]}
          roughnessMap={roughnessMap}
          aoMap={aoMap}
          displacementMap={displacementMap}
          displacementScale={0.02}
          metalness={0.8}
          roughness={0.4}
          color="#111212"
          emissive="#111212"
          emissiveIntensity={0.3}
          envMapIntensity={2}
          progress={1 - scrollProgress}
          dissolveColor="#111212"
        />

      </Text3D>
    </Center>
  )
}

export default MetallicText
