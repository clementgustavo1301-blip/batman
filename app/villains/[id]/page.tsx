'use client';

import { useParams } from 'next/navigation';
import villains from '@/data/villains';
import SystemShell from '@/components/SystemShell';

export default function VillainDetailPage() {
    const params = useParams();
    const villain = villains.find((v) => v.id === params.id);

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
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* Visual ID / Mugshot Column */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="aspect-[4/5] bg-black border border-gray-800 relative overflow-hidden group shadow-2xl">

                        {/* Mugshot Image Logic */}
                        <div className="absolute inset-0">
                            {/* Fallback pattern if image fails (hidden if img loads) */}
                            <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
                                <span className="font-mono text-6xl text-gray-800 select-none">?</span>
                            </div>

                            <img
                                src={villain.image || `/villains/${villain.id}.jpg`}
                                alt={villain.name}
                                className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-700 grayscale group-hover:grayscale-0 relative z-10 mix-blend-normal"
                                onError={(e) => {
                                    // Fallback to stylized placeholder on error
                                    e.currentTarget.style.display = 'none';
                                }}
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

                        {/* Frame */}
                        <div className="absolute inset-0 border-[1px] border-wayne-gold/10 pointer-events-none z-30" />
                        <div className="absolute top-0 right-0 p-2 z-30">
                            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-[0_0_10px_red]" />
                        </div>
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
                            <p className="leading-relaxed text-gray-300 italic">
                                "{villain.tagline}"
                            </p>
                            <p className="leading-relaxed mt-2">
                                {villain.description}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Projects / Incidents Column */}
                <div className="lg:col-span-8">
                    <h3 className="font-mono text-sm text-gray-500 mb-6 border-b border-gray-800 pb-2 flex items-center gap-2">
                        <div className="w-2 h-2 bg-wayne-gold animate-pulse"></div>
                        KNOWN_INCIDENTS (Projects)
                    </h3>

                    <div className="space-y-6">
                        {villain.caseFiles.map((project) => (
                            <div key={project.id} className="bg-black/40 border border-gray-800 p-6 relative overflow-hidden group hover:border-wayne-gold/30 transition-colors">
                                <div className="absolute top-0 left-0 w-1 h-full bg-wayne-gold opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                <div className="flex justify-between items-start mb-4">
                                    <h4 className="font-gotham text-xl text-white group-hover:text-wayne-gold transition-colors">{project.title}</h4>
                                    <span className="font-mono text-xs text-gray-600 border border-gray-800 px-2 py-1">CASE #{project.id.toUpperCase()}</span>
                                </div>

                                <p className="text-gray-400 text-sm mb-4 leading-relaxed font-mono">
                                    {project.description}
                                </p>

                                <div className="flex gap-2 flex-wrap">
                                    {project.tech.map((tech) => (
                                        <span key={tech} className="text-xs font-mono bg-gray-900 text-wayne-gold/80 px-2 py-1 rounded-sm border border-gray-800">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </SystemShell>
    );
}
