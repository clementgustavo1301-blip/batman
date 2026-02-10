'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function Batarang3D() {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state, delta) => {
        if (meshRef.current) {
            // Slower, more menacing rotation
            meshRef.current.rotation.y += delta * 0.8;
            // Slight tilt for dynamic view
            meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.15;
            meshRef.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.3) * 0.05;
        }
    });

    const batShape = new THREE.Shape();

    // TACTICAL BATARANG GEOMETRY
    // Center Bottom
    batShape.moveTo(0, -0.8);

    // Right Wing Bottom Edge (Aggressive Curve)
    batShape.bezierCurveTo(0.5, -0.6, 1.5, -0.4, 3.8, 1.2); // Wing Tip

    // Right Wing Top Edge (Scalloped / Serrated)
    batShape.lineTo(3.8, 1.2);
    batShape.bezierCurveTo(3.0, 1.0, 2.5, 0.2, 1.5, 0.6);
    batShape.lineTo(1.2, 0.6);

    // Shoulder to Ear
    batShape.bezierCurveTo(1.0, 0.8, 0.6, 1.2, 0.4, 1.6); // Right Ear Tip

    // Head Center
    batShape.lineTo(0, 1.2); // Deep V-cut for head

    // Left Ear Tip
    batShape.lineTo(-0.4, 1.6);

    // Shoulder to Wing
    batShape.bezierCurveTo(-0.6, 1.2, -1.0, 0.8, -1.2, 0.6);
    batShape.lineTo(-1.5, 0.6);

    // Left Wing Top Edge
    batShape.bezierCurveTo(-2.5, 0.2, -3.0, 1.0, -3.8, 1.2); // Wing Tip

    // Left Wing Bottom Edge
    batShape.bezierCurveTo(-1.5, -0.4, -0.5, -0.6, 0, -0.8);


    const extrudeSettings = {
        steps: 2,
        depth: 0.15,
        bevelEnabled: true,
        bevelThickness: 0.02,
        bevelSize: 0.02,
        bevelOffset: 0,
        bevelSegments: 5 // Smoother bevels
    };

    return (
        <group scale={[0.8, 0.8, 0.8]}>
            <mesh ref={meshRef}>
                <extrudeGeometry args={[batShape, extrudeSettings]} />
                <meshStandardMaterial
                    color="#111111"       // Darker Black
                    roughness={0.3}       // Less rough, more shiny
                    metalness={0.9}       // High metalness
                    emissive="#000000"
                    side={THREE.DoubleSide}
                />
            </mesh>

            {/* Inner Detail / Tech Line (Optional second mesh for layering) */}
            <mesh position={[0, 0, 0.08]} scale={[0.95, 0.95, 1]}>
                {/* Subtle detail layer if needed, or keeping it clean for now */}
            </mesh>
        </group>

    );
}
