"use client";
import { useScroll } from "framer-motion";
import dynamic from "next/dynamic";
import { useRef } from "react";

const Scene = dynamic(() => import("@/components/Scene"), {
  ssr: false,
});

export default function Home() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <main>
      <div ref={container} className="h-[300vh]">
        <div className="h-screen sticky top-0">
          <Scene scrollProgress={scrollYProgress} />
        </div>
      </div>
      <div className="h-screen"></div>
    </main>
  );
}
