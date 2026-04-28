import { useAspect, useTexture } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { transform } from "framer-motion";
import { useControls } from "leva";
import { useRef } from "react";
import * as THREE from "three";
import { fragment, vertex } from "./shader";

export default function Model({ scrollProgress }) {
  const { amplitude, waveLength, speed } = useControls({
    amplitude: { value: 0.25, min: 0, max: 2, step: 0.05 },
    waveLength: { value: 3, min: 0, max: 20, step: 1 },
    speed: { value: 0.1, min: 0, max: 1, step: 0.05 },
  });
  const texture = useTexture("images/monet.jpg");
  const { width, height } = texture.image;
  const scale = useAspect(width, height, 0.3);
  const { viewport } = useThree();

  const image = useRef();
  const uniforms = useRef({
    uvUvScale: { value: new THREE.Vector2(0, 0) },
    uTexture: { value: texture },
    uAmplitude: { value: amplitude },
    uWaveLength: { value: waveLength },
    uTime: { value: 0 },
  });

  useFrame(() => {
    // Scale image based on progress of the scroll
    const scaleX = transform(
      scrollProgress.get(),
      [0, 1],
      [scale[0], viewport.width]
    );
    const scaleY = transform(
      scrollProgress.get(),
      [0, 1],
      [scale[1], viewport.height]
    );
    image.current.scale.x = scaleX;
    image.current.scale.y = scaleY;

    // Adjust texture to new scale (object-fit: cover)
    const meshRatio = scaleX / scaleY;
    const textureRatio = width / height;
    const uvScaleX = meshRatio > textureRatio ? 1 : meshRatio / textureRatio;
    const uvScaleY = meshRatio > textureRatio ? textureRatio / meshRatio : 1;
    image.current.material.uniforms.uvUvScale.value.set(uvScaleX, uvScaleY);

    // Animate wave based on progress of the scroll
    const modifiedAmplitude = transform(
      scrollProgress.get(),
      [0, 1],
      [amplitude, 0]
    );
    image.current.material.uniforms.uAmplitude.value = modifiedAmplitude;
    image.current.material.uniforms.uWaveLength.value = waveLength;
    image.current.material.uniforms.uTime.value += speed / 2;
  });

  return (
    <mesh ref={image} scale={scale}>
      <planeGeometry args={[1, 1, 45, 45]} />
      <shaderMaterial
        vertexShader={vertex}
        fragmentShader={fragment}
        uniforms={uniforms.current}
      />
    </mesh>
  );
}
