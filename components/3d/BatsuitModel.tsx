'use client';

import { useGLTF } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

interface BatsuitModelProps {
    path: string;
}

export default function BatsuitModel({ path }: BatsuitModelProps) {
    const groupRef = useRef<THREE.Group>(null);
    const { scene } = useGLTF(path);

    // Clone scene to avoid shared state issues if used multiple times
    const clonedScene = scene.clone();

    return (
        <group ref={groupRef} dispose={null}>
            <primitive object={clonedScene} scale={2.5} position={[0, -2.5, 0]} />
        </group>
    );
}

// Pre-load the models
useGLTF.preload('/models/batsuit-v1.glb');
useGLTF.preload('/models/batsuit-v2.glb');
