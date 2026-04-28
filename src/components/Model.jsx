import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import { useRef } from "react";
import { fragment, vertex } from "./shader";
import { useAspect, useTexture } from "@react-three/drei";

export default function Model() {
  const { amplitude, waveLength, speed } = useControls({
    amplitude: { value: 0.25, min: 0, max: 2, step: 0.05 },
    waveLength: { value: 3, min: 0, max: 20, step: 1 },
    speed: { value: 0.1, min: 0, max: 1, step: 0.05 },
  });

  const texture = useTexture("images/water.jpg");
  const { width, height } = texture.image;
  const scale = useAspect(width, height, 0.1);

  const plane = useRef();
  const uniforms = useRef({
    uTexture: { value: texture },
    uAmplitude: { value: amplitude },
    uWaveLength: { value: waveLength },
    uTime: { value: 0 },
  });

  useFrame(() => {
    plane.current.material.uniforms.uAmplitude.value = amplitude;
    plane.current.material.uniforms.uWaveLength.value = waveLength;
    plane.current.material.uniforms.uTime.value += speed / 2;
  });

  return (
    <mesh ref={plane} scale={scale}>
      <planeGeometry args={[3, 3, 30, 30]} />
      <shaderMaterial
        vertexShader={vertex}
        fragmentShader={fragment}
        uniforms={uniforms.current}
      />
    </mesh>
  );
}
