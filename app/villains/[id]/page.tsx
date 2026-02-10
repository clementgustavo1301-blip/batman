'use client';

import { useParams } from 'next/navigation';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import villains, { Project } from '@/data/villains';
import SystemShell from '@/components/SystemShell';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import HoloProject from '@/components/3d/HoloProject';

export default function VillainDetailPage() {
    const params = useParams();
    const villain = villains.find((v) => v.id === params.id);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    if (!villain) {
        return (
            <SystemShell title="ERROR_404">
                <div className="text-red-500 font-mono text-center p-20 border border-red-900 bg-red-900/10">
                    FILE_NOT_FOUND // DATA_CORRUPTED
                </div>
            </SystemShell>
        );
    }

    return (
        <SystemShell title={`RECORD_${villain.id.toUpperCase()}`}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative">

                {/* Visual ID / Mugshot Column */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="aspect-[4/5] bg-black border border-gray-800 relative overflow-hidden group shadow-2xl">
                        {/* Mugshot Image Logic */}
                        <div className="absolute inset-0">
                            {/* Fallback pattern */}
                            <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
                                <span className="font-mono text-6xl text-gray-800 select-none">?</span>
                            </div>

                            <img
                                src={villain.image || `/villains/${villain.id}.jpg`}
                                alt={villain.name}
                                className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-700 grayscale group-hover:grayscale-0 relative z-10 mix-blend-normal"
                                onError={(e) => { e.currentTarget.style.display = 'none'; }}
                            />

                            {/* Cinematic Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 z-20" />
                            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent opacity-60 z-20" />
                        </div>

                        {/* Overlay Data */}
                        <div className="absolute bottom-4 left-4 font-mono text-xs space-y-1 text-wayne-gold z-30">
                            <div className="bg-black/80 px-2 py-1 inline-block backdrop-blur-md border-l-2 border-wayne-gold">
                                SUBJECT: {villain.name.toUpperCase()}
                            </div>
                            <div className="block mt-1">
                                <span className="bg-black/80 px-2 py-1 backdrop-blur-md border-l-2 border-red-900 text-red-500">
                                    THREAT: LEVEL {villain.threatLevel}
                                </span>
                            </div>
                        </div>

                        {/* Scanline on image */}
                        <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.8)_50%)] bg-[length:100%_4px] opacity-20 pointer-events-none z-20" />
                        <div className="absolute inset-0 border-[1px] border-wayne-gold/10 pointer-events-none z-30" />
                    </div>

                    {/* Bio Data */}
                    <div className="bg-batman-dark/50 border-l-2 border-wayne-gold p-4 font-mono text-xs text-gray-400 space-y-3 backdrop-blur-sm">
                        <div className="flex justify-between border-b border-gray-800 pb-2">
                            <span>ALIAS:</span>
                            <span className="text-white">{villain.alias}</span>
                        </div>
                        <div className="flex justify-between border-b border-gray-800 pb-2">
                            <span>STATUS:</span>
                            <span className="text-red-500 blink-slow">AT LARGE</span>
                        </div>
                        <div className="pt-2">
                            <span className="block mb-2 text-gray-600 uppercase tracking-widest">Psych Profile:</span>
                            <p className="leading-relaxed text-gray-300 italic">"{villain.tagline}"</p>
                            <p className="leading-relaxed mt-2">{villain.description}</p>
                        </div>
                    </div>
                </div>

                {/* Projects / Incidents Column */}
                <div className="lg:col-span-8">
                    <h3 className="font-mono text-sm text-gray-500 mb-6 border-b border-gray-800 pb-2 flex items-center gap-2">
                        <div className="w-2 h-2 bg-wayne-gold animate-pulse"></div>
                        KNOWN_INCIDENTS (CASE FILES)
                    </h3>

                    <div className="space-y-6">
                        {villain.caseFiles.map((project) => (
                            <motion.div
                                key={project.id}
                                layoutId={`project-card-${project.id}`}
                                onClick={() => setSelectedProject(project)}
                                className="bg-black/40 border border-gray-800 p-6 relative overflow-hidden group hover:border-wayne-gold/50 transition-colors cursor-pointer"
                            >
                                <div className="absolute top-0 left-0 w-1 h-full bg-wayne-gold opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                <div className="flex justify-between items-start mb-4">
                                    <h4 className="font-gotham text-xl text-white group-hover:text-wayne-gold transition-colors">{project.title}</h4>
                                    <span className="font-mono text-xs text-gray-600 border border-gray-800 px-2 py-1 group-hover:border-wayne-gold/30">CASE #{project.id.toUpperCase()}</span>
                                </div>

                                <p className="text-gray-400 text-sm mb-4 leading-relaxed font-mono line-clamp-2">
                                    {project.description}
                                </p>

                                <div className="flex gap-2 flex-wrap">
                                    {project.tech.slice(0, 3).map((tech) => (
                                        <span key={tech} className="text-xs font-mono bg-gray-900 text-wayne-gold/80 px-2 py-1 rounded-sm border border-gray-800">
                                            {tech}
                                        </span>
                                    ))}
                                    {project.tech.length > 3 && (
                                        <span className="text-xs font-mono bg-gray-900 text-gray-500 px-2 py-1 rounded-sm border border-gray-800">
                                            +{project.tech.length - 3}
                                        </span>
                                    )}
                                </div>

                                {/* Hover "Open" Hint */}
                                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity text-xs font-mono text-wayne-gold flex items-center gap-1">
                                    <span>OPEN_HOLOGRAPHIC_VIEW</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

            </div>

            {/* PROJECT VIEWER MODAL - 3D HOLOGRAPHIC EDITION */}
            <AnimatePresence>
                {selectedProject && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-10 bg-black/90 backdrop-blur-md"
                        onClick={() => setSelectedProject(null)}
                    >
                        <motion.div
                            layoutId={`project-card-${selectedProject.id}`}
                            className="bg-gray-900 border border-wayne-gold/30 w-full h-full md:max-w-6xl md:h-[80vh] overflow-hidden relative shadow-[0_0_50px_rgba(201,169,97,0.1)] flex flex-col md:flex-row"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setSelectedProject(null)}
                                className="absolute top-4 right-4 z-50 p-2 text-gray-500 hover:text-white bg-black/50 hover:bg-red-900/50 border border-transparent hover:border-red-500 transition-all rounded-full"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>

                            {/* 3D HOLOGRAPHIC VIEWER (Left/Top) */}
                            <div className="w-full md:w-1/2 bg-black relative h-[40vh] md:h-full border-b md:border-b-0 md:border-r border-wayne-gold/20">

                                <div className="absolute top-4 left-4 z-10 font-mono text-xs text-wayne-gold/70 pointer-events-none">
                                    [HOLOGRAPHIC_PROJECTION_ACTIVE]
                                    <br />
                                    ROTATION_ENABLED
                                </div>

                                <Canvas camera={{ position: [0, 0, 7], fov: 45 }}>
                                    <HoloProject color={villain.primaryColor || '#C9A961'} />
                                    <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
                                    <Environment preset="city" />
                                </Canvas>

                                {/* Tech Stack List Overlay (Bottom of 3D View) */}
                                <div className="absolute bottom-0 left-0 p-6 w-full z-10 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none">
                                    <h4 className="font-mono text-xs text-gray-500 mb-2 uppercase tracking-widest">Tech Stack Signature</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedProject.tech.map(tech => (
                                            <span key={tech} className="text-[10px] font-mono bg-wayne-gold/10 text-wayne-gold border border-wayne-gold/30 px-2 py-1">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Content Section (Right/Bottom) */}
                            <div className="flex-1 p-8 md:p-12 space-y-6 overflow-y-auto bg-batman-dark/95">
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className={`text-[${villain.primaryColor || '#C9A961'}] text-xs font-mono border border-current px-1`}>CONFIDENTIAL</span>
                                        <span className="text-gray-600 text-xs font-mono">CASE ID: {selectedProject.id.toUpperCase()}</span>
                                    </div>
                                    <h2 className="font-gotham text-3xl md:text-5xl text-white mb-6 tracking-wide">{selectedProject.title}</h2>

                                    <div className="prose prose-invert max-w-none">
                                        <p className="text-gray-300 font-mono text-sm leading-relaxed border-l-2 border-gray-700 pl-4 py-2 mb-6">
                                            {selectedProject.description}
                                        </p>

                                        <h3 className="text-gray-500 font-mono text-xs uppercase tracking-widest border-b border-gray-800 pb-1 mb-3">Detailed Analysis</h3>
                                        <p className="text-gray-400 text-sm leading-7">
                                            {selectedProject.fullDescription || "System analysis indicates high complexity architecture. Full schematics are currently encrypted pending Level 5 clearance."}
                                        </p>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="pt-8 flex gap-4 mt-auto">
                                    {selectedProject.demoUrl && (
                                        <a
                                            href={selectedProject.demoUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-6 py-3 bg-wayne-gold text-black font-bold font-mono text-xs tracking-widest hover:bg-white transition-colors flex items-center gap-2"
                                        >
                                            LIVE SYSTEM
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                            </svg>
                                        </a>
                                    )}
                                    {selectedProject.repoUrl && (
                                        <a
                                            href={selectedProject.repoUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-6 py-3 border border-gray-600 text-gray-400 font-bold font-mono text-xs tracking-widest hover:border-white hover:text-white transition-colors flex items-center gap-2"
                                        >
                                            SOURCE CODE
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-1.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                            </svg>
                                        </a>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </SystemShell>
    );
}
