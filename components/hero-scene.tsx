"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useInView, usePrefersReducedMotion } from "./use-in-view";

/*
 * Dark-platinum planet, fully procedural (no textures to download):
 * graphite/platinum cloud bands, a lit day side with metallic sheen, cyan "data node"
 * lights on the night side, an atmospheric rim glow, a banded ring and a small moon.
 */

// Light comes from the upper left, towards the headline.
const LIGHT = new THREE.Vector3(-1.0, 0.55, 0.75).normalize();

const NOISE = /* glsl */ `
  float hash(vec3 p) {
    p = fract(p * 0.3183099 + 0.1);
    p *= 17.0;
    return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
  }
  float noise(vec3 x) {
    vec3 i = floor(x);
    vec3 f = fract(x);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(mix(hash(i), hash(i + vec3(1, 0, 0)), f.x), mix(hash(i + vec3(0, 1, 0)), hash(i + vec3(1, 1, 0)), f.x), f.y),
      mix(mix(hash(i + vec3(0, 0, 1)), hash(i + vec3(1, 0, 1)), f.x), mix(hash(i + vec3(0, 1, 1)), hash(i + vec3(1, 1, 1)), f.x), f.y),
      f.z);
  }
  float fbm(vec3 p) {
    float v = 0.0, a = 0.5;
    for (int i = 0; i < 6; i++) { v += a * noise(p); p = p * 2.03 + vec3(1.7, 9.2, 3.1); a *= 0.5; }
    return v;
  }
`;

const planetShader = {
  vertex: /* glsl */ `
    varying vec3 vPos;
    varying vec3 vN;
    varying vec3 vWorldPos;
    void main() {
      vPos = position;
      vN = normalize(mat3(modelMatrix) * normal);
      vec4 wp = modelMatrix * vec4(position, 1.0);
      vWorldPos = wp.xyz;
      gl_Position = projectionMatrix * viewMatrix * wp;
    }
  `,
  fragment: /* glsl */ `
    uniform float uTime;
    uniform vec3 uLight;
    varying vec3 vPos;
    varying vec3 vN;
    varying vec3 vWorldPos;
    ${NOISE}
    void main() {
      vec3 N = normalize(vN);
      vec3 V = normalize(cameraPosition - vWorldPos);
      vec3 p = normalize(vPos);

      // Gas-giant bands warped by noise, drifting slowly.
      float warp = fbm(p * vec3(1.6, 3.2, 1.6) + vec3(uTime * 0.015, 0.0, 0.0));
      float bands = sin(p.y * 15.0 + warp * 3.2) * 0.5 + 0.5;
      float fine = sin(p.y * 46.0 + warp * 6.0) * 0.5 + 0.5;
      float detail = fbm(p * vec3(6.0, 14.0, 6.0) + warp);
      float storms = smoothstep(0.66, 0.8, fbm(p * 3.5 + 7.3));

      vec3 graphite = vec3(0.055, 0.062, 0.078);
      vec3 steel    = vec3(0.23, 0.25, 0.29);
      vec3 platinum = vec3(0.66, 0.69, 0.74);
      vec3 pearl    = vec3(0.90, 0.92, 0.95);

      // Brushed-platinum banding: mostly steel→platinum, with thin graphite belts.
      vec3 col = mix(steel, platinum, smoothstep(0.15, 0.85, bands * 0.7 + detail * 0.45));
      col = mix(col, graphite, smoothstep(0.78, 0.98, 1.0 - bands) * 0.55);
      col *= 0.9 + (fine - 0.5) * 0.12;
      col = mix(col, pearl, storms * 0.28);
      col *= 0.88 + detail * 0.22;

      // Lighting: soft terminator + metallic sheen.
      float ndl = dot(N, uLight);
      float day = smoothstep(-0.18, 0.55, ndl);
      vec3 H = normalize(uLight + V);
      float spec = pow(max(dot(N, H), 0.0), 38.0) * 0.55 * day;
      vec3 lit = col * (0.04 + 1.05 * day) + spec * vec3(0.92, 0.95, 1.0);

      // Night side: sparse cyan data nodes, like city lights.
      float nodes = step(0.86, noise(p * 42.0)) * step(0.45, noise(p * 6.0 + 3.0));
      lit += nodes * (1.0 - smoothstep(-0.25, 0.05, ndl)) * vec3(0.20, 0.85, 1.0) * 0.9;

      // Atmospheric rim.
      float fres = pow(1.0 - max(dot(N, V), 0.0), 3.2);
      lit += fres * mix(vec3(0.25, 0.55, 0.85), vec3(0.85, 0.9, 1.0), day) * (0.35 + 0.9 * day);

      gl_FragColor = vec4(lit, 1.0);
    }
  `,
};

const atmosphereShader = {
  vertex: /* glsl */ `
    varying vec3 vN;
    varying vec3 vWorldPos;
    void main() {
      vN = normalize(mat3(modelMatrix) * normal);
      vec4 wp = modelMatrix * vec4(position, 1.0);
      vWorldPos = wp.xyz;
      gl_Position = projectionMatrix * viewMatrix * wp;
    }
  `,
  fragment: /* glsl */ `
    uniform vec3 uLight;
    varying vec3 vN;
    varying vec3 vWorldPos;
    void main() {
      vec3 V = normalize(cameraPosition - vWorldPos);
      float rim = pow(clamp(0.62 + dot(normalize(vN), V), 0.0, 1.0), 4.0);
      float sun = smoothstep(-0.4, 0.8, dot(normalize(vN), uLight));
      vec3 c = mix(vec3(0.12, 0.35, 0.75), vec3(0.75, 0.85, 1.0), sun);
      gl_FragColor = vec4(c, rim * (0.25 + 0.75 * sun));
    }
  `,
};

const ringShader = {
  vertex: /* glsl */ `
    varying float vR;
    varying vec3 vWorldPos;
    void main() {
      vR = length(position.xy);
      vec4 wp = modelMatrix * vec4(position, 1.0);
      vWorldPos = wp.xyz;
      gl_Position = projectionMatrix * viewMatrix * wp;
    }
  `,
  fragment: /* glsl */ `
    uniform float uInner;
    uniform float uOuter;
    uniform vec3 uLight;
    varying float vR;
    varying vec3 vWorldPos;
    ${NOISE}
    void main() {
      float t = (vR - uInner) / (uOuter - uInner);
      float bands = noise(vec3(t * 38.0, 0.0, 0.0)) * 0.6 + noise(vec3(t * 140.0, 3.0, 0.0)) * 0.4;
      float gap = smoothstep(0.52, 0.55, t) * (1.0 - smoothstep(0.58, 0.61, t)); // Cassini-style gap
      float edge = smoothstep(0.0, 0.06, t) * (1.0 - smoothstep(0.9, 1.0, t));
      float alpha = edge * (0.25 + 0.6 * bands) * (1.0 - gap * 0.9);
      // The planet's shadow falls across the part of the ring behind it.
      float along = dot(vWorldPos, -uLight);
      float dist = length(vWorldPos + uLight * along);
      float shadow = (along > 0.0 && dist < 1.0) ? 0.25 : 1.0;
      vec3 col = mix(vec3(0.42, 0.45, 0.52), vec3(0.88, 0.9, 0.94), bands) * shadow;
      gl_FragColor = vec4(col, alpha * 0.85);
    }
  `,
};

function Planet({ still }: { still: boolean }) {
  const group = useRef<THREE.Group>(null);
  const planet = useRef<THREE.Mesh>(null);
  const moon = useRef<THREE.Mesh>(null);

  const uniforms = useMemo(() => ({ uTime: { value: 0 }, uLight: { value: LIGHT } }), []);
  const atmoUniforms = useMemo(() => ({ uLight: { value: LIGHT } }), []);
  const ringUniforms = useMemo(() => ({ uInner: { value: 1.45 }, uOuter: { value: 2.45 }, uLight: { value: LIGHT } }), []);

  useFrame(({ clock, pointer }, delta) => {
    const t = clock.elapsedTime;
    if (!still) uniforms.uTime.value = t;
    if (group.current) {
      const k = Math.min(1, delta * 1.5);
      group.current.rotation.y += (pointer.x * 0.25 - group.current.rotation.y) * k;
      group.current.rotation.x += (-pointer.y * 0.15 - group.current.rotation.x) * k;
    }
    if (planet.current && !still) planet.current.rotation.y = t * 0.05;
    if (moon.current) {
      const a = still ? 2.2 : t * 0.22 + 2.2;
      moon.current.position.set(Math.cos(a) * 2.65, Math.sin(a) * 0.5, Math.sin(a) * 2.65);
    }
  });

  return (
    <group ref={group}>
      <group rotation={[0.18, 0, -0.32]}>
        <mesh ref={planet}>
          <sphereGeometry args={[1, 128, 128]} />
          <shaderMaterial vertexShader={planetShader.vertex} fragmentShader={planetShader.fragment} uniforms={uniforms} toneMapped={false} />
        </mesh>
        <mesh scale={1.18}>
          <sphereGeometry args={[1, 64, 64]} />
          <shaderMaterial
            vertexShader={atmosphereShader.vertex}
            fragmentShader={atmosphereShader.fragment}
            uniforms={atmoUniforms}
            transparent
            depthWrite={false}
            side={THREE.BackSide}
            blending={THREE.AdditiveBlending}
            toneMapped={false}
          />
        </mesh>
        <mesh rotation={[Math.PI / 2 - 0.28, 0, 0]}>
          <ringGeometry args={[1.45, 2.45, 256, 1]} />
          <shaderMaterial
            vertexShader={ringShader.vertex}
            fragmentShader={ringShader.fragment}
            uniforms={ringUniforms}
            transparent
            depthWrite={false}
            side={THREE.DoubleSide}
            toneMapped={false}
          />
        </mesh>
      </group>
      <mesh ref={moon}>
        <sphereGeometry args={[0.11, 48, 48]} />
        <meshStandardMaterial color="#c9ced8" roughness={0.55} metalness={0.6} />
      </mesh>
    </group>
  );
}

function Stars({ still }: { still: boolean }) {
  const ref = useRef<THREE.Points>(null);
  const geo = useMemo(() => {
    const n = 1600;
    const pos = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      const r = 5 + Math.random() * 9;
      const th = Math.random() * Math.PI * 2;
      const ph = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(ph) * Math.cos(th);
      pos[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th);
      pos[i * 3 + 2] = r * Math.cos(ph) - 4;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return g;
  }, []);
  useFrame((_, d) => {
    if (ref.current && !still) ref.current.rotation.y += d * 0.008;
  });
  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial color="#dfe6f2" size={0.035} sizeAttenuation transparent opacity={0.7} depthWrite={false} />
    </points>
  );
}

export default function HeroScene() {
  const wrap = useRef<HTMLDivElement>(null);
  const inView = useInView(wrap);
  const still = usePrefersReducedMotion();
  return (
    <div ref={wrap} className="hero-3d" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 38 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        frameloop={inView ? "always" : "never"}
        eventSource={document.body}
        eventPrefix="client"
      >
        <ambientLight intensity={0.08} />
        <directionalLight position={LIGHT.clone().multiplyScalar(10).toArray()} intensity={2.4} color="#ffffff" />
        <Stars still={still} />
        <Planet still={still} />
      </Canvas>
    </div>
  );
}
