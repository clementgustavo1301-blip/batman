'use client';

export default function Batsuit() {
    return (
        <mesh scale={[1.5, 1.5, 1.5]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshBasicMaterial color="red" wireframe />
        </mesh>
    );
}
