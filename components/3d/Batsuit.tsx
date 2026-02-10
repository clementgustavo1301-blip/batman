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

            {/* DEBUG BOX - DELETE LATER */}
            <mesh position={[0, 2, 0]}>
                <boxGeometry args={[0.5, 0.5, 0.5]} />
                <meshBasicMaterial color="red" wireframe />
            </mesh>

            {/* Chest / Torso Base */}
            <mesh position={[0, 0, 0]}>
                <cylinderGeometry args={[0.9, 0.7, 1.2, 8]} />
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

            {/* Abdominal Plating */}
            <mesh position={[0, -0.4, 0.4]}>
                <cylinderGeometry args={[0.4, 0.35, 0.6, 6]} />
                <meshStandardMaterial color="#333333" roughness={0.3} metalness={0.8} />
            </mesh>

            {/* Bat Symbol (Abstracted) */}
            <mesh position={[0, 0.3, 0.45]} scale={[1, 0.3, 1]}>
                <boxGeometry args={[0.8, 0.4, 0.1]} />
                <meshStandardMaterial color="#111111" roughness={0.6} metalness={0.4} emissive="#111111" emissiveIntensity={0.2} />
            </mesh>

            {/* Neck / Cowl Base */}
            <mesh position={[0, 0.7, 0]}>
                <cylinderGeometry args={[0.3, 0.4, 0.4, 16]} />
                <meshStandardMaterial color="#2a2a2a" roughness={0.4} metalness={0.6} />
            </mesh>

            {/* Head / Cowl */}
            <mesh position={[0, 1.1, 0.05]}>
                <sphereGeometry args={[0.32, 32, 32]} />
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
                <sphereGeometry args={[0.5, 16, 16]} />
                <meshStandardMaterial color="#333333" roughness={0.3} metalness={0.8} />
            </mesh>
            <mesh position={[-1.1, 0.3, 0]} rotation={[0, 0, 0.3]}>
                <sphereGeometry args={[0.5, 16, 16]} />
                <meshStandardMaterial color="#333333" roughness={0.3} metalness={0.8} />
            </mesh>

        </group>
    );
}
