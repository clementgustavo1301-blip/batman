'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function GrapnelGun() {
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state, delta) => {
        if (groupRef.current) {
            // Idle float and rotation
            groupRef.current.rotation.y += delta * 0.5;
            groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 1) * 0.05;
        }
    });



    return (
        <group ref={groupRef} scale={[0.8, 0.8, 0.8]}>
            {/* Main Body - Chasis */}
            <mesh position={[0, 0, 0]}>
                <boxGeometry args={[0.8, 1.2, 3]} />
                <meshStandardMaterial color="#222" metalness={0.7} roughness={0.4} />
            </mesh>

            {/* Top Tactical Rail */}
            <mesh position={[0, 0.65, 0.2]}>
                <boxGeometry args={[0.4, 0.1, 2.5]} />
                <meshStandardMaterial color="#111" metalness={0.8} roughness={0.3} />
            </mesh>

            {/* Handle Grip - Ergonomic shape approximated */}
            <mesh position={[0, -1, -0.8]} rotation={[Math.PI / 8, 0, 0]}>
                <boxGeometry args={[0.65, 1.8, 0.9]} />
                <meshStandardMaterial color="#050505" roughness={0.9} />
            </mesh>
            <mesh position={[0, -1.2, -0.4]} rotation={[Math.PI / 8, 0, 0]}>
                <cylinderGeometry args={[0.3, 0.3, 1.8, 16]} />
                <meshStandardMaterial color="#050505" roughness={0.9} />
            </mesh>

            {/* Trigger Guard */}
            <mesh position={[0, -0.5, -0.2]} rotation={[0, 0, 0]}>
                <torusGeometry args={[0.3, 0.05, 12, 24, Math.PI]} />
                <meshStandardMaterial color="#333" metalness={0.9} />
            </mesh>

            {/* Barrel - High Poly */}
            <mesh position={[0, 0.2, 1.6]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.25, 0.3, 1.2, 32]} />
                <meshStandardMaterial color="#444" metalness={0.8} roughness={0.2} />
            </mesh>

            {/* Muzzle Brake */}
            <mesh position={[0, 0.2, 2.2]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.32, 0.32, 0.2, 16]} />
                <meshStandardMaterial color="#111" metalness={0.9} />
            </mesh>

            {/* Hook Claws (The Grapnel Part) - Intricate */}
            {[0, 1, 2].map((i) => (
                <group key={i} rotation={[0, 0, (i * Math.PI * 2) / 3]} position={[0, 0.2, 2.3]}>
                    {/* Base Hinge */}
                    <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0.2, 0]}>
                        <boxGeometry args={[0.15, 0.4, 0.15]} />
                        <meshStandardMaterial color="#555" metalness={1} />
                    </mesh>
                    {/* Claw Curve */}
                    <mesh rotation={[Math.PI / 3, 0, 0]} position={[0, 0.5, 0.2]}>
                        <cylinderGeometry args={[0.02, 0.08, 0.6, 12]} />
                        <meshStandardMaterial color="#777" metalness={1} roughness={0.1} />
                    </mesh>
                    <mesh rotation={[Math.PI / 1.5, 0, 0]} position={[0, 0.75, 0.35]}>
                        <coneGeometry args={[0.02, 0.3, 12]} />
                        <meshStandardMaterial color="#999" metalness={1} roughness={0.1} />
                    </mesh>
                </group>
            ))}

            {/* Side Details / Bolts */}
            <mesh position={[0.42, 0, 0]}>
                <boxGeometry args={[0.05, 0.8, 2]} />
                <meshStandardMaterial color="#333" metalness={0.9} roughness={0.1} />
            </mesh>
            <mesh position={[-0.42, 0, 0]}>
                <boxGeometry args={[0.05, 0.8, 2]} />
                <meshStandardMaterial color="#333" metalness={0.9} roughness={0.1} />
            </mesh>

            {/* Power Cell / Glowing Indicator */}
            <mesh position={[0, 0.2, -1.2]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.15, 0.15, 0.5, 16]} />
                <meshStandardMaterial color="#00ff00" emissive="#00ff00" emissiveIntensity={2} toneMapped={false} />
            </mesh>

        </group>
    );
}
