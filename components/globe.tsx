"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Line, OrbitControls } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useInView, usePrefersReducedMotion } from "./use-in-view";

const R = 2;

function latLon(lat: number, lon: number, r = R) {
  const phi = ((90 - lat) * Math.PI) / 180;
  const theta = ((lon + 180) * Math.PI) / 180;
  return new THREE.Vector3(-r * Math.sin(phi) * Math.cos(theta), r * Math.cos(phi), r * Math.sin(phi) * Math.sin(theta));
}

const HQ = { lat: 16.84, lon: 96.17 }; // Yangon
const CITIES = [
  { lat: 1.35, lon: 103.82 }, // Singapore
  { lat: 13.75, lon: 100.5 }, // Bangkok
  { lat: 35.68, lon: 139.69 }, // Tokyo
  { lat: -33.87, lon: 151.21 }, // Sydney
  { lat: 51.5, lon: -0.12 }, // London
  { lat: 25.2, lon: 55.27 }, // Dubai
  { lat: 40.71, lon: -74.0 }, // New York
];

function Dots() {
  const geo = useMemo(() => {
    const n = 2600;
    const pos = new Float32Array(n * 3);
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < n; i++) {
      const y = 1 - (i / (n - 1)) * 2;
      const rad = Math.sqrt(1 - y * y);
      const th = golden * i;
      pos[i * 3] = Math.cos(th) * rad * R;
      pos[i * 3 + 1] = y * R;
      pos[i * 3 + 2] = Math.sin(th) * rad * R;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return g;
  }, []);
  return (
    <points geometry={geo}>
      <pointsMaterial color="#7dd3fc" size={0.045} sizeAttenuation transparent opacity={0.9} depthWrite={false} />
    </points>
  );
}

function Arc({ to, delay, still }: { to: { lat: number; lon: number }; delay: number; still: boolean }) {
  const { points, curve } = useMemo(() => {
    const a = latLon(HQ.lat, HQ.lon);
    const b = latLon(to.lat, to.lon);
    const mid = a.clone().add(b).normalize().multiplyScalar(R * (1 + a.distanceTo(b) * 0.22));
    const c = new THREE.QuadraticBezierCurve3(a, mid, b);
    return { curve: c, points: c.getPoints(64) };
  }, [to]);
  const pulse = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!pulse.current) return;
    const t = still ? 0.5 : ((clock.elapsedTime * 0.35 + delay) % 1.4) / 1.4;
    pulse.current.position.copy(curve.getPoint(Math.min(t, 1)));
    pulse.current.visible = t <= 1;
  });
  return (
    <group>
      <Line points={points} color="#22d3ee" lineWidth={1.4} transparent opacity={0.55} />
      <mesh ref={pulse}>
        <sphereGeometry args={[0.035, 12, 12]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      <mesh position={latLon(to.lat, to.lon, R * 1.005)}>
        <sphereGeometry args={[0.03, 10, 10]} />
        <meshBasicMaterial color="#a78bfa" />
      </mesh>
    </group>
  );
}

function HQMarker({ still }: { still: boolean }) {
  const ring = useRef<THREE.Mesh>(null);
  const pos = useMemo(() => latLon(HQ.lat, HQ.lon, R * 1.01), []);
  const quat = useMemo(() => new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), pos.clone().normalize()), [pos]);
  useFrame(({ clock }) => {
    if (!ring.current) return;
    const t = still ? 0.4 : (clock.elapsedTime * 0.8) % 1;
    ring.current.scale.setScalar(1 + t * 3);
    (ring.current.material as THREE.MeshBasicMaterial).opacity = 1 - t;
  });
  return (
    <group position={pos} quaternion={quat}>
      <mesh>
        <circleGeometry args={[0.06, 24]} />
        <meshBasicMaterial color="#22d3ee" />
      </mesh>
      <mesh ref={ring}>
        <ringGeometry args={[0.07, 0.09, 32]} />
        <meshBasicMaterial color="#22d3ee" transparent side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

function World({ still }: { still: boolean }) {
  // Turn the globe so Yangon faces the camera on first paint.
  const startY = useMemo(() => {
    const v = latLon(HQ.lat, HQ.lon);
    return -Math.atan2(v.x, v.z);
  }, []);
  return (
    <group rotation={[0.28, startY, 0]}>
      <mesh>
        <sphereGeometry args={[R * 0.985, 64, 64]} />
        <meshBasicMaterial color="#061226" transparent opacity={0.85} />
      </mesh>
      <mesh scale={1.12}>
        <sphereGeometry args={[R, 48, 48]} />
        <meshBasicMaterial color="#1d4ed8" transparent opacity={0.08} side={THREE.BackSide} />
      </mesh>
      <Dots />
      <HQMarker still={still} />
      {CITIES.map((c, i) => (
        <Arc key={i} to={c} delay={i * 0.2} still={still} />
      ))}
    </group>
  );
}

export default function Globe() {
  const wrap = useRef<HTMLDivElement>(null);
  const inView = useInView(wrap);
  const still = usePrefersReducedMotion();
  // Touch screens keep native scrolling over the globe; only mouse users can drag it.
  const canDrag = useMemo(() => matchMedia("(pointer: fine)").matches, []);
  return (
    <div ref={wrap} className="globe" role="img" aria-label="Rotating globe showing XynoTech in Yangon connected to clients worldwide">
      <Canvas camera={{ position: [0, 0, 6.2], fov: 42 }} dpr={[1, 1.75]} gl={{ antialias: true, alpha: true }} frameloop={inView ? "always" : "never"}>
        <World still={still} />
        <OrbitControls enableZoom={false} enablePan={false} enableRotate={canDrag} autoRotate={!still} autoRotateSpeed={0.6} rotateSpeed={0.5} enableDamping />
      </Canvas>
    </div>
  );
}
