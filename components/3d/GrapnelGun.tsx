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
            groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 1) * 0.1;
        }
    });

    const gunMaterial = new THREE.MeshStandardMaterial({
        color: '#1a1a1a',
        roughness: 0.4,
        metalness: 0.8,
    });

    const gripMaterial = new THREE.MeshStandardMaterial({
        color: '#0a0a0a',
        roughness: 0.7,
        metalness: 0.2,
    });

    const metalMaterial = new THREE.MeshStandardMaterial({
        color: '#888888',
        roughness: 0.2,
        metalness: 1.0,
    });

    return (
        <group ref={groupRef} scale={[0.8, 0.8, 0.8]}>
            {/* Main Body */}
            <mesh position={[0, 0, 0]} rotation={[0, 0, 0]} material={gunMaterial}>
                <boxGeometry args={[0.8, 1.2, 3]} />
            </mesh>

            {/* Handle Grip */}
            <mesh position={[0, -1, -0.5]} rotation={[Math.PI / 6, 0, 0]} material={gripMaterial}>
                <boxGeometry args={[0.6, 1.5, 0.8]} />
            </mesh>

            {/* Barrel */}
            <mesh position={[0, 0.2, 1.6]} rotation={[Math.PI / 2, 0, 0]} material={metalMaterial}>
                <cylinderGeometry args={[0.2, 0.25, 1, 16]} />
            </mesh>

            {/* Hook Claws (The Grapnel Part) */}
            {[0, 1, 2].map((i) => (
                <group key={i} rotation={[0, 0, (i * Math.PI * 2) / 3]} position={[0, 0.2, 2.1]}>
                    <mesh rotation={[Math.PI / 4, 0, 0]} position={[0, 0.3, 0]} material={metalMaterial}>
                        <boxGeometry args={[0.1, 0.6, 0.1]} />
                    </mesh>
                    <mesh rotation={[Math.PI / 1.5, 0, 0]} position={[0, 0.5, 0.15]} material={metalMaterial}>
                        <coneGeometry args={[0.05, 0.3, 8]} />
                    </mesh>
                </group>
            ))}

            {/* Side Details */}
            <mesh position={[0.42, 0, 0]}>
                <boxGeometry args={[0.1, 0.8, 2]} />
                <meshStandardMaterial color="#333" metalness={0.9} roughness={0.1} />
            </mesh>
            <mesh position={[-0.42, 0, 0]}>
                <boxGeometry args={[0.1, 0.8, 2]} />
                <meshStandardMaterial color="#333" metalness={0.9} roughness={0.1} />
            </mesh>

        </group>
    );
}
