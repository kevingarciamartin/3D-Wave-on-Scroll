import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import Model from "./Model";
import { MotionValue } from "framer-motion";

export default function Scene({
  scrollProgress,
}: {
  scrollProgress: MotionValue<number>;
}) {
  return (
    <Canvas>
      <Suspense>
        <Model scrollProgress={scrollProgress} />
      </Suspense>
    </Canvas>
  );
}
