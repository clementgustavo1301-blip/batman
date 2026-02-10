'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Stars } from '@react-three/drei';
import * as THREE from 'three';

interface HoloProjectProps {
    color: string;
}

export default function HoloProject({ color }: HoloProjectProps) {
    const meshRef = useRef<THREE.Mesh>(null);
    const ringRef = useRef<THREE.Mesh>(null);

    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += delta * 0.2;
            meshRef.current.rotation.x += delta * 0.1;
        }
        if (ringRef.current) {
            ringRef.current.rotation.z -= delta * 0.1;
            ringRef.current.rotation.x += delta * 0.05;
        }
    });

    return (
        <group>
            {/* Ambient Environment */}
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} color={color} />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ffffff" />

            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>

                {/* Core Data Logic (Icosahedron) */}
                <mesh ref={meshRef}>
                    <icosahedronGeometry args={[1.5, 0]} />
                    <meshStandardMaterial
                        color={color}
                        wireframe
                        emissive={color}
                        emissiveIntensity={0.5}
                        transparent
                        opacity={0.8}
                    />
                </mesh>

                {/* Inner Solid Core */}
                <mesh scale={[0.8, 0.8, 0.8]}>
                    <icosahedronGeometry args={[1, 0]} />
                    <meshStandardMaterial
                        color={color}
                        metalness={0.9}
                        roughness={0.1}
                        transparent
                        opacity={0.3}
                    />
                </mesh>

                {/* Orbital Ring 1 */}
                <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
                    <torusGeometry args={[2.5, 0.02, 16, 100]} />
                    <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.8} />
                </mesh>

                {/* Orbital Ring 2 (Static-ish) */}
                <mesh rotation={[0, Math.PI / 4, 0]}>
                    <torusGeometry args={[3.2, 0.01, 16, 100]} />
                    <meshStandardMaterial color="#444" transparent opacity={0.3} />
                </mesh>

            </Float>
        </group>
    );
}
