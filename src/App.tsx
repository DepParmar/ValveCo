import React, { useState, useEffect, Suspense, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { 
  Globe, Mail, Phone, 
  Settings, ShieldCheck, Factory, Wrench, 
  ChevronRight, ArrowRight, Play, Info,
  RotateCw, ZoomIn, Plus, Award, Send,
  RotateCcw, Mouse, Keyboard, Maximize
} from 'lucide-react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { 
  OrbitControls, Stage, PerspectiveCamera, 
  Float, PresentationControls, Environment,
  Html, useProgress
} from '@react-three/drei';
import * as THREE from 'three';
import { Product, PageId } from './types';
import { PRODUCTS, SERVICES, INDUSTRIES } from './constants';
import SiteHeader from './components/layout/SiteHeader';
import NoiseOverlay from './components/layout/NoiseOverlay';
import BackToTopButton from './components/layout/BackToTopButton';
import NeonFooter from './components/layout/NeonFooter';

// --- 3D Valve Components ---

function LoaderUI() {
  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <div className="relative w-24 h-24">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 border-2 border-primary/20 rounded-full"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="absolute inset-2 border-2 border-primary/40 rounded-full border-t-transparent"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="w-2 h-2 bg-primary rounded-full shadow-[0_0_15px_rgba(225,29,72,0.8)]" />
        </motion.div>
      </div>
      <div className="flex flex-col items-center gap-2">
        <span className="font-mono text-[8px] uppercase tracking-[0.8em] text-primary font-bold animate-pulse">Initializing</span>
        <span className="font-mono text-[6px] uppercase tracking-[0.4em] text-primary/20">Geometry Engine v2.4</span>
      </div>
    </div>
  );
}

function ModelLoader() {
  return (
    <Html center>
      <LoaderUI />
    </Html>
  );
}

function ScrollExplodedValve({ progress }: { progress: any }) {
  const leverRef = useRef<THREE.Group>(null);
  const stemRef = useRef<THREE.Mesh>(null);
  const leftFlangeRef = useRef<THREE.Mesh>(null);
  const rightFlangeRef = useRef<THREE.Mesh>(null);
  const bodyRef = useRef<THREE.Mesh>(null);
  const ballRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (!progress) return;
    const p = progress.get();
    
    // Actuation moves up
    if (leverRef.current) {
       leverRef.current.position.y = 0.9 + p * 4.5;
    }
    if (stemRef.current) {
       stemRef.current.position.y = 0.4 + p * 3; 
    }
    
    // Flanges split sideways
    if (leftFlangeRef.current) {
       leftFlangeRef.current.position.x = -1.3 - p * 3;
    }
    if (rightFlangeRef.current) {
       rightFlangeRef.current.position.x = 1.3 + p * 3;
    }
    
    // Body slightly floats up and becomes more transparent to reveal ball
    if (bodyRef.current) {
       bodyRef.current.position.y = p * 1;
       (bodyRef.current.material as THREE.MeshStandardMaterial).opacity = 1 - p * 0.8;
       (bodyRef.current.material as THREE.MeshStandardMaterial).transparent = true;
    }

    // Ball rotates slightly to show flow control
    if (ballRef.current) {
       ballRef.current.rotation.y = p * Math.PI;
    }
  });

  return (
    <group>
      <Float speed={2} rotationIntensity={0.05} floatIntensity={0.1}>
        
        {/* The Ball (Core) */}
        <mesh ref={ballRef} castShadow receiveShadow>
          <sphereGeometry args={[0.8, 32, 32]} />
          <meshStandardMaterial color="#FFFFFF" roughness={0.1} metalness={0.9} />
          {/* A hole through the ball */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
             <cylinderGeometry args={[0.55, 0.55, 1.65, 16]} />
             <meshStandardMaterial color="#111" roughness={0.9} metalness={0.1} />
          </mesh>
        </mesh>

        {/* Outer Split Body / Housing */}
        <mesh ref={bodyRef} castShadow receiveShadow>
          <sphereGeometry args={[0.95, 32, 32]} />
          <meshStandardMaterial color="#FF0000" roughness={0.05} metalness={0.9} />
        </mesh>

        {/* Flanges */}
        <group>
          <mesh ref={leftFlangeRef} position={[-1.3, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[1.2, 1.2, 0.25, 16]} />
            <meshStandardMaterial color="#FFFFFF" roughness={0.1} metalness={1} />
            {/* Extended pipe showing the connection */}
            <mesh position={[0, -0.6, 0]}>
               <cylinderGeometry args={[0.9, 0.9, 1.2, 16]} />
               <meshStandardMaterial color="#FF0000" roughness={0.05} metalness={0.9} />
            </mesh>
            {/* Bolts */}
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
              <mesh key={i} position={[0, 0.6, 0]} rotation={[0, (i * Math.PI) / 4, 0]}>
                <mesh position={[0.9, 0, 0]}>
                  <cylinderGeometry args={[0.08, 0.08, 0.4, 8]} />
                  <meshStandardMaterial color="#FF0000" metalness={1} />
                </mesh>
              </mesh>
            ))}
          </mesh>

          <mesh ref={rightFlangeRef} position={[1.3, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[1.2, 1.2, 0.25, 16]} />
            <meshStandardMaterial color="#FFFFFF" roughness={0.1} metalness={1} />
             {/* Extended pipe showing the connection */}
            <mesh position={[0, 0.6, 0]}>
               <cylinderGeometry args={[0.9, 0.9, 1.2, 16]} />
               <meshStandardMaterial color="#FF0000" roughness={0.05} metalness={0.9} />
            </mesh>
            {/* Bolts */}
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
              <mesh key={i} position={[0, -0.6, 0]} rotation={[0, (i * Math.PI) / 4, 0]}>
                <mesh position={[0.9, 0, 0]}>
                  <cylinderGeometry args={[0.08, 0.08, 0.4, 8]} />
                  <meshStandardMaterial color="#FF0000" metalness={1} />
                </mesh>
              </mesh>
            ))}
          </mesh>
        </group>

        {/* Actuation Assembly */}
        <group>
          {/* Stem */}
          <mesh ref={stemRef} position={[0, 0.4, 0]}>
            <cylinderGeometry args={[0.15, 0.15, 1.5, 16]} />
            <meshStandardMaterial color="#FFFFFF" roughness={0} metalness={1} />
          </mesh>
          
          {/* Lever */}
          <group ref={leverRef} position={[0, 1.15, 0]}>
            <mesh>
              <cylinderGeometry args={[0.25, 0.25, 0.4, 16]} />
              <meshStandardMaterial color="#FFFFFF" metalness={1} />
            </mesh>
            <mesh position={[1, 0.2, 0]}>
              <boxGeometry args={[2.2, 0.15, 0.4]} />
              <meshStandardMaterial color="#FF0000" roughness={0.3} metalness={0.7} />
            </mesh>
          </group>
        </group>

      </Float>
    </group>
  );
}

function ScrollBreakdownViewer({ progress }: { progress: any }) {
  return (
    <div className="w-full h-full cursor-grab active:cursor-grabbing">
      <Canvas 
        shadows={false} 
        dpr={[1, 1.5]} 
        camera={{ position: [5, 4, 7], fov: 40 }}
        gl={{ antialias: true, powerPreference: "high-performance" }}
        performance={{ min: 0.5 }}
      >
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 15, 10]} angle={0.3} penumbra={1} intensity={1} />
        <Environment preset="city" resolution={256} />
        <PresentationControls global rotation={[0, -Math.PI / 4, 0]} polar={[-0.2, 0.2]} azimuth={[-Math.PI, Math.PI]}>
          <Suspense fallback={<ModelLoader />}>
            <ScrollExplodedValve progress={progress} />
          </Suspense>
        </PresentationControls>
      </Canvas>
    </div>
  );
}

const COMPONENT_DETAILS: Record<string, string> = {
  'Body': 'Main pressure-retaining housing that contains internal parts.',
  'Flange': 'Connects the valve securely to external piping systems.',
  'Bonnet': 'Top cover enclosing the stem and internal mechanisms.',
  'Cover (Bonnet)': 'Provides access to internal parts for maintenance.',
  'Stem': 'Transmits motion from the actuator/handwheel to the closure element.',
  'Handwheel': 'Manual operating mechanism to physically open or close the valve.',
  'Actuator': 'Automated drive providing power to operate the valve.',
  'Lever': 'Quarter-turn manual handle to control the flow state.',
  'Disc': 'Movable closure element to stop or regulate fluid flow.',
};

function PartTooltip({ name, isVisible }: { name: string, isVisible: boolean }) {
  return (
    <Html
      center
      style={{
        transition: 'all 0.3s cubic-bezier(0.25, 1, 0.5, 1)',
        opacity: isVisible ? 1 : 0,
        transform: `translate3d(0, ${isVisible ? '0' : '10px'}, 0) scale(${isVisible ? 1 : 0.9})`,
        pointerEvents: 'none',
        zIndex: 100
      }}
    >
      <div className="bg-white/95 backdrop-blur-md px-3 py-2 border border-primary/20 shadow-xl rounded-md pointer-events-none whitespace-nowrap min-w-[200px] flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-primary rounded-full animate-[pulse_2s_ease-in-out_infinite]" />
          <span className="font-mono text-[10px] uppercase font-bold text-primary tracking-wider">{name}</span>
        </div>
        <p className="text-[10px] text-gray-600 leading-tight whitespace-normal">{COMPONENT_DETAILS[name]}</p>
      </div>
    </Html>
  );
}

function ValveModel({ type, activeComponent, onComponentSelect, explodeProgress = 0 }: { type: string, activeComponent: string | null, onComponentSelect?: (name: string | null) => void, explodeProgress?: number }) {
  const meshRef = useRef<THREE.Group>(null);
  const leftFlangeRef = useRef<THREE.Group>(null);
  const rightFlangeRef = useRef<THREE.Group>(null);
  const topAssemblyRef = useRef<THREE.Group>(null);
  const leverGroupRef = useRef<THREE.Group>(null);
  const discRef = useRef<THREE.Group>(null);

  const bodyMeshRef = useRef<THREE.Mesh>(null);
  const bonnetMeshRef = useRef<THREE.Mesh>(null);
  const stemMeshRef = useRef<THREE.Mesh>(null);
  const handwheelMeshRef = useRef<THREE.Group>(null);
  const actuatorMeshRef = useRef<THREE.Mesh>(null);
  const leverMeshRef = useRef<THREE.Mesh>(null);
  const discInnerMeshRef = useRef<THREE.Mesh>(null);

  // Helper to check if a component is active
  const isHighlighted = (name: string) => activeComponent === name;

  useFrame((state, delta) => {
    const speed = 10;
    if (leftFlangeRef.current) {
      leftFlangeRef.current.position.x = THREE.MathUtils.lerp(leftFlangeRef.current.position.x, -1.5 * explodeProgress, delta * speed);
    }
    if (rightFlangeRef.current) {
      rightFlangeRef.current.position.x = THREE.MathUtils.lerp(rightFlangeRef.current.position.x, 1.5 * explodeProgress, delta * speed);
    }
    if (topAssemblyRef.current) {
      topAssemblyRef.current.position.y = THREE.MathUtils.lerp(topAssemblyRef.current.position.y, 1.5 * explodeProgress, delta * speed);
    }
    if (leverGroupRef.current) {
      leverGroupRef.current.position.y = THREE.MathUtils.lerp(leverGroupRef.current.position.y, 1.2 * explodeProgress, delta * speed);
    }
    if (discRef.current) {
      discRef.current.position.z = THREE.MathUtils.lerp(discRef.current.position.z, 1.5 * explodeProgress, delta * speed);
    }

    // Scale highlighted components slightly using lerp
    const scaleHighlighted = (ref: React.RefObject<any>, highlighted: boolean) => {
      if (ref.current) {
        const targetScale = highlighted ? 1.05 : 1;
        ref.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * speed);
      }
    };

    scaleHighlighted(bodyMeshRef, isHighlighted('Body'));
    scaleHighlighted(bonnetMeshRef, isHighlighted('Bonnet') || isHighlighted('Cover (Bonnet)'));
    scaleHighlighted(stemMeshRef, isHighlighted('Stem'));
    scaleHighlighted(handwheelMeshRef, isHighlighted('Handwheel'));
    scaleHighlighted(actuatorMeshRef, isHighlighted('Actuator'));
    scaleHighlighted(leverMeshRef, isHighlighted('Lever'));
    scaleHighlighted(discInnerMeshRef, isHighlighted('Disc'));
  });

  const handlePointerOver = (e: any, name: string) => {
    e.stopPropagation();
    onComponentSelect?.(name);
  };

  const handlePointerOut = (e: any) => {
    e.stopPropagation();
    onComponentSelect?.(null);
  };

  return (
    <group ref={meshRef}>
      <Float speed={2} rotationIntensity={0.05} floatIntensity={0.1}>
        {/* Main Body */}
        <mesh 
          ref={bodyMeshRef}
          castShadow 
          receiveShadow 
          rotation={type === 'Butterfly Valve' ? [0, 0, Math.PI / 2] : [0, 0, 0]}
          onPointerOver={(e) => handlePointerOver(e, 'Body')}
          onPointerOut={handlePointerOut}
          onClick={(e) => handlePointerOver(e, 'Body')}
        >
          <PartTooltip name="Body" isVisible={isHighlighted('Body')} />
          {type === 'Gate Valve' || type === 'Globe Valve' || type === 'Check Valve' ? (
            <sphereGeometry args={[1.1, 32, 32]} />
          ) : type === 'Ball Valve' || type === 'Plug Valve' ? (
            <sphereGeometry args={[0.9, 32, 32]} />
          ) : type === 'Butterfly Valve' ? (
            <cylinderGeometry args={[1, 1, 0.4, 32]} />
          ) : (
            <cylinderGeometry args={[0.9, 0.9, 2.2, 32]} />
          )}
          <meshStandardMaterial 
            color={isHighlighted('Body') ? "#FFFFFF" : "#FF0000"} 
            roughness={0.05} 
            metalness={0.9} 
            emissive={isHighlighted('Body') ? "#FF0000" : "#000000"}
            emissiveIntensity={isHighlighted('Body') ? 0.5 : 0}
          />
        </mesh>

        {/* Flanges */}
        <group>
          {/* Left Flange Group */}
          <group ref={leftFlangeRef}>
            <mesh 
              position={[-1.3, 0, 0]} 
              rotation={[0, 0, Math.PI / 2]}
              onPointerOver={(e) => handlePointerOver(e, 'Flange')}
              onPointerOut={handlePointerOut}
            >
              <PartTooltip name="Flange" isVisible={isHighlighted('Flange')} />
              <cylinderGeometry args={[1.2, 1.2, 0.25, 32]} />
              <meshStandardMaterial color={isHighlighted('Flange') ? "#FF0000" : "#FFFFFF"} roughness={0.1} metalness={1} />
            </mesh>
            {/* Bolts Left */}
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
              <group key={`l-${i}`} rotation={[ (i * Math.PI) / 4, 0, 0]}>
                <mesh position={[-1.3, 0.9, 0]} rotation={[0, 0, Math.PI / 2]}>
                  <cylinderGeometry args={[0.08, 0.08, 0.4, 8]} />
                  <meshStandardMaterial color="#FF0000" metalness={1} />
                </mesh>
              </group>
            ))}
          </group>

          {/* Right Flange Group */}
          <group ref={rightFlangeRef}>
            <mesh 
              position={[1.3, 0, 0]} 
              rotation={[0, 0, Math.PI / 2]}
              onPointerOver={(e) => handlePointerOver(e, 'Flange')}
              onPointerOut={handlePointerOut}
            >
              <PartTooltip name="Flange" isVisible={isHighlighted('Flange')} />
              <cylinderGeometry args={[1.2, 1.2, 0.25, 32]} />
              <meshStandardMaterial color={isHighlighted('Flange') ? "#FF0000" : "#FFFFFF"} roughness={0.1} metalness={1} />
            </mesh>
            {/* Bolts Right */}
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
              <group key={`r-${i}`} rotation={[ (i * Math.PI) / 4, 0, 0]}>
                <mesh position={[1.3, 0.9, 0]} rotation={[0, 0, Math.PI / 2]}>
                  <cylinderGeometry args={[0.08, 0.08, 0.4, 8]} />
                  <meshStandardMaterial color="#FF0000" metalness={1} />
                </mesh>
              </group>
            ))}
          </group>
        </group>

        {/* Stem / Bonnet / Handwheel Assembly */}
        {(type === 'Gate Valve' || type === 'Globe Valve' || type === 'Pressure Relief Valve' || type === 'Control Valve' || type === 'Check Valve') && (
          <group ref={topAssemblyRef}>
            <group position={[0, 1.1, 0]}>
              {/* Bonnet */}
              <mesh 
                ref={bonnetMeshRef}
                castShadow
                onPointerOver={(e) => handlePointerOver(e, type === 'Check Valve' ? 'Cover (Bonnet)' : 'Bonnet')}
                onPointerOut={handlePointerOut}
              >
                <PartTooltip name={type === 'Check Valve' ? 'Cover (Bonnet)' : 'Bonnet'} isVisible={isHighlighted('Bonnet') || isHighlighted('Cover (Bonnet)')} />
                <cylinderGeometry args={[0.6, 0.8, 0.8, 32]} />
                <meshStandardMaterial 
                  color={isHighlighted('Bonnet') || isHighlighted('Cover (Bonnet)') ? "#FFFFFF" : "#FF0000"} 
                  roughness={0.1} 
                  metalness={0.8} 
                  emissive={isHighlighted('Bonnet') || isHighlighted('Cover (Bonnet)') ? "#FF0000" : "#000000"}
                  emissiveIntensity={0.3}
                />
              </mesh>
              {/* Stem */}
              {(type === 'Gate Valve' || type === 'Globe Valve' || type === 'Pressure Relief Valve' || type === 'Control Valve') && (
                <mesh 
                  ref={stemMeshRef}
                  position={[0, 1, 0]}
                  onPointerOver={(e) => handlePointerOver(e, 'Stem')}
                  onPointerOut={handlePointerOut}
                >
                  <PartTooltip name="Stem" isVisible={isHighlighted('Stem')} />
                  <cylinderGeometry args={[0.15, 0.15, 2, 16]} />
                  <meshStandardMaterial 
                    color={isHighlighted('Stem') ? "#FF0000" : "#FFFFFF"} 
                    roughness={0} 
                    metalness={1} 
                  />
                </mesh>
              )}
              {/* Handwheel */}
              {(type === 'Gate Valve' || type === 'Globe Valve' || type === 'Pressure Relief Valve') && (
                <group ref={handwheelMeshRef} position={[0, 1.8, 0]} rotation={[Math.PI / 2, 0, 0]}>
                  <mesh
                    onPointerOver={(e) => handlePointerOver(e, 'Handwheel')}
                    onPointerOut={handlePointerOut}
                  >
                    <PartTooltip name="Handwheel" isVisible={isHighlighted('Handwheel')} />
                    <torusGeometry args={[1, 0.12, 16, 48]} />
                    <meshStandardMaterial 
                      color={isHighlighted('Handwheel') ? "#FFFFFF" : "#FF0000"} 
                      roughness={0.1} 
                      metalness={0.8} 
                      emissive={isHighlighted('Handwheel') ? "#FF0000" : "#000000"}
                      emissiveIntensity={0.3}
                    />
                  </mesh>
                  {/* Spokes */}
                  {[0, 1, 2, 3].map((i) => (
                    <mesh key={i} rotation={[0, 0, (i * Math.PI) / 2]}>
                      <boxGeometry args={[2, 0.1, 0.1]} />
                      <meshStandardMaterial color="#FF0000" roughness={0.1} metalness={0.8} />
                    </mesh>
                  ))}
                </group>
              )}
              {/* Actuator for Control Valve */}
              {type === 'Control Valve' && (
                <mesh 
                  ref={actuatorMeshRef}
                  position={[0, 2, 0]} 
                  rotation={[Math.PI, 0, 0]}
                  onPointerOver={(e) => handlePointerOver(e, 'Actuator')}
                  onPointerOut={handlePointerOut}
                >
                  <PartTooltip name="Actuator" isVisible={isHighlighted('Actuator')} />
                  <sphereGeometry args={[0.8, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
                  <meshStandardMaterial color={isHighlighted('Actuator') ? "#FFFFFF" : "#FF0000"} roughness={0.2} metalness={0.8} />
                </mesh>
              )}
            </group>
          </group>
        )}

        {/* Lever for Ball / Plug / Butterfly Valve */}
        {(type === 'Ball Valve' || type === 'Plug Valve' || type === 'Butterfly Valve') && (
          <group ref={leverGroupRef}>
            <group position={[0, 0.9, 0]}>
              <mesh>
                <cylinderGeometry args={[0.2, 0.2, 0.4, 16]} />
                <meshStandardMaterial color="#FFFFFF" metalness={1} />
              </mesh>
              <mesh 
                ref={leverMeshRef}
                position={[1, 0.2, 0]} 
                rotation={[0, 0, 0]}
                onPointerOver={(e) => handlePointerOver(e, 'Lever')}
                onPointerOut={handlePointerOut}
              >
                <PartTooltip name="Lever" isVisible={isHighlighted('Lever')} />
                <boxGeometry args={[2.2, 0.15, 0.4]} />
                <meshStandardMaterial 
                  color={isHighlighted('Lever') ? "#FFFFFF" : "#FF0000"} 
                  roughness={0.3} 
                  metalness={0.7} 
                  emissive={isHighlighted('Lever') ? "#FF0000" : "#000000"}
                  emissiveIntensity={0.3}
                />
              </mesh>
            </group>
          </group>
        )}

        {/* Disc for Butterfly Valve */}
        {type === 'Butterfly Valve' && (
          <group ref={discRef}>
            <mesh 
              ref={discInnerMeshRef}
              rotation={[0, Math.PI / 4, 0]}
              onPointerOver={(e) => handlePointerOver(e, 'Disc')}
              onPointerOut={handlePointerOut}
            >
              <PartTooltip name="Disc" isVisible={isHighlighted('Disc')} />
              <cylinderGeometry args={[0.85, 0.85, 0.1, 32]} />
              <meshStandardMaterial 
                color={isHighlighted('Disc') ? "#FF0000" : "#FFFFFF"} 
                roughness={0.1} 
                metalness={1} 
              />
            </mesh>
          </group>
        )}
      </Float>
    </group>
  );
}

function KeyboardRotator({ controlsRef, keys }: { controlsRef: React.MutableRefObject<any>, keys: React.MutableRefObject<{ [key: string]: boolean }> }) {
  const { camera } = useThree();

  useFrame(() => {
    if (!controlsRef.current) return;
    const controls = controlsRef.current;
    
    const step = 0.05;
    let changed = false;

    if (keys.current['ArrowLeft']) {
      const target = controls.target;
      camera.position.sub(target);
      camera.position.applyAxisAngle(new THREE.Vector3(0, 1, 0), step);
      camera.position.add(target);
      changed = true;
    }
    if (keys.current['ArrowRight']) {
      const target = controls.target;
      camera.position.sub(target);
      camera.position.applyAxisAngle(new THREE.Vector3(0, 1, 0), -step);
      camera.position.add(target);
      changed = true;
    }
    if (keys.current['ArrowUp']) {
      const target = controls.target;
      const right = new THREE.Vector3(1, 0, 0).applyQuaternion(camera.quaternion);
      camera.position.sub(target);
      camera.position.applyAxisAngle(right, -step);
      camera.position.add(target);
      changed = true;
    }
    if (keys.current['ArrowDown']) {
      const target = controls.target;
      const right = new THREE.Vector3(1, 0, 0).applyQuaternion(camera.quaternion);
      camera.position.sub(target);
      camera.position.applyAxisAngle(right, step);
      camera.position.add(target);
      changed = true;
    }

    if (changed) {
      camera.lookAt(controls.target);
      controls.update();
    }
  });

  return null;
}

function ValveViewer({ type, activeComponent, onComponentSelect, variant = 'default' }: { type: string, activeComponent: string | null, onComponentSelect?: (name: string | null) => void, variant?: 'default' | 'hero' }) {
  const controlsRef = useRef<any>(null);
  const keys = useRef<{ [key: string]: boolean }>({});
  const [explodeProgress, setExplodeProgress] = useState(0);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
      e.preventDefault();
      keys.current[e.key] = true;
    }
  };

  const handleKeyUp = (e: React.KeyboardEvent) => {
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
      keys.current[e.key] = false;
    }
  };

  const resetView = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

  return (
    <div 
      className="w-full h-full min-h-[500px] cursor-grab active:cursor-grabbing relative group outline-none"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      onMouseLeave={() => { keys.current = {}; }}
      onBlur={() => { keys.current = {}; }}
    >
      {/* Interactive HUD Overlays */}
      {variant !== 'hero' && (
        <div className="absolute inset-x-4 top-4 z-20 flex justify-between items-start pointer-events-none">
          
          {/* Keyboard Hint */}
          <div className="flex items-center gap-4 bg-white/90 backdrop-blur-md px-4 py-3 border border-primary/10 shadow-xl opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity pointer-events-auto">
            <div className="flex gap-1">
              <div className="w-6 h-6 border border-primary/20 flex items-center justify-center rounded-sm text-primary"><Keyboard size={12} /></div>
            </div>
            <div className="font-mono text-[8px] uppercase tracking-widest text-primary/40 font-bold leading-tight">
              Use arrow keys <br/> to rotate model
            </div>
          </div>

          {/* Action Buttons & Slider */}
          <div className="flex flex-col items-end gap-3 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity pointer-events-auto">
            <button 
              onClick={resetView}
              className="flex items-center gap-2 bg-white/90 backdrop-blur-md px-4 py-3 border border-primary/10 text-primary hover:bg-primary hover:text-white transition-all shadow-xl active:scale-95"
            >
              <RotateCcw size={14} />
              <span className="font-mono text-[9px] uppercase tracking-widest font-bold">Reset View</span>
            </button>
            
            <div className="flex flex-col gap-4 bg-white/90 backdrop-blur-md px-5 py-4 border border-primary/10 shadow-xl w-60">
              <div className="flex justify-between items-center w-full">
                <div className="flex items-center gap-2 text-primary">
                  <Maximize size={12} />
                  <span className="font-mono text-[9px] uppercase tracking-widest font-bold">Explode</span>
                </div>
                <span className="font-mono text-[10px] text-primary font-black italic">{Math.round(explodeProgress * 100)}%</span>
              </div>
              
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setExplodeProgress(0)} 
                  className="font-mono text-[8px] uppercase tracking-widest text-primary/40 hover:text-primary transition-colors active:scale-95"
                >
                  Min
                </button>
                <input 
                  type="range" 
                  min="0" 
                  max="1" 
                  step="0.01" 
                  value={explodeProgress}
                  onChange={(e) => setExplodeProgress(parseFloat(e.target.value))}
                  className="flex-1 accent-primary h-1 bg-primary/20 rounded-lg appearance-none cursor-pointer"
                />
                <button 
                  onClick={() => setExplodeProgress(1)} 
                  className="font-mono text-[8px] uppercase tracking-widest text-primary/40 hover:text-primary transition-colors active:scale-95"
                >
                  Max
                </button>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* Technical Grid Overlay */}
      {variant !== 'hero' && (
        <div className="absolute inset-0 pointer-events-none z-10">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ff000005_1px,transparent_1px),linear-gradient(to_bottom,#ff000005_1px,transparent_1px)] bg-[size:40px_40px]" />
          <div className="absolute top-1/2 left-0 w-full h-px bg-primary/10" />
          <div className="absolute top-0 left-1/2 w-px h-full bg-primary/10" />
          
          {/* Coordinate Markers */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 font-mono text-[8px] text-primary/20 uppercase tracking-widest">Y-AXIS</div>
          <div className="absolute top-1/2 right-4 -translate-y-1/2 font-mono text-[8px] text-primary/20 uppercase tracking-widest [writing-mode:vertical-rl]">X-AXIS</div>
        </div>
      )}

      <Canvas shadows={false} dpr={[1, 1.5]} gl={{ antialias: true, powerPreference: "high-performance" }} performance={{ min: 0.5 }}>
        <PerspectiveCamera makeDefault position={[4, 3, 6]} fov={45} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        <Suspense fallback={<ModelLoader />}>
          <Stage environment="studio" intensity={0.5} shadows={false}>
            <ValveModel type={type} activeComponent={activeComponent} onComponentSelect={onComponentSelect} explodeProgress={explodeProgress} />
          </Stage>
        </Suspense>
        <OrbitControls 
          ref={controlsRef}
          enablePan={false} 
          enableZoom={true}
          minDistance={4} 
          maxDistance={12} 
          autoRotate={!activeComponent && Object.keys(keys.current).every(k => !keys.current[k])} 
          autoRotateSpeed={1}
          enableDamping={true}
          dampingFactor={0.05}
          rotateSpeed={1}
          makeDefault
        />
        <KeyboardRotator controlsRef={controlsRef} keys={keys} />
      </Canvas>
    </div>
  );
}

export default function App() {
  const [activePage, setActivePage] = useState<PageId>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product>(PRODUCTS[0]);
  const [activeComponent, setActiveComponent] = useState<string | null>(null);
  const [isProductLoading, setIsProductLoading] = useState(false);

  const handleProductSelect = (p: Product) => {
    if (p.id === selectedProduct.id) return;
    
    setIsProductLoading(true);
    setActiveComponent(null);
    
    // Simulate data fetching
    setTimeout(() => {
      setSelectedProduct(p);
      setIsProductLoading(false);
    }, 800);
  };

  const navigateTo = (page: PageId) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-primary font-sans selection:bg-primary selection:text-white">
      <NoiseOverlay />
      <BackToTopButton />
      <SiteHeader onNavigate={navigateTo} />

      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            {activePage === 'home' && <HomePage onNavigate={navigateTo} />}
            {activePage === 'about' && <AboutPage />}
            {activePage === 'products' && (
              <ProductsPage 
                selected={selectedProduct} 
                onSelect={handleProductSelect} 
                activeComponent={activeComponent}
                setActiveComponent={setActiveComponent}
                isLoading={isProductLoading}
                onNavigate={navigateTo}
              />
            )}
            {activePage === 'services' && <ServicesPage onNavigate={navigateTo} />}
            {activePage === 'contact' && <ContactPage />}
          </motion.div>
        </AnimatePresence>
      </main>

      <NeonFooter />
    </div>
  );
}

function BreakdownSection({ onNavigate }: { onNavigate: (id: PageId) => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const opacity1 = useTransform(scrollYProgress, [0, 0.2, 0.3], [1, 1, 0]);
  const opacity2 = useTransform(scrollYProgress, [0.25, 0.35, 0.55, 0.65], [0, 1, 1, 0]);
  const opacity3 = useTransform(scrollYProgress, [0.6, 0.7, 0.9, 1], [0, 1, 1, 0]);
  const opacity4 = useTransform(scrollYProgress, [0.85, 0.95, 1], [0, 1, 1]);

  return (
    <section ref={containerRef} className="relative h-[400vh] bg-white border-b border-primary/10">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-between">
        
        {/* Left Side: Text info */}
        <div className="w-full lg:w-5/12 relative h-full flex flex-col justify-center pl-6 md:pl-24 z-10 pointer-events-none pb-12 mt-20">
            <motion.div style={{ opacity: opacity1 }} className="absolute inset-0 flex flex-col justify-center px-6 pointer-events-auto">
                {/* <div className="inline-flex items-center gap-4 px-4 py-1.5 bg-primary/5 border border-primary/10 rounded-full w-max mb-8">
                  <div className="w-2 h-2 bg-primary animate-pulse rounded-full" />
                  <span className="font-sans text-[10px] font-bold uppercase tracking-[0.3em] text-primary">Global Engineering Standards</span>
                </div> */}
                
                <h1 className="font-display text-6xl xl:text-8xl font-black italic uppercase leading-[0.85] tracking-tighter text-primary">
                  <span className="block overflow-hidden pb-2"><motion.span className="block" initial={{y: "100%"}} animate={{y: 0}} transition={{duration: 0.8, ease: "easeOut"}}>Flow</motion.span></span>
                  <span className="block overflow-hidden pb-2"><motion.span className="block" initial={{y: "100%"}} animate={{y: 0}} transition={{duration: 0.8, delay: 0.1, ease: "easeOut"}}>Without</motion.span></span>
                  <span className="block overflow-hidden"><motion.span className="block" initial={{y: "100%"}} animate={{y: 0}} transition={{duration: 0.8, delay: 0.2, ease: "easeOut"}}>Compromise.</motion.span></span>
                </h1>

                <p className="text-primary/60 text-xl md:text-2xl font-light italic mt-6 max-w-md">
                  Precision-engineered valves for the world's most critical industrial infrastructures. Scroll to disassemble.
                </p>
                
                <div className="flex flex-wrap gap-6 pt-8">
                  <button 
                    onClick={() => onNavigate('products')}
                    className="group relative px-6 py-3 bg-primary text-white font-sans text-xs font-bold uppercase tracking-[0.3em] overflow-hidden transition-all shadow-2xl shadow-primary/20 hover:shadow-primary/40 active:scale-95 flex items-center gap-4"
                  >
                    <span className="relative z-10">View Catalog</span>
                    <ArrowRight size={14} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                    <div className="absolute inset-0 bg-black/10 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                  </button>
                  <button 
                    onClick={() => onNavigate('contact')}
                    className="group px-6 py-3 border border-primary/20 text-primary font-sans text-xs font-bold uppercase tracking-[0.3em] hover:bg-primary/5 transition-all active:scale-95 flex items-center gap-4"
                  >
                    <span>Get a Quote</span>
                  </button>
                </div>

                <div className="hidden md:flex gap-12 pt-8 border-t border-primary/10 w-max mt-8 relative z-10">
                  <div>
                    <div className="font-mono text-[9px] uppercase tracking-widest text-primary/40 mb-1">Leakage Rate</div>
                    <div className="font-display font-black italic text-xl text-primary">0.00%</div>
                  </div>
                  <div>
                    <div className="font-mono text-[9px] uppercase tracking-widest text-primary/40 mb-1">Standard</div>
                    <div className="font-display font-black italic text-xl text-primary">API 6D</div>
                  </div>
                </div>
            </motion.div>
            <motion.div style={{ opacity: opacity2 }} className="absolute inset-0 flex flex-col justify-center px-6">
                <div className="font-mono text-xs uppercase tracking-[0.4em] text-primary/40 mb-4 font-bold">Step 01 / Control</div>
                <h3 className="font-display text-5xl md:text-7xl font-black italic uppercase tracking-tighter text-primary leading-none">Actuation <br/> Interface</h3>
                <p className="text-primary/60 text-xl font-light italic mt-6 max-w-md">Heavy-duty lever and blowout-proof stem detach to reveal the direct-mount transmission mechanism.</p>
            </motion.div>
            <motion.div style={{ opacity: opacity3 }} className="absolute inset-0 flex flex-col justify-center px-6">
                <div className="font-mono text-xs uppercase tracking-[0.4em] text-primary/40 mb-4 font-bold">Step 02 / Isolation</div>
                <h3 className="font-display text-5xl md:text-7xl font-black italic uppercase tracking-tighter text-primary leading-none">Split <br/> Housing</h3>
                <p className="text-primary/60 text-xl font-light italic mt-6 max-w-md">The robust multi-piece flanged outer body separates along structural axes, exposing the internal cavity.</p>
            </motion.div>
            <motion.div style={{ opacity: opacity4 }} className="absolute inset-0 flex flex-col justify-center px-6">
                <div className="font-mono text-xs uppercase tracking-[0.4em] text-primary/40 mb-4 font-bold">Step 03 / The Core</div>
                <h3 className="font-display text-5xl md:text-7xl font-black italic uppercase tracking-tighter text-primary leading-none">Precision <br/> Ball</h3>
                <p className="text-primary/60 text-xl font-light italic mt-6 max-w-md">The mirror-finished spherical core rotates to align its bore with the pipeline, enabling frictionless flow control.</p>
            </motion.div>
        </div>

        {/* Right Side: 3D Canvas */}
        <div className="w-full lg:w-7/12 h-screen absolute right-0 top-0 bottom-0 pointer-events-auto">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ff000003_1px,transparent_1px),linear-gradient(to_bottom,#ff000003_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />
            <ScrollBreakdownViewer progress={scrollYProgress} />
            <div className="absolute bottom-12 right-12 flex items-center gap-4 bg-white/80 backdrop-blur-md px-6 py-3 border border-primary/10 shadow-xl pointer-events-none">
                <div className="w-px h-6 bg-primary/20 relative overflow-hidden">
                    <motion.div className="absolute top-0 w-full h-1/2 bg-primary" animate={{ y: ["-100%", "200%"] }} transition={{ repeat: Infinity, duration: 1.5, ease: "circInOut" }} />
                </div>
                <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-primary font-bold">Scroll to Disassemble</span>
            </div>
        </div>
      </div>
    </section>
  )
}

function HomePage({ onNavigate }: { onNavigate: (id: PageId) => void }) {
  const [activeComponent, setActiveComponent] = useState<string | null>(null);
  const globeValve = PRODUCTS.find(p => p.id === 'globe-valve');
  const MARQUEE_ITEMS = ["TRUSTED BY GLOBAL LEADERS", "API STANDARD APPROVED", "ZERO LEAKAGE", "100% HYDRO TESTED", "CUSTOM ACTUATORS", "GLOBAL LOGISTICS"];

  return (
    <div className="relative">
      {/* Anatomy Breakdown Section (Scroll-linked 3D) acts as Hero now */}
      <BreakdownSection onNavigate={onNavigate} />

      {/* Infinite Scroller Marquee */}
      <section className="border-y border-primary/5 bg-primary overflow-hidden py-4">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <div key={i} className="flex items-center gap-10 px-5">
              <span className="font-mono text-xs uppercase tracking-widest text-white/90 font-bold">{item}</span>
              <div className="w-1.5 h-1.5 bg-white/20 rounded-full" />
            </div>
          ))}
        </div>
      </section>

      {/* Feature Blocks - Minimalist Clean */}
      <section className="py-48 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-24">
            {[
              { icon: Factory, title: "Manufacturing", desc: "Advanced CNC facility delivering micron-level precision for every component." },
              { icon: ShieldCheck, title: "Reliability", desc: "100% hydrostatic testing ensuring zero-leakage performance in extreme conditions." },
              { icon: Globe, title: "Network", desc: "Seamless global logistics serving major plants across 15+ countries." }
            ].map((feature, i) => (
              <div key={i} className="space-y-8">
                <feature.icon size={40} className="text-primary opacity-20" />
                <h3 className="font-display text-3xl font-black italic uppercase tracking-tight text-primary">{feature.title}</h3>
                <p className="text-primary/40 text-lg font-light leading-relaxed italic">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Production 3D Content Block - Now optimized to image to keep single 3D experience on homepage */}
      <section className="py-48 bg-primary/[0.02] border-y border-primary/5">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
            <div className="relative aspect-[4/5] bg-white border border-primary/10 overflow-hidden group">
              <img 
                src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1200&q=80&auto=format&fit=crop" 
                className="w-full h-full object-cover grayscale mix-blend-multiply opacity-80 group-hover:scale-105 transition-transform duration-700"
                alt="Engineering Excellence"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-primary/5 mix-blend-multiply" />
            </div>
            <div className="space-y-12">
              <span className="font-sans text-xs font-bold uppercase tracking-[0.6em] text-primary">The TVC Standard</span>
              <h2 className="font-display text-6xl md:text-8xl font-black italic uppercase tracking-tighter text-primary leading-none">Built for <br /> Extremes.</h2>
              <p className="text-primary/60 text-2xl font-light leading-relaxed italic">
                Our valves are tested beyond industry requirements, ensuring they withstand the highest pressures and most corrosive environments in petrochemical and power plants.
              </p>
              <div className="grid grid-cols-2 gap-12 pt-8">
                <div>
                  <div className="font-display text-4xl font-black italic text-primary mb-2">API 6D</div>
                  <div className="font-sans text-[10px] uppercase tracking-widest text-primary/40">Certified Quality</div>
                </div>
                <div>
                  <div className="font-display text-4xl font-black italic text-primary mb-2">0%</div>
                  <div className="font-sans text-[10px] uppercase tracking-widest text-primary/40">Leakage Rate</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Insights (Blog Section) - Cleaner with Better Images */}
      <section className="py-48 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-32">
            <div className="space-y-6">
              <span className="font-sans text-xs font-bold uppercase tracking-[0.6em] text-primary">Latest Insights</span>
              <h2 className="font-display text-6xl md:text-8xl font-black italic uppercase tracking-tighter text-primary">Industry <br /> <span className="opacity-20">News.</span></h2>
            </div>
            <button className="font-sans text-xs font-bold uppercase tracking-[0.3em] text-primary border-b border-primary/20 pb-4 hover:border-primary hover:text-primary/80 active:scale-95 transition-all">
              View All Insights
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {[
              { date: "Oct 12, 2025", title: "The Future of Smart Valves", desc: "Exploring how IoT and real-time monitoring are transforming flow control systems.", img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80&auto=format&fit=crop" },
              { date: "Sep 28, 2025", title: "Material Selection Guide", desc: "A guide to choosing the right alloys for extreme temperature environments.", img: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80&auto=format&fit=crop" },
              { date: "Aug 15, 2025", title: "Global Market Expansion", desc: "Announcing our new distribution partnership in Germany and the UK.", img: "https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?w=800&q=80&auto=format&fit=crop" }
            ].map((post, i) => (
              <div key={i} className="space-y-8 group cursor-pointer">
                <div className="aspect-[16/10] bg-primary/[0.02] overflow-hidden">
                  <img 
                    src={post.img} 
                    className="w-full h-full object-cover grayscale group-hover:scale-110 transition-transform duration-1000"
                    alt={post.title}
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="space-y-4">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-primary/40 font-bold">{post.date}</span>
                  <h3 className="font-display text-3xl font-black italic uppercase tracking-tight text-primary leading-tight group-hover:text-primary/60 transition-colors">{post.title}</h3>
                  <p className="text-primary/40 text-lg font-light leading-relaxed italic">{post.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-32 bg-primary text-white">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 text-center">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="flex justify-center">
              <Award size={64} className="text-white/20" />
            </div>
            <p className="font-display text-3xl md:text-5xl font-black italic uppercase tracking-tighter leading-tight">
              "The Valve Company has been our primary valve partner for over a decade. Their commitment to zero-leakage and technical support is unparalleled in the industry."
            </p>
            <div className="space-y-2">
              <div className="font-sans text-sm font-bold uppercase tracking-[0.4em]">Director of Operations</div>
              <div className="font-sans text-xs uppercase tracking-widest opacity-60">Global Petrochemical Corp</div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-32 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="p-16 md:p-24 bg-primary/[0.02] border border-primary/5 text-center space-y-12 relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ff000005_1px,transparent_1px),linear-gradient(to_bottom,#ff000005_1px,transparent_1px)] bg-[size:40px_40px]" />
            </div>
            <div className="relative z-10 space-y-6">
              <span className="font-sans text-xs font-bold uppercase tracking-[0.4em] text-primary">Ready to Optimize?</span>
              <h2 className="font-display text-6xl md:text-8xl font-black italic uppercase tracking-tighter text-primary leading-none">Let's Discuss <br /> Your Flow.</h2>
              <p className="text-primary/40 text-xl font-light italic leading-relaxed max-w-2xl mx-auto">
                Our engineering team is ready to help you find the perfect solution for your industrial flow control needs.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
                <button 
                  onClick={() => onNavigate('contact')}
                  className="px-12 py-5 bg-primary text-white font-sans text-sm font-bold uppercase tracking-widest rounded-sm hover:bg-primary/90 active:scale-95 transition-all shadow-2xl shadow-primary/30"
                >
                  Get a Quote
                </button>
                <button 
                  onClick={() => onNavigate('products')}
                  className="px-12 py-5 border border-primary/10 text-primary font-sans text-sm font-bold uppercase tracking-widest rounded-sm hover:bg-primary/[0.02] active:scale-95 transition-all"
                >
                  Explore Products
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function AboutPage() {
  return (
    <div className="pt-32">
      {/* WordPress-style About Hero - Cleaner with Background Image */}
      <section className="relative py-48 bg-primary overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=2400&q=80&auto=format&fit=crop" 
            className="w-full h-full object-cover grayscale opacity-10"
            alt="About Hero"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="max-w-4xl space-y-8">
            <span className="font-sans text-xs font-bold uppercase tracking-[0.6em] text-white/60">Our Legacy</span>
            <h1 className="font-display text-7xl md:text-9xl font-black italic uppercase tracking-tighter leading-none text-white">Engineering <br /> The Future.</h1>
          </div>
        </div>
      </section>

      {/* Mission & Vision Blocks - More Whitespace */}
      <section className="py-48 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-48">
            <div className="space-y-10">
              <h2 className="font-display text-5xl font-black italic uppercase tracking-tight text-primary">Our Mission</h2>
              <p className="text-primary/60 text-2xl font-light leading-relaxed italic">
                To provide the global industrial sector with high-performance flow control solutions that ensure safety, efficiency, and environmental responsibility. We strive to be the benchmark for quality in the valve manufacturing industry.
              </p>
            </div>
            <div className="space-y-10">
              <h2 className="font-display text-5xl font-black italic uppercase tracking-tight text-primary">Our Vision</h2>
              <p className="text-primary/60 text-2xl font-light leading-relaxed italic">
                To become the world's most trusted partner in industrial engineering, recognized for our innovation, reliability, and commitment to sustainable manufacturing practices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Block */}
      <section className="py-24 bg-primary/[0.02] border-y border-primary/5">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {[
              { label: 'Years of Experience', value: '25+' },
              { label: 'Global Clients', value: '500+' },
              { label: 'Countries Served', value: '15+' },
              { label: 'Valve Variations', value: '120+' }
            ].map((stat, i) => (
              <div key={i} className="space-y-2">
                <div className="font-display text-5xl font-black italic text-primary leading-none tracking-tighter">{stat.value}</div>
                <div className="font-sans text-[10px] uppercase tracking-widest text-primary/40 font-bold">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team/Values Block - Cleaner with Images */}
      <section className="py-48 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="text-center max-w-3xl mx-auto mb-32 space-y-6">
            <span className="font-sans text-xs font-bold uppercase tracking-[0.6em] text-primary">Our Values</span>
            <h2 className="font-display text-6xl md:text-8xl font-black italic uppercase tracking-tighter text-primary">The Core <br /> <span className="opacity-20">of TVC.</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {[
              { title: "Integrity", desc: "We believe in transparent business practices and honest engineering. Every valve we produce is a promise of quality.", img: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80&auto=format&fit=crop" },
              { title: "Innovation", desc: "Continuously investing in R&D and modern manufacturing technologies to stay ahead of industry demands.", img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80&auto=format&fit=crop" },
              { title: "Sustainability", desc: "Optimizing our processes to minimize waste and reduce our environmental footprint in manufacturing.", img: "https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?w=800&q=80&auto=format&fit=crop" }
            ].map((value, i) => (
              <div key={i} className="space-y-10 group">
                <div className="aspect-square overflow-hidden bg-primary/[0.02]">
                  <img 
                    src={value.img} 
                    className="w-full h-full object-cover grayscale opacity-40 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000"
                    alt={value.title}
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="space-y-6">
                  <h3 className="font-display text-4xl font-black italic uppercase tracking-tight text-primary leading-none">{value.title}</h3>
                  <p className="text-primary/40 text-xl font-light leading-relaxed italic">{value.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function ProductsPage({ 
  selected, 
  onSelect, 
  activeComponent, 
  setActiveComponent,
  isLoading,
  onNavigate
}: { 
  selected: Product, 
  onSelect: (p: Product) => void,
  activeComponent: string | null,
  setActiveComponent: (name: string | null) => void,
  isLoading: boolean,
  onNavigate: (page: PageId) => void
}) {
  return (
    <div className="pt-32">
      {/* WordPress-style Product Header - Minimal Clean */}
      <section className="py-48 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="max-w-4xl space-y-8">
            <span className="font-sans text-xs font-bold uppercase tracking-[0.6em] text-primary">Product Catalog</span>
            <h1 className="font-display text-7xl md:text-9xl font-black italic uppercase tracking-tighter leading-none text-primary">Flow <br /> <span className="opacity-20">Systems.</span></h1>
          </div>
        </div>
      </section>

      <section className="pb-48 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-32">
            {/* Product List Sidebar - Cleaner */}
            <div className="lg:col-span-4 space-y-12">
              <div className="space-y-6">
                <div className="font-sans text-[10px] font-bold uppercase tracking-widest text-primary/40 mb-6">Select Category</div>
                <div className="space-y-2">
                  {PRODUCTS.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => onSelect(p)}
                      disabled={isLoading}
                      className={`w-full text-left py-6 px-4 transition-all border-l-2 active:scale-[0.98] ${
                        selected.id === p.id 
                          ? 'border-primary bg-primary/[0.02]' 
                          : 'border-transparent text-primary/40 hover:border-primary/20 hover:text-primary'
                      } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      <div className={`font-display text-3xl font-black italic uppercase tracking-tight transition-colors ${selected.id === p.id ? 'text-primary' : ''}`}>{p.name}</div>
                      <div className="font-sans text-[10px] uppercase tracking-widest mt-1 opacity-60">{p.specs.type}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-12 bg-primary/[0.02] border border-primary/5 space-y-10">
                <h4 className="font-display text-2xl font-black italic uppercase tracking-tight text-primary">Technical Specs</h4>
                <div className="space-y-6">
                  {Object.entries(selected.specs).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-end border-b border-primary/5 pb-2">
                      <span className="font-sans text-[10px] uppercase tracking-widest text-primary/40 font-bold">{key}</span>
                      <span className="font-display text-lg font-black italic text-primary">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Product Detail Area - Cleaner */}
            <div className="lg:col-span-8 space-y-24">
              <div className="aspect-[16/10] bg-primary/[0.02] border border-primary/5 relative overflow-hidden group">
                {isLoading ? (
                  <div className="w-full h-full flex items-center justify-center bg-white/80 backdrop-blur-sm">
                    <LoaderUI />
                  </div>
                ) : (
                  <ValveViewer 
                    type={selected.name} 
                    activeComponent={activeComponent} 
                    onComponentSelect={setActiveComponent}
                  />
                )}
                
                <div className="absolute bottom-10 left-10 z-10">
                  <div className="px-4 py-2 bg-white/90 backdrop-blur-md border border-primary/10 rounded-full flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                    <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-primary">Interactive 3D View</span>
                  </div>
                </div>

                {/* Dynamic Component Info Panel */}
                <AnimatePresence>
                  {activeComponent && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="absolute top-10 right-10 z-20 w-80 bg-white/95 backdrop-blur-xl border border-primary/10 p-8 shadow-2xl space-y-6"
                    >
                      <div className="space-y-2">
                        <span className="font-mono text-[8px] uppercase tracking-[0.4em] text-primary/40 font-bold">Component Detail</span>
                        <h4 className="font-display text-3xl font-black italic uppercase tracking-tighter text-primary leading-none">
                          {activeComponent}
                        </h4>
                      </div>

                      {selected.bom.find(item => item.component === activeComponent) ? (
                        <div className="space-y-6">
                          <div className="space-y-2">
                            <div className="font-sans text-[10px] font-bold uppercase tracking-widest text-primary/40">Material</div>
                            <p className="text-primary font-display text-xl font-black italic uppercase tracking-tight">
                              {selected.bom.find(item => item.component === activeComponent)?.material}
                            </p>
                          </div>
                          <div className="space-y-2">
                            <div className="font-sans text-[10px] font-bold uppercase tracking-widest text-primary/40">Primary Function</div>
                            <p className="text-primary/60 text-sm font-light italic leading-relaxed">
                              {selected.bom.find(item => item.component === activeComponent)?.function}
                            </p>
                          </div>
                          <div className="pt-4 border-t border-primary/5">
                            <div className="flex justify-between items-center">
                              <span className="font-mono text-[8px] uppercase tracking-widest text-primary/20">BOM ID: {selected.bom.find(item => item.component === activeComponent)?.id}</span>
                              <div className="w-2 h-2 bg-primary rounded-full" />
                            </div>
                          </div>
                        </div>
                      ) : (
                        <p className="text-primary/40 text-xs italic">Technical data pending for this component.</p>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
                <div className="space-y-10">
                  <h2 className="font-display text-5xl font-black italic uppercase tracking-tighter leading-none text-primary">{selected.name}</h2>
                  <p className="text-primary/60 text-xl font-light leading-relaxed italic">{selected.description}</p>
                </div>

                <div className="space-y-10">
                  <div className="font-sans text-[10px] font-bold uppercase tracking-widest text-primary/40">Interactive Components</div>
                  <div className="flex flex-wrap gap-4">
                    {selected.bom.map((item) => (
                      <button
                        key={item.id}
                        onMouseEnter={() => setActiveComponent(item.component)}
                        onMouseLeave={() => setActiveComponent(null)}
                        className={`px-6 py-3 font-sans text-[10px] font-bold uppercase tracking-widest border active:scale-95 transition-all ${
                          activeComponent === item.component 
                            ? 'bg-primary border-primary text-white' 
                            : 'bg-transparent border-primary/10 text-primary hover:border-primary'
                        }`}
                      >
                        {item.component}
                      </button>
                    ))}
                  </div>
                  
                  <div className="p-12 bg-primary text-white space-y-8">
                    <h4 className="font-display text-3xl font-black italic uppercase tracking-tighter">Request Data</h4>
                    <p className="text-white/60 text-sm font-light italic">Detailed technical drawings and performance curves available upon request.</p>
                    <button 
                      onClick={() => onNavigate('contact')}
                      className="w-full py-5 border border-white/20 hover:bg-white hover:text-primary active:scale-95 transition-all font-sans text-xs font-bold uppercase tracking-widest"
                    >
                      Request Data Sheet
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

const IconMap: Record<string, any> = {
  Factory,
  Wrench,
  ShieldCheck,
  Settings,
  Award,
  Globe
};

function ServicesPage({ onNavigate }: { onNavigate: (page: PageId) => void }) {
  return (
    <div className="pt-32">
      {/* WordPress-style Services Header - Minimal Clean */}
      <section className="py-48 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="max-w-4xl space-y-8">
            <span className="font-sans text-xs font-bold uppercase tracking-[0.6em] text-primary">Expert Solutions</span>
            <h1 className="font-display text-7xl md:text-9xl font-black italic uppercase tracking-tighter leading-none text-primary">Precision <br /> <span className="opacity-20">Service.</span></h1>
          </div>
        </div>
      </section>

      <section className="pb-48 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="space-y-32">
            {SERVICES.map((svc, i) => {
              const Icon = IconMap[svc.icon] || Globe;
              return (
                <div key={i} className={`flex flex-col lg:flex-row gap-16 lg:gap-32 items-start ${i % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                  <div className="lg:w-1/2 space-y-10">
                    <div className="flex items-center gap-6">
                      <span className="font-display text-8xl font-black italic opacity-5 text-primary leading-none">0{i + 1}</span>
                      <Icon size={48} className="text-primary opacity-20" />
                    </div>
                    <div className="space-y-6">
                      <h3 className="font-display text-5xl md:text-7xl font-black italic uppercase leading-none tracking-tighter text-primary">{svc.title}</h3>
                      <p className="text-primary/40 text-2xl font-light leading-relaxed italic max-w-xl">{svc.description}</p>
                    </div>
                  </div>
                  <div className="lg:w-1/2 w-full">
                    <div className="p-12 bg-primary/[0.02] border-l-4 border-primary space-y-8">
                      <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-primary/40">Key Capabilities</span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {svc.features.map((feat, j) => (
                          <div key={j} className="flex items-center gap-4 text-primary">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                            <span className="font-sans text-[10px] font-bold uppercase tracking-widest">{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* On-Site Excellence Block */}
      <section className="py-32 bg-primary/[0.02]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="relative aspect-video">
              <img 
                src="https://images.unsplash.com/photo-1513828583688-c52646db42da?w=1200&q=80&auto=format&fit=crop" 
                className="w-full h-full object-cover grayscale shadow-2xl"
                alt="Service Support"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="space-y-8">
              <span className="font-sans text-xs font-bold uppercase tracking-[0.4em] text-primary">Support Network</span>
              <h2 className="font-display text-5xl md:text-6xl font-black italic uppercase tracking-tighter text-primary">On-Site Excellence</h2>
              <p className="text-primary/40 text-xl font-light leading-relaxed italic">
                Our mobile service units are equipped with advanced diagnostic tools and genuine spare parts to handle emergency repairs and routine maintenance directly at your facility.
              </p>
              <button 
                onClick={() => onNavigate('contact')}
                className="px-10 py-4 bg-primary text-white font-sans text-sm font-bold uppercase tracking-widest rounded-sm hover:bg-primary/90 active:scale-95 transition-all"
              >
                Request Support
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function ContactPage() {
  return (
    <div className="pt-32">
      {/* WordPress-style Contact Header - Minimal Clean */}
      <section className="py-48 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="max-w-4xl space-y-8">
            <span className="font-sans text-xs font-bold uppercase tracking-[0.6em] text-primary">Get In Touch</span>
            <h1 className="font-display text-7xl md:text-9xl font-black italic uppercase tracking-tighter leading-none text-primary">Start <br /> <span className="opacity-20">Now.</span></h1>
          </div>
        </div>
      </section>

      <section className="pb-48 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-32">
            {/* Contact Info Sidebar - Cleaner */}
            <div className="lg:col-span-5 space-y-24">
              <div className="space-y-12">
                <div className="space-y-6">
                  <div className="font-sans text-[10px] font-bold uppercase tracking-widest text-primary/40">Direct Channels</div>
                  <a href="tel:+916464646464" className="block font-display text-5xl font-black italic uppercase tracking-tighter text-primary hover:text-primary/60 transition-colors">+91 6464646464</a>
                  <a href="mailto:contact@thevalvecompany.demo" className="block font-display text-5xl font-black italic uppercase tracking-tighter text-primary hover:text-primary/60 transition-colors">contact@thevalvecompany.demo</a>
                </div>

                <div className="space-y-6">
                  <div className="font-sans text-[10px] font-bold uppercase tracking-widest text-primary/40">Headquarters</div>
                  <p className="font-display text-3xl font-black italic uppercase tracking-tighter text-primary leading-tight">
                    Innovation District, Core Facility, <br />
                    Metropolis, Global Region
                  </p>
                </div>

                <div className="pt-12 border-t border-primary/5">
                  <div className="font-sans text-[10px] font-bold uppercase tracking-widest text-primary/40 mb-4">Business Hours</div>
                  <p className="font-sans text-sm font-bold uppercase tracking-widest text-primary">Mon — Sat: 09:00 — 18:00</p>
                  <p className="font-sans text-sm font-bold uppercase tracking-widest text-primary/40 italic">Sunday: Closed</p>
                </div>
              </div>
            </div>

            {/* Contact Form - Cleaner */}
            <div className="lg:col-span-7">
              <div className="space-y-16">
                <div className="space-y-6">
                  <span className="font-sans text-xs font-bold uppercase tracking-[0.4em] text-primary">Inquiry Form</span>
                  <h3 className="font-display text-5xl md:text-7xl font-black italic uppercase tracking-tighter text-primary leading-none">Let's <br /> <span className="opacity-20">Connect.</span></h3>
                </div>
                <form className="space-y-12" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-4">
                      <label className="font-sans text-[10px] font-bold uppercase tracking-widest text-primary/40">Full Name</label>
                      <input type="text" className="w-full bg-transparent border-b border-primary/20 py-4 font-sans text-xl text-primary focus:border-primary outline-none transition-colors placeholder:text-primary/10" placeholder="John Doe" />
                    </div>
                    <div className="space-y-4">
                      <label className="font-sans text-[10px] font-bold uppercase tracking-widest text-primary/40">Email Address</label>
                      <input type="email" className="w-full bg-transparent border-b border-primary/20 py-4 font-sans text-xl text-primary focus:border-primary outline-none transition-colors placeholder:text-primary/10" placeholder="john@company.com" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <label className="font-sans text-[10px] font-bold uppercase tracking-widest text-primary/40">Subject</label>
                    <input type="text" className="w-full bg-transparent border-b border-primary/20 py-4 font-sans text-xl text-primary focus:border-primary outline-none transition-colors placeholder:text-primary/10" placeholder="Custom Quote Request" />
                  </div>
                  <div className="space-y-4">
                    <label className="font-sans text-[10px] font-bold uppercase tracking-widest text-primary/40">Message</label>
                    <textarea rows={4} className="w-full bg-transparent border-b border-primary/20 py-4 font-sans text-xl text-primary focus:border-primary outline-none transition-colors resize-none placeholder:text-primary/10" placeholder="Tell us about your project requirements..." />
                  </div>
                  <button className="px-16 py-6 bg-primary text-white font-sans text-xs font-bold uppercase tracking-widest rounded-sm hover:bg-primary/90 active:scale-95 transition-all shadow-2xl shadow-primary/40 flex items-center gap-8 group">
                    <span>Send Message</span>
                    <Send size={20} className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
