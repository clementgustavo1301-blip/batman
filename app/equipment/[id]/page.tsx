'use client';

import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls, Html, useProgress } from '@react-three/drei';
import Link from 'next/link';

import Batsuit from '@/components/3d/Batsuit';
import BatsuitModel from '@/components/3d/BatsuitModel';
import Batarang3D from '@/components/3d/Batarang';
import GrapnelGun from '@/components/3d/GrapnelGun';
import SystemShell from '@/components/SystemShell';
import { equipmentList } from '@/data/equipment';
import { pageTransitionVariants } from '@/utils/animations';

function ModelLoader() {
    const { progress } = useProgress();
    return (
        <Html center>
            <div className="font-mono text-wayne-gold text-lg whitespace-nowrap bg-black/80 px-4 py-2 border border-wayne-gold/30 backdrop-blur-md">
                LOADING_SCHEMATIC: {progress.toFixed(0)}%
            </div>
        </Html>
    );
}

export default function EquipmentDetail() {
    const params = useParams();
    const id = params.id as string;
    const item = equipmentList.find((e) => e.id === id);

    if (!item) {
        return (
            <SystemShell title="ERROR // NOT_FOUND">
                <div className="flex flex-col items-center justify-center h-[60vh] text-wayne-gold/50 font-mono">
                    <h2 className="text-2xl mb-4">UNK_ASSET_ID: {id}</h2>
                    <Link href="/equipment" className="border border-wayne-gold/30 px-4 py-2 hover:bg-wayne-gold/10 transition-colors">
                        &lt; RETURN_TO_DATABASE
                    </Link>
                </div>
            </SystemShell>
        );
    }

    return (
        <SystemShell title={`TECH_SPECS // ${item.name.toUpperCase()}`}>
            <motion.div
                variants={pageTransitionVariants}
                initial="initial"
                animate="animate"
                className="flex flex-col lg:flex-row gap-8 h-[calc(100vh-140px)]"
            >
                {/* Left Column: 3D Visualization */}
                <div className="flex-1 relative card-gradient border border-gray-800 rounded-lg overflow-hidden min-h-[400px]">
                    {/* Blueprint Grid Background */}
                    <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
                        style={{
                            backgroundImage: 'linear-gradient(#C9A961 1px, transparent 1px), linear-gradient(90deg, #C9A961 1px, transparent 1px)',
                            backgroundSize: '40px 40px'
                        }}
                    />

                    <div className="absolute top-4 left-4 z-10">
                        <Link href="/equipment" className="text-xs font-mono text-gray-500 hover:text-wayne-gold transition-colors flex items-center gap-2">
                            <span>&lt; BACK</span>
                        </Link>
                    </div>

                    <div className="absolute inset-0">
                        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                            <ambientLight intensity={0.5} />
                            <pointLight position={[10, 10, 10]} intensity={1} color="#4455bb" />
                            <pointLight position={[-10, 5, -5]} intensity={0.5} />
                            <spotLight position={[0, 10, 0]} intensity={0.8} />

                            <Suspense fallback={<ModelLoader />}>
                                {item.id === 'batsuit-v1' && <BatsuitModel path="/models/batsuit-v1.glb" />}
                                {item.id === 'batsuit-v2' && <BatsuitModel path="/models/batsuit-v2.glb" />}
                                {item.id === 'batsuit-v8' && <Batsuit />}
                                {item.id === 'batarang-exp' && <Batarang3D />}
                                {item.id === 'grapnel-gun' && <GrapnelGun />}
                            </Suspense>

                            <OrbitControls enableZoom={true} autoRotate autoRotateSpeed={0.5} />
                            <Environment preset="city" />
                        </Canvas>
                    </div>
                </div>

                {/* Right Column: Data & Specs */}
                <div className="w-full lg:w-96 flex flex-col gap-6 overflow-y-auto pr-2">

                    {/* Header Data */}
                    <div className="p-6 card-gradient border border-gray-800 rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                            <span className="text-[10px] font-mono text-gray-500">ASSET_ID // {item.id.toUpperCase()}</span>
                            <span className={`text-[10px] font-mono px-2 py-1 border ${item.status === 'operational' ? 'border-green-900 text-green-500 bg-green-900/20' :
                                item.status === 'maintenance' ? 'border-red-900 text-red-500 bg-red-900/20' :
                                    'border-wayne-gold/20 text-wayne-gold/70 bg-wayne-gold/5'
                                }`}>
                                {item.status.toUpperCase()}
                            </span>
                        </div>
                        <h1 className="text-2xl font-bold font-mono text-gray-100 mb-4">{item.name}</h1>
                        <p className="text-sm text-gray-400 leading-relaxed font-mono">
                            {item.description}
                        </p>
                    </div>

                    {/* Specifications */}
                    <div className="p-6 card-gradient border border-gray-800 rounded-lg flex-1">
                        <h3 className="text-sm font-bold text-wayne-gold mb-4 font-mono border-b border-gray-800 pb-2">TECHNICAL_SPECIFICATIONS</h3>

                        <div className="space-y-4">
                            <div>
                                <span className="block text-[10px] text-gray-600 font-mono mb-1">MATERIAL_COMPOSITION</span>
                                <span className="text-sm text-gray-300 font-mono">{item.specs.material}</span>
                            </div>
                            <div>
                                <span className="block text-[10px] text-gray-600 font-mono mb-1">NET_WEIGHT</span>
                                <span className="text-sm text-gray-300 font-mono">{item.specs.weight}</span>
                            </div>

                            <div className="pt-4">
                                <span className="block text-[10px] text-gray-600 font-mono mb-2">INTEGRATED_FEATURES</span>
                                <ul className="space-y-2">
                                    {item.specs.features.map((feature, i) => (
                                        <li key={i} className="text-xs text-gray-400 font-mono flex items-center gap-2">
                                            <span className="w-1 h-1 bg-wayne-gold rounded-full" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons (Mock) */}
                    <div className="grid grid-cols-2 gap-4">
                        <button className="py-3 bg-wayne-gold/10 border border-wayne-gold/30 text-wayne-gold font-mono text-xs hover:bg-wayne-gold/20 transition-colors">
                            RUN_DIAGNOSTIC
                        </button>
                        <button className="py-3 bg-gray-900 border border-gray-700 text-gray-400 font-mono text-xs hover:bg-gray-800 transition-colors">
                            VIEW_SCHEMATICS
                        </button>
                    </div>

                </div>
            </motion.div>
        </SystemShell>
    );
}
