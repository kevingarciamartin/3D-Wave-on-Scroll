import React from "react";

export default function Model() {
  return (
    <mesh>
      <planeGeometry args={[3, 3, 15, 15]} />
      <meshBasicMaterial color={"red"} wireframe={true} />
    </mesh>
  );
}
