"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group } from "three";

/**
 * A stylised microcontroller development board built from primitives.
 *
 * This is the stand-in shown until a real GLB is added for a component. It is
 * a few kilobytes of geometry rather than a multi-megabyte download, and it
 * still gives students something they can rotate and inspect: PCB, chip,
 * pin headers, USB port and status LEDs.
 */
export function ProceduralBoard() {
  const group = useRef<Group>(null);

  // Header pin positions, computed once.
  const pins = useMemo(() => {
    const positions: Array<[number, number, number]> = [];
    const count = 14;
    for (let i = 0; i < count; i++) {
      const x = -1.63 + (i * 3.26) / (count - 1);
      positions.push([x, 0.11, -0.92]);
      positions.push([x, 0.11, 0.92]);
    }
    return positions;
  }, []);

  // Surface-mount detail scattered across the board.
  const smd = useMemo(
    () =>
      [
        [-1.1, 0.09, -0.35],
        [-0.85, 0.09, -0.5],
        [-0.6, 0.09, -0.3],
        [0.75, 0.09, 0.45],
        [1.0, 0.09, 0.3],
        [1.2, 0.09, 0.5],
        [-0.2, 0.09, 0.6],
      ] as Array<[number, number, number]>,
    [],
  );

  useFrame((state) => {
    if (!group.current) return;
    // A gentle bob so the board feels alive even while auto-rotating.
    group.current.position.y =
      Math.sin(state.clock.elapsedTime * 0.8) * 0.04;
  });

  return (
    <group ref={group}>
      {/* PCB substrate */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[3.6, 0.16, 2.2]} />
        <meshStandardMaterial color="#0f5132" roughness={0.55} metalness={0.15} />
      </mesh>

      {/* Solder-mask top face, slightly brighter than the substrate */}
      <mesh position={[0, 0.085, 0]}>
        <boxGeometry args={[3.58, 0.02, 2.18]} />
        <meshStandardMaterial color="#14803f" roughness={0.4} metalness={0.25} />
      </mesh>

      {/* Main SoC / shield can */}
      <mesh position={[-0.35, 0.19, 0]} castShadow>
        <boxGeometry args={[1.25, 0.22, 1.0]} />
        <meshStandardMaterial color="#c8ccd4" roughness={0.28} metalness={0.9} />
      </mesh>

      {/* Antenna trace area */}
      <mesh position={[1.25, 0.11, 0]}>
        <boxGeometry args={[0.7, 0.03, 0.85]} />
        <meshStandardMaterial color="#0b6b34" roughness={0.5} metalness={0.3} />
      </mesh>

      {/* USB connector */}
      <mesh position={[-1.72, 0.19, 0]} castShadow>
        <boxGeometry args={[0.36, 0.2, 0.68]} />
        <meshStandardMaterial color="#b8bec9" roughness={0.25} metalness={0.95} />
      </mesh>

      {/* Gold pin headers */}
      {pins.map((position, i) => (
        <mesh key={i} position={position} castShadow>
          <boxGeometry args={[0.075, 0.16, 0.075]} />
          <meshStandardMaterial
            color="#e2b04a"
            roughness={0.22}
            metalness={1}
          />
        </mesh>
      ))}

      {/* Black header strips under the pins */}
      {[-0.92, 0.92].map((z) => (
        <mesh key={z} position={[0, 0.06, z]}>
          <boxGeometry args={[3.4, 0.08, 0.16]} />
          <meshStandardMaterial color="#15181f" roughness={0.8} />
        </mesh>
      ))}

      {/* Passive components */}
      {smd.map((position, i) => (
        <mesh key={i} position={position}>
          <boxGeometry args={[0.14, 0.05, 0.08]} />
          <meshStandardMaterial
            color={i % 3 === 0 ? "#2b2f38" : "#8d6b3f"}
            roughness={0.6}
          />
        </mesh>
      ))}

      {/* Status LEDs — emissive so they read as powered */}
      <mesh position={[0.35, 0.11, -0.72]}>
        <boxGeometry args={[0.1, 0.05, 0.07]} />
        <meshStandardMaterial
          color="#4ade80"
          emissive="#4ade80"
          emissiveIntensity={2.4}
        />
      </mesh>
      <mesh position={[0.55, 0.11, -0.72]}>
        <boxGeometry args={[0.1, 0.05, 0.07]} />
        <meshStandardMaterial
          color="#38bdf8"
          emissive="#38bdf8"
          emissiveIntensity={1.8}
        />
      </mesh>

      {/* Reset / boot buttons */}
      {[-1.15, -0.75].map((x) => (
        <mesh key={x} position={[x, 0.15, 0.78]}>
          <cylinderGeometry args={[0.075, 0.075, 0.1, 16]} />
          <meshStandardMaterial color="#d6dae2" roughness={0.35} metalness={0.6} />
        </mesh>
      ))}

      {/* Mounting holes */}
      {[
        [-1.65, 0, -0.95],
        [1.65, 0, -0.95],
        [-1.65, 0, 0.95],
        [1.65, 0, 0.95],
      ].map((position, i) => (
        <mesh
          key={i}
          position={position as [number, number, number]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <torusGeometry args={[0.09, 0.03, 8, 20]} />
          <meshStandardMaterial color="#e2b04a" metalness={1} roughness={0.3} />
        </mesh>
      ))}
    </group>
  );
}
