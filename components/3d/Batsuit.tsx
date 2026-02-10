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

    const armorMaterial = new THREE.MeshStandardMaterial({
        color: '#080808',
        roughness: 0.5,
        metalness: 0.5,
    });

    const plateMaterial = new THREE.MeshStandardMaterial({
        color: '#111111',
        roughness: 0.3,
        metalness: 0.7,
    });

    const symbolMaterial = new THREE.MeshStandardMaterial({
        color: '#050505',
        roughness: 0.6,
        metalness: 0.2,
        emissive: '#000000',
    });

    return (
        <group ref={groupRef} scale={[1, 1, 1]} position={[0, -1, 0]}>

            {/* Chest / Torso Base */}
            <mesh position={[0, 0, 0]} material={armorMaterial}>
                <cylinderGeometry args={[0.9, 0.7, 1.2, 8]} />
            </mesh>

            {/* Pectoral Plates */}
            <mesh position={[0.4, 0.2, 0.3]} rotation={[0.1, -0.2, 0]} material={plateMaterial}>
                <boxGeometry args={[0.7, 0.5, 0.2]} />
            </mesh>
            <mesh position={[-0.4, 0.2, 0.3]} rotation={[0.1, 0.2, 0]} material={plateMaterial}>
                <boxGeometry args={[0.7, 0.5, 0.2]} />
            </mesh>

            {/* Abdominal Plating */}
            <mesh position={[0, -0.4, 0.4]} material={plateMaterial}>
                <cylinderGeometry args={[0.4, 0.35, 0.6, 6]} />
            </mesh>

            {/* Bat Symbol (Abstracted) */}
            <mesh position={[0, 0.3, 0.45]} scale={[1, 0.3, 1]} material={symbolMaterial}>
                <boxGeometry args={[0.8, 0.4, 0.1]} />
            </mesh>

            {/* Neck / Cowl Base */}
            <mesh position={[0, 0.7, 0]} material={armorMaterial}>
                <cylinderGeometry args={[0.3, 0.4, 0.4, 16]} />
            </mesh>

            {/* Head / Cowl */}
            <mesh position={[0, 1.1, 0.05]} material={armorMaterial}>
                <sphereGeometry args={[0.32, 32, 32]} />
            </mesh>

            {/* Ears */}
            <mesh position={[0.15, 1.45, 0]} rotation={[0, 0, -0.1]} material={plateMaterial}>
                <coneGeometry args={[0.08, 0.35, 4]} />
            </mesh>
            <mesh position={[-0.15, 1.45, 0]} rotation={[0, 0, 0.1]} material={plateMaterial}>
                <coneGeometry args={[0.08, 0.35, 4]} />
            </mesh>

            {/* Shoulders */}
            <mesh position={[1.1, 0.3, 0]} rotation={[0, 0, -0.3]} material={plateMaterial}>
                <sphereGeometry args={[0.5, 16, 16]} />
            </mesh>
            <mesh position={[-1.1, 0.3, 0]} rotation={[0, 0, 0.3]} material={plateMaterial}>
                <sphereGeometry args={[0.5, 16, 16]} />
            </mesh>

        </group>
    );
}
