'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function Batarang3D() {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += delta * 0.5;
            meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
        }
    });

    const batShape = new THREE.Shape();

    // Start at bottom tip
    batShape.moveTo(0, -0.8);

    // Right bottom curve
    batShape.bezierCurveTo(0.5, -0.5, 1.5, -0.2, 2, 0.5);

    // Right wing tip
    batShape.lineTo(3.5, 1.5);

    // Right top distinct curves (scalloped edge)
    batShape.bezierCurveTo(2.5, 1.2, 2, 0.5, 1.5, 1.0);
    batShape.bezierCurveTo(1.0, 0.8, 0.8, 1.5, 0.5, 1.2);

    // Head/Ears
    batShape.lineTo(0.2, 1.8); // Right ear tip
    batShape.lineTo(0, 1.5);   // Head center divot
    batShape.lineTo(-0.2, 1.8); // Left ear tip

    // Left top curves
    batShape.lineTo(-0.5, 1.2);
    batShape.bezierCurveTo(-0.8, 1.5, -1.0, 0.8, -1.5, 1.0);
    batShape.bezierCurveTo(-2, 0.5, -2.5, 1.2, -3.5, 1.5);

    // Left wing tip
    batShape.lineTo(-3.5, 1.5); // Redundant? No, ensures sharp point

    // Left bottom curve
    batShape.lineTo(-2, 0.5);
    batShape.bezierCurveTo(-1.5, -0.2, -0.5, -0.5, 0, -0.8);

    const extrudeSettings = {
        steps: 2,
        depth: 0.2,
        bevelEnabled: true,
        bevelThickness: 0.05,
        bevelSize: 0.05,
        bevelOffset: 0,
        bevelSegments: 3
    };

    return (
        <mesh ref={meshRef} position={[0, 0, 0]} scale={[0.8, 0.8, 0.8]}>
            <extrudeGeometry args={[batShape, extrudeSettings]} />
            <meshStandardMaterial
                color="#1a1a1a"
                roughness={0.4}
                metalness={0.8}
                side={THREE.DoubleSide}
            />
        </mesh>
    );
}
