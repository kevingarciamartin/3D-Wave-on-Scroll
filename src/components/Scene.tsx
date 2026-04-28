import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import Model from "./Model";

export default function Scene() {
  return (
    <Canvas>
      <Suspense>
        <Model />
      </Suspense>
    </Canvas>
  );
}
