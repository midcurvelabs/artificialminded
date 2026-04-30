"use client";

import { Canvas, useFrame, useThree, extend } from "@react-three/fiber";
import { shaderMaterial, useGLTF } from "@react-three/drei";
import { useRef, useMemo, Suspense } from "react";
import * as THREE from "three";

const BRAIN_URL = "/brain.glb";
useGLTF.preload(BRAIN_URL);

/* ───────────────────────────────────────────────
 * Custom matte+fresnel shader for the brain shell.
 * Black body, sharp white rim, illuminated locally
 * by a high-intensity point light at the cursor.
 * ─────────────────────────────────────────────── */
const BrainMaterial = shaderMaterial(
  {
    uTime: 0,
    uLightPos: new THREE.Vector3(0, 0, 4),
    uLightColor: new THREE.Color("#ffffff"),
    uLightIntensity: 6.0,
    uLightRadius: 2.4,
    uRimPower: 2.6,
    uRimStrength: 1.0,
    uPulse: 0.0,
  },
  /* glsl */ `
    varying vec3 vWorldPos;
    varying vec3 vNormal;
    varying vec3 vViewDir;

    uniform float uTime;

    // Light organic breathing displacement.
    float hash(vec3 p) {
      return fract(sin(dot(p, vec3(127.1, 311.7, 74.7))) * 43758.5453);
    }

    void main() {
      vec3 pos = position;
      float n = sin(pos.y * 4.0 + uTime * 0.6) * 0.012
              + cos(pos.x * 5.0 + uTime * 0.5) * 0.010
              + sin(pos.z * 3.5 + uTime * 0.7) * 0.014;
      pos += normal * n;

      vec4 worldPos = modelMatrix * vec4(pos, 1.0);
      vWorldPos = worldPos.xyz;
      vNormal = normalize(mat3(modelMatrix) * normal);
      vViewDir = normalize(cameraPosition - worldPos.xyz);

      gl_Position = projectionMatrix * viewMatrix * worldPos;
    }
  `,
  /* glsl */ `
    varying vec3 vWorldPos;
    varying vec3 vNormal;
    varying vec3 vViewDir;

    uniform vec3  uLightPos;
    uniform vec3  uLightColor;
    uniform float uLightIntensity;
    uniform float uLightRadius;
    uniform float uRimPower;
    uniform float uRimStrength;
    uniform float uPulse;

    void main() {
      // Deep matte obsidian base.
      vec3 base = vec3(0.015, 0.015, 0.018);

      // Fresnel rim (Schlick-ish).
      float fres = pow(1.0 - max(dot(vNormal, vViewDir), 0.0), uRimPower);

      // Cursor point light: distance falloff, normal-aware.
      vec3  toLight  = uLightPos - vWorldPos;
      float dist     = length(toLight);
      vec3  L        = toLight / max(dist, 0.0001);
      float ndl      = clamp(dot(vNormal, L), 0.0, 1.0);
      float falloff  = pow(clamp(1.0 - dist / uLightRadius, 0.0, 1.0), 2.0);
      vec3  cursor   = uLightColor * uLightIntensity * ndl * falloff;

      // Neural pulse: a thin emissive band sweeping across world Y.
      float band = smoothstep(0.06, 0.0, abs(vWorldPos.y - (uPulse * 2.0 - 1.0)));
      vec3  pulse = vec3(1.0) * band * 0.85;

      vec3 col = base + cursor + uRimStrength * fres * vec3(1.0) + pulse;
      gl_FragColor = vec4(col, 1.0);
    }
  `
);
extend({ BrainMaterial });

/* Pull the first BufferGeometry out of the loaded GLB scene,
 * center it, and rescale so its bounding sphere fits radius 1. */
function useNormalizedBrainGeometry() {
  const { scene } = useGLTF(BRAIN_URL) as unknown as {
    scene: THREE.Group;
  };

  return useMemo(() => {
    let source: THREE.BufferGeometry | null = null;
    scene.traverse((obj) => {
      if (!source && (obj as THREE.Mesh).isMesh) {
        source = (obj as THREE.Mesh).geometry as THREE.BufferGeometry;
      }
    });
    if (!source) {
      // Last-resort fallback so the page never breaks.
      return new THREE.IcosahedronGeometry(1, 16);
    }

    const geo = (source as THREE.BufferGeometry).clone();
    geo.computeBoundingBox();
    geo.computeBoundingSphere();
    const center = new THREE.Vector3();
    geo.boundingBox!.getCenter(center);
    geo.translate(-center.x, -center.y, -center.z);
    const r = geo.boundingSphere?.radius ?? 1;
    if (r > 0) geo.scale(1 / r, 1 / r, 1 / r);
    geo.computeVertexNormals();
    return geo;
  }, [scene]);
}

function Brain() {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.LineSegments>(null);
  const matRef = useRef<any>(null);
  const lightRef = useRef<THREE.PointLight>(null);
  const { mouse, viewport, camera } = useThree();

  const geometry = useNormalizedBrainGeometry();
  const wireGeometry = useMemo(
    () => new THREE.WireframeGeometry(geometry),
    [geometry]
  );

  // Cursor → world target, plane at z = 0.6 (just in front of brain).
  const cursorWorld = useMemo(() => new THREE.Vector3(), []);
  const lookTarget = useMemo(() => new THREE.Vector3(), []);
  const baseQuat = useMemo(() => new THREE.Quaternion(), []);
  const targetQuat = useMemo(() => new THREE.Quaternion(), []);
  const tmpEuler = useMemo(() => new THREE.Euler(), []);
  const tmpMat = useMemo(() => new THREE.Matrix4(), []);
  const upVec = useMemo(() => new THREE.Vector3(0, 1, 0), []);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    if (matRef.current) {
      matRef.current.uTime = t;
      // Pulse cycles 0→1 every 2.0s.
      matRef.current.uPulse = (t % 2.0) / 2.0;
    }

    // Project cursor into world space at a fixed depth.
    const w = viewport.getCurrentViewport(camera, [0, 0, 0]);
    cursorWorld.set(
      (mouse.x * w.width) / 2,
      (mouse.y * w.height) / 2,
      0.6
    );
    if (lightRef.current) {
      lightRef.current.position.copy(cursorWorld);
    }
    if (matRef.current) {
      matRef.current.uLightPos = cursorWorld;
    }

    // Look-at constraint, capped at ~15°.
    if (meshRef.current) {
      lookTarget.copy(cursorWorld).multiplyScalar(0.35); // damp
      tmpMat.lookAt(lookTarget, new THREE.Vector3(0, 0, 0), upVec);
      targetQuat.setFromRotationMatrix(tmpMat);

      // Clamp to ±15° on x and y axes.
      tmpEuler.setFromQuaternion(targetQuat, "YXZ");
      const cap = THREE.MathUtils.degToRad(15);
      tmpEuler.x = THREE.MathUtils.clamp(tmpEuler.x, -cap, cap);
      tmpEuler.y = THREE.MathUtils.clamp(tmpEuler.y, -cap, cap);
      tmpEuler.z = 0;
      targetQuat.setFromEuler(tmpEuler);

      // Add a faint organic float so it doesn't feel rigid.
      baseQuat.setFromEuler(
        new THREE.Euler(
          Math.sin(t * 0.4) * 0.02,
          Math.cos(t * 0.3) * 0.02,
          0
        )
      );
      targetQuat.multiply(baseQuat);

      meshRef.current.quaternion.slerp(targetQuat, 1 - Math.pow(0.001, delta));
      // Sync wireframe to mesh.
      if (wireRef.current) {
        wireRef.current.quaternion.copy(meshRef.current.quaternion);
        wireRef.current.position.y =
          meshRef.current.position.y + Math.sin(t * 0.6) * 0.005;
      }
      meshRef.current.position.y = Math.sin(t * 0.6) * 0.005;
    }
  });

  return (
    <group>
      {/* Cursor-tracked point light: also lights anything else in scene. */}
      <pointLight
        ref={lightRef}
        intensity={4.0}
        distance={3}
        decay={2}
        color="#ffffff"
      />

      <mesh ref={meshRef} geometry={geometry}>
        {/* @ts-expect-error custom shader material from drei's shaderMaterial */}
        <brainMaterial ref={matRef} transparent={false} />
      </mesh>

      {/* Plexus / wireframe shell, slightly inflated, additive white. */}
      <lineSegments ref={wireRef} geometry={wireGeometry} scale={1.012}>
        <lineBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.18}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
}

export function SynapseBrain() {
  return (
    <Canvas
      camera={{ position: [0, 0, 3.2], fov: 35 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: false }}
      style={{ position: "absolute", inset: 0 }}
    >
      <color attach="background" args={["#ffffff"]} />
      <ambientLight intensity={0.06} />
      <Suspense fallback={null}>
        <Brain />
      </Suspense>
    </Canvas>
  );
}
