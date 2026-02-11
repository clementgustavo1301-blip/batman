'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function Batsuit() {
    const groupRef = useRef<THREE.Group>(null);

    useFrame((_, delta) => {
        if (groupRef.current) {
            // Slow, majestic rotation
            groupRef.current.rotation.y += delta * 0.2;
        }
    });

    return (
        <group ref={groupRef} scale={[1, 1, 1]} position={[0, -1, 0]}>

            {/* Chest / Torso Base */}
            <mesh position={[0, 0, 0]}>
                <cylinderGeometry args={[0.9, 0.7, 1.2, 8]} />
                <meshStandardMaterial color="#2a2a2a" roughness={0.4} metalness={0.6} />
            </mesh>

            {/* Neck / Cowl Base */}
            <mesh position={[0, 0.7, 0]}>
                <cylinderGeometry args={[0.3, 0.4, 0.4, 16]} />
                <meshStandardMaterial color="#2a2a2a" roughness={0.4} metalness={0.6} />
            </mesh>

            {/* Pectoral Plates */}
            <mesh position={[0.4, 0.2, 0.3]} rotation={[0.1, -0.2, 0]}>
                <boxGeometry args={[0.7, 0.5, 0.2]} />
                <meshStandardMaterial color="#333333" roughness={0.3} metalness={0.8} />
            </mesh>
            <mesh position={[-0.4, 0.2, 0.3]} rotation={[0.1, 0.2, 0]}>
                <boxGeometry args={[0.7, 0.5, 0.2]} />
                <meshStandardMaterial color="#333333" roughness={0.3} metalness={0.8} />
            </mesh>

            {/* Abdominal Plating - Segmented */}
            <mesh position={[0, -0.3, 0.4]}>
                <boxGeometry args={[0.5, 0.15, 0.1]} />
                <meshStandardMaterial color="#333333" roughness={0.3} metalness={0.8} />
            </mesh>
            <mesh position={[0, -0.5, 0.38]}>
                <boxGeometry args={[0.45, 0.15, 0.1]} />
                <meshStandardMaterial color="#333333" roughness={0.3} metalness={0.8} />
            </mesh>
            <mesh position={[0, -0.7, 0.35]}>
                <boxGeometry args={[0.4, 0.15, 0.1]} />
                <meshStandardMaterial color="#333333" roughness={0.3} metalness={0.8} />
            </mesh>

            {/* Utility Belt */}
            <mesh position={[0, -0.8, 0]}>
                <cylinderGeometry args={[0.72, 0.72, 0.15, 8]} />
                <meshStandardMaterial color="#D4AF37" metalness={1} roughness={0.4} />
            </mesh>
            {/* Belt Pouches */}
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
                <mesh key={i} rotation={[0, (i * Math.PI * 2) / 8, 0]} position={[Math.sin((i * Math.PI * 2) / 8) * 0.72, -0.8, Math.cos((i * Math.PI * 2) / 8) * 0.72]}>
                    <boxGeometry args={[0.15, 0.2, 0.1]} />
                    <meshStandardMaterial color="#C5A028" metalness={1} roughness={0.5} />
                </mesh>
            ))}

            {/* Bat Symbol (Abstracted) */}
            <mesh position={[0, 0.3, 0.45]} scale={[1, 0.3, 1]}>
                <boxGeometry args={[0.8, 0.4, 0.1]} />
                <meshStandardMaterial color="#111111" roughness={0.6} metalness={0.4} emissive="#111111" emissiveIntensity={0.2} />
            </mesh>

            {/* Head / Cowl */}
            <mesh position={[0, 1.1, 0.05]}>
                <sphereGeometry args={[0.32, 16, 16]} />
                <meshStandardMaterial color="#2a2a2a" roughness={0.4} metalness={0.6} />
            </mesh>

            {/* Ears */}
            <mesh position={[0.15, 1.45, 0]} rotation={[0, 0, -0.1]}>
                <coneGeometry args={[0.08, 0.35, 4]} />
                <meshStandardMaterial color="#333333" roughness={0.3} metalness={0.8} />
            </mesh>
            <mesh position={[-0.15, 1.45, 0]} rotation={[0, 0, 0.1]}>
                <coneGeometry args={[0.08, 0.35, 4]} />
                <meshStandardMaterial color="#333333" roughness={0.3} metalness={0.8} />
            </mesh>

            {/* Shoulders */}
            <mesh position={[1.1, 0.3, 0]} rotation={[0, 0, -0.3]}>
                <sphereGeometry args={[0.5, 8, 8]} />
                <meshStandardMaterial color="#333333" roughness={0.3} metalness={0.8} />
            </mesh>
            <mesh position={[-1.1, 0.3, 0]} rotation={[0, 0, 0.3]}>
                <sphereGeometry args={[0.5, 8, 8]} />
                <meshStandardMaterial color="#333333" roughness={0.3} metalness={0.8} />
            </mesh>

            {/* Arms - Upper */}
            <mesh position={[1.4, -0.2, 0]} rotation={[0, 0, -0.2]}>
                <cylinderGeometry args={[0.3, 0.25, 1.0, 8]} />
                <meshStandardMaterial color="#2a2a2a" roughness={0.4} metalness={0.6} />
            </mesh>
            <mesh position={[-1.4, -0.2, 0]} rotation={[0, 0, 0.2]}>
                <cylinderGeometry args={[0.3, 0.25, 1.0, 8]} />
                <meshStandardMaterial color="#2a2a2a" roughness={0.4} metalness={0.6} />
            </mesh>

            {/* Gauntlets / Forearms */}
            <mesh position={[1.6, -1.0, 0]} rotation={[0, 0, -0.1]}>
                <cylinderGeometry args={[0.25, 0.22, 1.2, 8]} />
                <meshStandardMaterial color="#333" roughness={0.3} metalness={0.8} />
            </mesh>
            {/* Gauntlet Fins */}
            <mesh position={[1.75, -1.0, 0.15]} rotation={[0, 0, -0.1]}>
                <boxGeometry args={[0.02, 0.8, 0.1]} />
                <meshStandardMaterial color="#111" />
            </mesh>
            <mesh position={[1.75, -1.0, -0.15]} rotation={[0, 0, -0.1]}>
                <boxGeometry args={[0.02, 0.8, 0.1]} />
                <meshStandardMaterial color="#111" />
            </mesh>

            <mesh position={[-1.6, -1.0, 0]} rotation={[0, 0, 0.1]}>
                <cylinderGeometry args={[0.25, 0.22, 1.2, 8]} />
                <meshStandardMaterial color="#333" roughness={0.3} metalness={0.8} />
            </mesh>
            {/* Gauntlet Fins */}
            <mesh position={[-1.75, -1.0, 0.15]} rotation={[0, 0, 0.1]}>
                <boxGeometry args={[0.02, 0.8, 0.1]} />
                <meshStandardMaterial color="#111" />
            </mesh>
            <mesh position={[-1.75, -1.0, -0.15]} rotation={[0, 0, 0.1]}>
                <boxGeometry args={[0.02, 0.8, 0.1]} />
                <meshStandardMaterial color="#111" />
            </mesh>

            {/* Legs - Thighs */}
            <mesh position={[0.5, -1.6, 0]}>
                <cylinderGeometry args={[0.4, 0.3, 1.4, 8]} />
                <meshStandardMaterial color="#2a2a2a" roughness={0.4} metalness={0.6} />
            </mesh>
            <mesh position={[-0.5, -1.6, 0]}>
                <cylinderGeometry args={[0.4, 0.3, 1.4, 8]} />
                <meshStandardMaterial color="#2a2a2a" roughness={0.4} metalness={0.6} />
            </mesh>

            {/* Legs - Calves/Boots */}
            <mesh position={[0.5, -2.8, 0]}>
                <cylinderGeometry args={[0.3, 0.25, 1.4, 8]} />
                <meshStandardMaterial color="#111" roughness={0.5} metalness={0.4} />
            </mesh>
            <mesh position={[-0.5, -2.8, 0]}>
                <cylinderGeometry args={[0.3, 0.25, 1.4, 8]} />
                <meshStandardMaterial color="#111" roughness={0.5} metalness={0.4} />
            </mesh>
            {/* Boots Feet */}
            <mesh position={[0.5, -3.6, 0.2]}>
                <boxGeometry args={[0.35, 0.2, 0.7]} />
                <meshStandardMaterial color="#111" roughness={0.5} metalness={0.4} />
            </mesh>
            <mesh position={[-0.5, -3.6, 0.2]}>
                <boxGeometry args={[0.35, 0.2, 0.7]} />
                <meshStandardMaterial color="#111" roughness={0.5} metalness={0.4} />
            </mesh>

        </group>
    );
}
