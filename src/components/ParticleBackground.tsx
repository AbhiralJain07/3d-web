"use client";
import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

function InteractivePoints() {
  const count = 3000;
  const mesh = useRef<THREE.Points>(null!);
  const { mouse, viewport } = useThree();

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const color1 = new THREE.Color("#c9a85c"); // Gold
    const color2 = new THREE.Color("#0e0e18"); // Deep

    for (let i = 0; i < count; i++) {
      const theta = THREE.MathUtils.randFloatSpread(360);
      const phi = THREE.MathUtils.randFloatSpread(360);
      
      const r = 10 + Math.random() * 5;
      pos[i * 3] = r * Math.sin(theta) * Math.cos(phi);
      pos[i * 3 + 1] = r * Math.sin(theta) * Math.sin(phi);
      pos[i * 3 + 2] = r * Math.cos(theta);

      const mixedColor = color1.clone().lerp(color2, Math.random() * 0.8);
      col[i * 3] = mixedColor.r;
      col[i * 3 + 1] = mixedColor.g;
      col[i * 3 + 2] = mixedColor.b;
    }
    return [pos, col];
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    mesh.current.rotation.y = time * 0.05;
    mesh.current.rotation.x = time * 0.02;

    // Subtle mouse follow
    mesh.current.position.x += (mouse.x * (viewport.width / 2) * 0.1 - mesh.current.position.x) * 0.05;
    mesh.current.position.y += (mouse.y * (viewport.height / 2) * 0.1 - mesh.current.position.y) * 0.05;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        vertexColors
        transparent
        opacity={0.4}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function FloatingLights() {
  return (
    <>
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#c9a85c" />
      <pointLight position={[-10, -10, -10]} intensity={1} color="#4dd9ff" />
      <ambientLight intensity={0.2} />
    </>
  );
}

export default function ParticleBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
      <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
        <FloatingLights />
        <InteractivePoints />
      </Canvas>
    </div>
  );
}
