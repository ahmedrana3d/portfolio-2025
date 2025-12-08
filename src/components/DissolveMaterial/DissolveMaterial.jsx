import { useFrame } from "@react-three/fiber";
import { patchShaders } from "gl-noise";
import { easing } from "maath";
import * as React from "react";
import * as THREE from "three";
import CSM from "three-custom-shader-material";

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  varying vec3 vPosition; // use the world position instead of the uv
  void main() {
    vUv = uv;
    vPosition = position;
  }`;

const fragmentShader = patchShaders(/* glsl */ `
  varying vec2 vUv;
  varying vec3 vPosition;
  uniform float uThickness;
  uniform vec3 uColor;
  uniform float uProgress;
  uniform vec3 uBoundsMin;
  uniform vec3 uBoundsMax;
  
  void main() {
    // Add some noise for a more organic edge
    gln_tFBMOpts opts = gln_tFBMOpts(1.1, 1.1, 1.0, 2.0, 1.0, 3, false, false);
    float noise = gln_sfbm(vPosition, opts);
    noise = gln_normalize(noise);
    
    // Normalize x position from 0 (left) to 1 (right)
    float xRange = uBoundsMax.x - uBoundsMin.x ;
    float normalizedX = (vPosition.x - uBoundsMin.x) / xRange ;
    
    // Add slight noise variation to the edge (scale it down and center it around 0)
    float edgeNoise = (noise - 0.5) * 1.5; // Increased by 20% more
    float position = normalizedX + edgeNoise + 2.6;
    
    // Extend progress range slightly beyond 0-1 to ensure complete dissolve
    float extendedProgress = uProgress * 5.0 - 6.6;
    
    float alpha = step(1.0 - extendedProgress, position);
    float border = step((1.0 - extendedProgress) - uThickness, position) - alpha;
    
    csm_DiffuseColor.a = alpha + border;
    csm_DiffuseColor.rgb = mix(csm_DiffuseColor.rgb, uColor, border);
  }`);

export function DissolveMaterial({
  baseMaterial = THREE.MeshStandardMaterial,
  thickness = 0.05,
  dissolveColor = "#eb5a13",
  intensity = 5,
  duration = 1.2,
  visible = true,
  progress = null, // New prop for direct progress control
  onFadeOut,
  normalScale,
  ...materialProps
}) {
  const meshRef = React.useRef();
  const uniforms = React.useRef({
    uThickness: { value: 0.1 },
    uColor: { value: new THREE.Color("#eb5a13").multiplyScalar(20) },
    uProgress: { value: 0 },
    uBoundsMin: { value: new THREE.Vector3(-1, -1, -1) },
    uBoundsMax: { value: new THREE.Vector3(1, 1, 1) },
  });

  // Calculate bounds once when the component mounts or geometry changes
  React.useEffect(() => {
    if (meshRef.current?.parent?.geometry) {
      const geometry = meshRef.current.parent.geometry;
      geometry.computeBoundingBox();
      
      if (geometry.boundingBox) {
        uniforms.current.uBoundsMin.value.copy(geometry.boundingBox.min);
        uniforms.current.uBoundsMax.value.copy(geometry.boundingBox.max);
      }
    }
  }, []);

  React.useEffect(() => {
    uniforms.current.uThickness.value = thickness;
    uniforms.current.uColor.value.set(dissolveColor).multiplyScalar(intensity);
  }, [thickness, dissolveColor, intensity]);

  // Update progress directly if provided, otherwise use visible prop with animation
  React.useEffect(() => {
    if (progress !== null) {
      uniforms.current.uProgress.value = progress;
    }
  }, [progress]);

  useFrame((_state, delta) => {
    // Only animate if progress is not directly controlled
    if (progress === null) {
      easing.damp(
        uniforms.current.uProgress,
        "value",
        visible ? 1 : 0,
        duration,
        delta
      );
    }

    if (uniforms.current.uProgress.value < 0.1 && onFadeOut) {
      onFadeOut();
    }
  });

  // Handle baseMaterial if passed as string
  const materialClass = typeof baseMaterial === 'string' 
    ? THREE[baseMaterial] 
    : baseMaterial;

  // Convert normalScale array to Vector2 if needed
  const processedNormalScale = React.useMemo(() => {
    if (normalScale) {
      return Array.isArray(normalScale) 
        ? new THREE.Vector2(normalScale[0], normalScale[1])
        : normalScale;
    }
    return undefined;
  }, [normalScale]);

  return (
    <CSM
      ref={meshRef}
      baseMaterial={materialClass}
      vertexShader={vertexShader}
      fragmentShader={fragmentShader}
      uniforms={uniforms.current}
      toneMapped={false}
      transparent
      normalScale={processedNormalScale}
      {...materialProps}
    />
  );
}