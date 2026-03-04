import React, { useRef, useMemo, useState, useCallback, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Stars, Html } from '@react-three/drei';
import * as THREE from 'three';

/* ── Skill data with 3D positions ── */
const allSkills = [
  // Frontend — red hue orbit
  { name: 'React', category: 'frontend', level: 95, color: '#ef4444' },
  { name: 'TypeScript', category: 'frontend', level: 85, color: '#ef4444' },
  { name: 'Tailwind', category: 'frontend', level: 92, color: '#ef4444' },
  { name: 'Next.js', category: 'frontend', level: 80, color: '#ef4444' },
  { name: 'Framer', category: 'frontend', level: 88, color: '#ef4444' },
  { name: 'Redux', category: 'frontend', level: 78, color: '#ef4444' },
  // Backend — amber hue orbit
  { name: 'Node.js', category: 'backend', level: 90, color: '#f59e0b' },
  { name: 'Python', category: 'backend', level: 85, color: '#f59e0b' },
  { name: 'FastAPI', category: 'backend', level: 75, color: '#f59e0b' },
  { name: 'PostgreSQL', category: 'backend', level: 82, color: '#f59e0b' },
  { name: 'GraphQL', category: 'backend', level: 70, color: '#f59e0b' },
  { name: 'Firebase', category: 'backend', level: 78, color: '#f59e0b' },
  // DevOps — emerald hue orbit
  { name: 'Git', category: 'devops', level: 95, color: '#10b981' },
  { name: 'Docker', category: 'devops', level: 80, color: '#10b981' },
  { name: 'AWS', category: 'devops', level: 72, color: '#10b981' },
  { name: 'Linux', category: 'devops', level: 85, color: '#10b981' },
  { name: 'Jest', category: 'devops', level: 76, color: '#10b981' },
  { name: 'CI/CD', category: 'devops', level: 78, color: '#10b981' },
];

/* ── Central glowing core orb ── */
const CoreOrb = () => {
  const meshRef = useRef();
  const glowRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.2;
      meshRef.current.rotation.x = Math.sin(t * 0.1) * 0.1;
    }
    if (glowRef.current) {
      glowRef.current.scale.setScalar(1.8 + Math.sin(t * 1.5) * 0.15);
    }
  });

  return (
    <group>
      {/* Inner core */}
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[0.6, 4]} />
        <MeshDistortMaterial
          color="#ef4444"
          emissive="#ef4444"
          emissiveIntensity={0.6}
          roughness={0.2}
          metalness={0.8}
          distort={0.3}
          speed={2}
        />
      </mesh>
      {/* Outer glow sphere */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshBasicMaterial color="#ef4444" transparent opacity={0.05} />
      </mesh>
    </group>
  );
};

/* ── Skill Node: floating sphere with label ── */
const SkillNode = ({ skill, position, orbitRadius, orbitSpeed, orbitOffset, onHover }) => {
  const groupRef = useRef();
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  const scaleFactor = 0.15 + (skill.level / 100) * 0.2;

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (groupRef.current) {
      const angle = t * orbitSpeed + orbitOffset;
      groupRef.current.position.x = Math.cos(angle) * orbitRadius;
      groupRef.current.position.z = Math.sin(angle) * orbitRadius;
      groupRef.current.position.y = Math.sin(t * 0.5 + orbitOffset) * 0.8 + position[1];
    }
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      const targetScale = hovered ? scaleFactor * 1.5 : scaleFactor;
      meshRef.current.scale.lerp(
        new THREE.Vector3(targetScale, targetScale, targetScale),
        0.1
      );
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={0.4} floatIntensity={0.3}>
        <mesh
          ref={meshRef}
          onPointerOver={(e) => {
            e.stopPropagation();
            setHovered(true);
            onHover(skill);
            document.body.style.cursor = 'pointer';
          }}
          onPointerOut={(e) => {
            e.stopPropagation();
            setHovered(false);
            onHover(null);
            document.body.style.cursor = 'default';
          }}
          onClick={(e) => {
            e.stopPropagation();
            setClicked((c) => !c);
          }}
        >
          <dodecahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color={skill.color}
            emissive={skill.color}
            emissiveIntensity={hovered ? 1.2 : 0.3}
            roughness={0.3}
            metalness={0.7}
            transparent
            opacity={hovered ? 1 : 0.8}
          />
        </mesh>

        {/* Skill label */}
        {(hovered || clicked) && (
          <Html distanceFactor={8} center style={{ pointerEvents: 'none' }}>
            <div className="bg-black/80 backdrop-blur-xl border border-white/10 rounded-xl px-4 py-3 text-center whitespace-nowrap shadow-2xl">
              <div className="text-white font-bold text-sm">{skill.name}</div>
              <div className="text-xs mt-1" style={{ color: skill.color }}>
                {skill.level}% Proficiency
              </div>
              <div className="text-gray-500 text-xs capitalize">{skill.category}</div>
            </div>
          </Html>
        )}

        {/* Point light for each node */}
        <pointLight color={skill.color} intensity={hovered ? 2 : 0.5} distance={3} />
      </Float>
    </group>
  );
};

/* ── Orbital ring visual ── */
const OrbitalRing = ({ radius, color, rotationSpeed }) => {
  const ringRef = useRef();

  useFrame(({ clock }) => {
    if (ringRef.current) {
      ringRef.current.rotation.z = clock.getElapsedTime() * rotationSpeed;
    }
  });

  const points = useMemo(() => {
    const pts = [];
    const segments = 128;
    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius));
    }
    return pts;
  }, [radius]);

  const lineGeo = useMemo(() => {
    const geo = new THREE.BufferGeometry().setFromPoints(points);
    return geo;
  }, [points]);

  return (
    <group ref={ringRef} rotation={[Math.PI / 2 + 0.3, 0, 0]}>
      <line geometry={lineGeo}>
        <lineBasicMaterial color={color} transparent opacity={0.12} />
      </line>
    </group>
  );
};

/* ── Simple seeded pseudo-random ── */
function seededRandom(seed) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

/* ── Floating particles ── */
const FloatingParticles = ({ count = 200 }) => {
  const meshRef = useRef();

  const particles = useMemo(() => {
    const rand = seededRandom(42);
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (rand() - 0.5) * 30;
      positions[i * 3 + 1] = (rand() - 0.5) * 20;
      positions[i * 3 + 2] = (rand() - 0.5) * 30;

      // Warm colors
      const r = 0.5 + rand() * 0.5;
      const g = 0.1 + rand() * 0.2;
      const b = 0.1 + rand() * 0.1;
      colors[i * 3] = r;
      colors[i * 3 + 1] = g;
      colors[i * 3 + 2] = b;
    }
    return { positions, colors };
  }, [count]);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.02;
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={particles.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.04} vertexColors transparent opacity={0.6} sizeAttenuation />
    </points>
  );
};

/* ── Camera auto-rotate ── */
const CameraRig = () => {
  const { camera } = useThree();
  const cameraRef = useRef(camera);

  useEffect(() => {
    cameraRef.current = camera;
  }, [camera]);

  useFrame(({ clock, pointer }) => {
    const t = clock.getElapsedTime();
    const cam = cameraRef.current;
    cam.position.x = Math.sin(t * 0.1) * 0.5 + pointer.x * 2;
    cam.position.y = 2 + pointer.y * 1.5;
    cam.lookAt(0, 0, 0);
  });

  return null;
};

/* ── Scene composition ── */
const SkillsScene = ({ onHoverSkill, filter }) => {
  const categoryConfig = {
    frontend: { radius: 3.5, speed: 0.15, yOffset: 0.5 },
    backend: { radius: 5.5, speed: -0.1, yOffset: -0.3 },
    devops: { radius: 7.5, speed: 0.08, yOffset: 0.2 },
  };

  const filteredSkills = filter === 'all' ? allSkills : allSkills.filter((s) => s.category === filter);

  return (
    <>
      {/* Environment */}
      <ambientLight intensity={0.15} />
      <pointLight position={[0, 0, 0]} color="#ef4444" intensity={3} distance={15} />
      <pointLight position={[10, 5, 5]} color="#ffffff" intensity={0.3} />
      <pointLight position={[-10, -5, -5]} color="#3b82f6" intensity={0.2} />

      <Stars radius={50} depth={60} count={1500} factor={3} fade speed={0.5} />
      <FloatingParticles count={300} />

      {/* Core */}
      <CoreOrb />

      {/* Orbital rings */}
      <OrbitalRing radius={3.5} color="#ef4444" rotationSpeed={0.05} />
      <OrbitalRing radius={5.5} color="#f59e0b" rotationSpeed={-0.03} />
      <OrbitalRing radius={7.5} color="#10b981" rotationSpeed={0.02} />

      {/* Skill nodes */}
      {filteredSkills.map((skill) => {
        const config = categoryConfig[skill.category];
        const categorySkills = allSkills.filter((s) => s.category === skill.category);
        const indexInCategory = categorySkills.indexOf(skill);
        const angleOffset = (indexInCategory / categorySkills.length) * Math.PI * 2;

        return (
          <SkillNode
            key={skill.name}
            skill={skill}
            position={[0, config.yOffset, 0]}
            orbitRadius={config.radius}
            orbitSpeed={config.speed}
            orbitOffset={angleOffset}
            onHover={onHoverSkill}
          />
        );
      })}

      <CameraRig />
    </>
  );
};

/* ── Skill info overlay panel ── */
const SkillInfoPanel = ({ skill }) => {
  if (!skill) return null;

  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-2xl border border-white/10 rounded-2xl px-8 py-5 flex items-center gap-6 shadow-2xl z-20 min-w-[320px]">
      <div
        className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl font-bold"
        style={{ backgroundColor: skill.color + '20', color: skill.color }}
      >
        {skill.level}
      </div>
      <div>
        <h4 className="text-white font-bold text-lg">{skill.name}</h4>
        <p className="text-gray-500 text-sm capitalize">{skill.category} Development</p>
        <div className="mt-1.5 h-1.5 w-32 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{ width: `${skill.level}%`, backgroundColor: skill.color }}
          />
        </div>
      </div>
    </div>
  );
};

/* ── Main exported component ── */
const SkillsUniverse = ({ filter = 'all' }) => {
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const handleHover = useCallback((skill) => setHoveredSkill(skill), []);

  return (
    <div className="relative w-full h-[600px] md:h-[700px] rounded-3xl overflow-hidden border border-white/5 bg-[#020205]">
      {/* Instruction overlay */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 bg-black/50 backdrop-blur-md border border-white/5 rounded-full px-5 py-2 text-xs text-gray-400">
        🌐 Move your mouse to explore • Hover over nodes to inspect skills
      </div>

      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [0, 2, 12], fov: 60, near: 0.1, far: 100 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <SkillsScene onHoverSkill={handleHover} filter={filter} />
      </Canvas>

      {/* Hover info panel */}
      <SkillInfoPanel skill={hoveredSkill} />

      {/* Gradient overlays for depth */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-60" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#050505]/30 via-transparent to-transparent" />
    </div>
  );
};

export default SkillsUniverse;
