"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer, AdaptiveDpr } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { useRef, type RefObject } from "react";
import * as THREE from "three";

/* easing helpers */
const clamp01 = (x: number) => Math.min(1, Math.max(0, x));
const seg = (p: number, a: number, b: number) => clamp01((p - a) / (b - a));
const easeInOut = (x: number) =>
  x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;

const COLORS = {
  bg: "#e7dcc8",
  wood: "#c2a479",
  woodDark: "#a8855a",
  cushion: "#3d6b4f",
  plate: "#f1ece3",
  gold: "#c2a05a",
  metal: "#2c2c2e",
  shade: "#fbf6ec",
};

/* ----------------------------- Furniture ----------------------------- */

function Table() {
  return (
    <group>
      <mesh position={[0, 0.74, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.75, 0.05, 0.98]} />
        <meshStandardMaterial color={COLORS.wood} roughness={0.5} metalness={0.05} />
      </mesh>
      <mesh position={[0, 0.69, 0]} castShadow>
        <boxGeometry args={[1.6, 0.06, 0.84]} />
        <meshStandardMaterial color={COLORS.woodDark} roughness={0.6} />
      </mesh>
      {[
        [0.79, -0.42],
        [-0.79, -0.42],
        [0.79, 0.42],
        [-0.79, 0.42],
      ].map(([x, z], i) => (
        <mesh key={i} position={[x, 0.355, z]} castShadow>
          <boxGeometry args={[0.07, 0.71, 0.07]} />
          <meshStandardMaterial color={COLORS.woodDark} roughness={0.55} />
        </mesh>
      ))}
    </group>
  );
}

function Chair({ groupRef }: { groupRef: RefObject<THREE.Group | null> }) {
  const seatH = 0.46;
  const legXY = 0.2;
  return (
    <group ref={groupRef} position={[0.5, 0, 1.95]} rotation={[0, Math.PI + 0.7, 0]}>
      <mesh position={[0, seatH, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.46, 0.05, 0.46]} />
        <meshStandardMaterial color={COLORS.wood} roughness={0.5} />
      </mesh>
      <mesh position={[0, seatH + 0.045, 0]} castShadow>
        <boxGeometry args={[0.42, 0.05, 0.42]} />
        <meshStandardMaterial color={COLORS.cushion} roughness={0.8} />
      </mesh>
      <group position={[0, seatH + 0.02, -0.205]} rotation={[-0.1, 0, 0]}>
        <mesh position={[0, 0.27, 0]} castShadow>
          <boxGeometry args={[0.46, 0.54, 0.05]} />
          <meshStandardMaterial color={COLORS.wood} roughness={0.5} />
        </mesh>
        <mesh position={[0, 0.27, 0.03]} castShadow>
          <boxGeometry args={[0.4, 0.46, 0.04]} />
          <meshStandardMaterial color={COLORS.cushion} roughness={0.8} />
        </mesh>
      </group>
      {[
        [legXY, legXY],
        [-legXY, legXY],
        [legXY, -legXY],
        [-legXY, -legXY],
      ].map(([x, z], i) => (
        <mesh key={i} position={[x, seatH / 2, z]} castShadow>
          <boxGeometry args={[0.05, seatH, 0.05]} />
          <meshStandardMaterial color={COLORS.woodDark} roughness={0.55} />
        </mesh>
      ))}
    </group>
  );
}

function PlaceSetting({ z }: { z: number }) {
  return (
    <group position={[0, 0.768, z]}>
      <mesh receiveShadow castShadow>
        <cylinderGeometry args={[0.16, 0.15, 0.014, 40]} />
        <meshStandardMaterial color={COLORS.gold} roughness={0.35} metalness={0.5} />
      </mesh>
      <mesh position={[0, 0.012, 0]} receiveShadow castShadow>
        <cylinderGeometry args={[0.135, 0.12, 0.016, 40]} />
        <meshStandardMaterial color={COLORS.plate} roughness={0.55} />
      </mesh>
      <mesh position={[-0.2, 0.006, 0]} castShadow>
        <boxGeometry args={[0.012, 0.004, 0.16]} />
        <meshStandardMaterial color="#c9ccd0" roughness={0.3} metalness={0.85} />
      </mesh>
      <mesh position={[0.2, 0.006, 0]} castShadow>
        <boxGeometry args={[0.014, 0.004, 0.16]} />
        <meshStandardMaterial color="#c9ccd0" roughness={0.3} metalness={0.85} />
      </mesh>
      {/* cheap stylised glass (no transmission, for performance) */}
      <mesh position={[0.27, 0.09, -0.02]}>
        <cylinderGeometry args={[0.035, 0.028, 0.13, 16]} />
        <meshStandardMaterial color="#dfe7e6" roughness={0.08} metalness={0.1} transparent opacity={0.35} />
      </mesh>
    </group>
  );
}

/* Modern "mushroom" lamp that switches on as you scroll */
function Lamp({
  progress,
  reduced,
}: {
  progress: RefObject<number>;
  reduced: boolean;
}) {
  const shadeMat = useRef<THREE.MeshStandardMaterial>(null);
  const bulbMat = useRef<THREE.MeshStandardMaterial>(null);
  const light = useRef<THREE.PointLight>(null);

  useFrame(() => {
    const raw = reduced ? 0.62 : progress.current ?? 0;
    const onRamp = easeInOut(seg(raw, 0.12, 0.46));
    // ease the lamp back to a calmer glow for the seated close-up so it doesn't
    // blow out the frame when the camera is right next to it.
    const settle = easeInOut(seg(raw, 0.78, 1.0));
    const on = onRamp * (1 - 0.4 * settle);
    if (shadeMat.current) shadeMat.current.emissiveIntensity = 0.05 + on * 0.6;
    if (bulbMat.current) bulbMat.current.emissiveIntensity = on * 0.9;
    if (light.current) light.current.intensity = on * 1.8;
  });

  return (
    <group position={[0, 0.766, 0]}>
      {/* base */}
      <mesh castShadow>
        <cylinderGeometry args={[0.07, 0.085, 0.025, 32]} />
        <meshStandardMaterial color={COLORS.metal} roughness={0.4} metalness={0.7} />
      </mesh>
      {/* stem */}
      <mesh position={[0, 0.09, 0]} castShadow>
        <cylinderGeometry args={[0.018, 0.02, 0.17, 20]} />
        <meshStandardMaterial color={COLORS.metal} roughness={0.4} metalness={0.7} />
      </mesh>
      {/* bulb */}
      <mesh position={[0, 0.2, 0]}>
        <sphereGeometry args={[0.05, 20, 20]} />
        <meshStandardMaterial
          ref={bulbMat}
          color="#fff3da"
          emissive="#ffd9a0"
          emissiveIntensity={0}
        />
      </mesh>
      {/* dome shade */}
      <mesh position={[0, 0.21, 0]} castShadow>
        <sphereGeometry args={[0.11, 32, 24, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial
          ref={shadeMat}
          color={COLORS.shade}
          emissive="#ffe9c4"
          emissiveIntensity={0.05}
          roughness={0.5}
          side={THREE.DoubleSide}
        />
      </mesh>
      <pointLight ref={light} position={[0, 0.18, 0]} color="#ffe2b0" intensity={0} distance={3.5} decay={2} />
    </group>
  );
}

/* ----------------------------- Scene ----------------------------- */

function Experience({
  progress,
  reduced,
}: {
  progress: RefObject<number>;
  reduced: boolean;
}) {
  const chair = useRef<THREE.Group>(null);
  const { camera } = useThree();

  useFrame((_, dt) => {
    const d = Math.min(dt, 0.05);
    const raw = reduced ? 0.62 : progress.current ?? 0;
    const p = clamp01(raw);

    // chair: starts pulled away + turned, then slides IN and squares up to the
    // table while rotating on Y — "taking a place" -> "seated at the table".
    if (chair.current) {
      const cp = easeInOut(seg(p, 0.08, 0.62));
      const z = THREE.MathUtils.lerp(1.95, 0.72, cp);
      const x = THREE.MathUtils.lerp(0.5, 0.12, cp);
      const rot = THREE.MathUtils.lerp(Math.PI + 0.7, Math.PI, cp);
      chair.current.position.z = THREE.MathUtils.damp(chair.current.position.z, z, 8, d);
      chair.current.position.x = THREE.MathUtils.damp(chair.current.position.x, x, 8, d);
      chair.current.rotation.y = THREE.MathUtils.damp(chair.current.rotation.y, rot, 8, d);
    }

    // camera: aggressive wide orbit that resolves into a first-person seated
    // POV at the chair, looking out across the table.
    const op = easeInOut(seg(p, 0.0, 0.7));
    const sit = easeInOut(seg(p, 0.68, 1.0));

    // orbit phase
    const angle = THREE.MathUtils.lerp(-0.6, 1.1, op);
    const radius = THREE.MathUtils.lerp(5.2, 4.0, op);
    const orbX = Math.sin(angle) * radius;
    const orbY = THREE.MathUtils.lerp(2.4, 1.7, op);
    const orbZ = Math.cos(angle) * radius;

    // "your seat at the table" — settle just behind & above the chair, looking
    // down over the backrest at the whole set table. Keeps the bright plate/lamp
    // small in frame so the composition stays clear instead of washing out.
    const camX = THREE.MathUtils.lerp(orbX, 0.1, sit);
    const camY = THREE.MathUtils.lerp(orbY, 1.5, sit);
    const camZ = THREE.MathUtils.lerp(orbZ, 1.95, sit);
    camera.position.x = THREE.MathUtils.damp(camera.position.x, camX, 5, d);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, camY, 5, d);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, camZ, 5, d);

    const lookY = THREE.MathUtils.lerp(0.72, 0.82, sit);
    const lookZ = THREE.MathUtils.lerp(0, -0.02, sit);
    camera.lookAt(0, lookY, lookZ);
  });

  return (
    <group>
      {/* bright, airy daylight */}
      <hemisphereLight args={["#ffffff", "#d8ccb8", 1.05]} />
      <ambientLight intensity={0.16} color="#fff3e0" />
      <directionalLight
        position={[3.2, 5, 2.4]}
        intensity={2.2}
        color="#fff4e2"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0004}
        shadow-camera-near={0.5}
        shadow-camera-far={16}
        shadow-camera-left={-4}
        shadow-camera-right={4}
        shadow-camera-top={4}
        shadow-camera-bottom={-4}
      />
      <pointLight position={[-3, 2, 1.5]} intensity={4} color="#ffffff" distance={12} decay={2} />

      {/* in-engine reflections, no network HDRI */}
      <Environment resolution={128}>
        <Lightformer intensity={2.4} color="#ffffff" position={[0, 4, 2]} scale={[6, 6, 1]} />
        <Lightformer intensity={1.2} color="#fff0d8" position={[-4, 2, -2]} scale={[4, 4, 1]} />
        <Lightformer intensity={1.4} color="#ffffff" position={[3, 2.5, -3]} scale={[3, 3, 1]} />
      </Environment>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial color="#b8a888" roughness={1} />
      </mesh>
      <ContactShadows position={[0, 0.002, 0]} opacity={0.52} scale={9} blur={2.6} far={3.5} color="#4a3b29" />

      <Table />
      <PlaceSetting z={0.26} />
      <PlaceSetting z={-0.26} />
      <Lamp progress={progress} reduced={reduced} />
      <Chair groupRef={chair} />

      <EffectComposer>
        <Bloom intensity={0.18} luminanceThreshold={1} luminanceSmoothing={0.4} mipmapBlur />
        <Vignette offset={0.4} darkness={0.32} eskil={false} />
      </EffectComposer>
    </group>
  );
}

export default function DinnerScene({
  progress,
  reduced,
  active,
}: {
  progress: RefObject<number>;
  reduced: boolean;
  active: boolean;
}) {
  return (
    <Canvas
      shadows
      dpr={[1, 1.7]}
      frameloop={active ? "always" : "never"}
      performance={{ min: 0.5 }}
      camera={{ position: [-1.95, 2.3, 4.5], fov: 38 }}
      gl={{ antialias: true, powerPreference: "high-performance" }}
    >
      <color attach="background" args={[COLORS.bg]} />
      <fog attach="fog" args={[COLORS.bg, 9, 22]} />
      <Experience progress={progress} reduced={reduced} />
      <AdaptiveDpr pixelated />
    </Canvas>
  );
}
