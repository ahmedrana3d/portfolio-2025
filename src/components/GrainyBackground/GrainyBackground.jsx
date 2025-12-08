import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const vertexShader = `
attribute vec3 position;
varying vec2 vUv;
void main() {
  gl_Position = vec4(position, 1.0);
  vUv = vec2(position.x, position.y) * 0.5 + 0.5;
}
`;

const fragmentShader = `
precision mediump float;
uniform vec3 color1;
uniform vec3 color2;
uniform float aspect;
uniform vec2 offset;
uniform vec2 scale;
uniform float noiseAlpha;
uniform bool aspectCorrection;
uniform float grainScale;
uniform float grainTime;
uniform vec2 smooth;
varying vec2 vUv;

// Film grain function
float grain(vec2 uv, vec2 mult, float time) {
  float seed = dot(uv, vec2(12.9898, 78.233));
  float noise = fract(sin(seed) * 43758.5453 + time);
  return noise;
}

// Soft light blend
vec3 blendSoftLight(vec3 base, vec3 blend) {
  return mix(
    sqrt(base) * (2.0 * blend - 1.0) + 2.0 * base * (1.0 - blend),
    2.0 * base * blend + base * base * (1.0 - 2.0 * blend),
    step(0.5, blend)
  );
}

void main() {
  vec2 q = vec2(vUv - 0.5);
  if (aspectCorrection) {
    q.x *= aspect;
  }
  q /= scale;
  q -= offset;
  float dst = length(q);
  dst = smoothstep(smooth.x, smooth.y, dst);
  vec3 color = mix(color1, color2, dst);
  
  if (noiseAlpha > 0.0 && grainScale > 0.0) {
    float gSize = 1.0 / grainScale;
    float g = grain(vUv, vec2(gSize * aspect, gSize), grainTime);
    vec3 noiseColor = blendSoftLight(color, vec3(g));
    gl_FragColor.rgb = mix(color, noiseColor, noiseAlpha);
  } else {
    gl_FragColor.rgb = color;
  }
  gl_FragColor.a = 1.0;
}
`;

function GradientBackground({
  colors = ['#ffffff', '#283844'],
  aspect = 1,
  grainScale = 0.005,
  noiseAlpha = 0.25,
  offset = [0, 0],
  scale = [1, 1],
  smooth = [0.0, 1.0],
  aspectCorrection = false,
  animate = true
}) {
  const meshRef = useRef();
  const { viewport } = useThree();

  const uniforms = useMemo(() => ({
    aspectCorrection: { value: aspectCorrection },
    aspect: { value: viewport.width / viewport.height },
    grainScale: { value: grainScale },
    grainTime: { value: 0 },
    noiseAlpha: { value: noiseAlpha },
    offset: { value: new THREE.Vector2(offset[0], offset[1]) },
    scale: { value: new THREE.Vector2(scale[0], scale[1]) },
    smooth: { value: new THREE.Vector2(smooth[0], smooth[1]) },
    color1: { value: new THREE.Color(colors[0]) },
    color2: { value: new THREE.Color(colors[1]) }
  }), []);

  // Update aspect ratio on resize
  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.material.uniforms.aspect.value = viewport.width / viewport.height;
    }
  }, [viewport.width, viewport.height]);

  // Update uniforms when props change
  useEffect(() => {
    if (meshRef.current) {
      const mat = meshRef.current.material;
      mat.uniforms.color1.value.set(colors[0]);
      mat.uniforms.color2.value.set(colors[1]);
      mat.uniforms.grainScale.value = grainScale;
      mat.uniforms.noiseAlpha.value = noiseAlpha;
      mat.uniforms.offset.value.set(offset[0], offset[1]);
      mat.uniforms.scale.value.set(scale[0], scale[1]);
      mat.uniforms.smooth.value.set(smooth[0], smooth[1]);
      mat.uniforms.aspectCorrection.value = aspectCorrection;
    }
  }, [colors, grainScale, noiseAlpha, offset, scale, smooth, aspectCorrection]);

  // Animate grain
  useFrame((state) => {
    if (meshRef.current && animate) {
      meshRef.current.material.uniforms.grainTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh ref={meshRef} frustumCulled={false}>
      <planeGeometry args={[2, 2]} />
      <rawShaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        side={THREE.DoubleSide}
        depthTest={false}
      />
    </mesh>
  );
}

// Demo component
export default GradientBackground;