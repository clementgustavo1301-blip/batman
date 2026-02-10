'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Villain } from '@/data/villains';

interface VillainCardProps {
    villain: Villain;
    index: number;
}

export default function VillainCard({ villain, index }: VillainCardProps) {
    return (
        <Link href={`/villains/${villain.id}`}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                    ease: [0.22, 1, 0.36, 1] // Custom easing for cinematic feel
                }}
                whileHover={{
                    y: -8,
                    transition: { duration: 0.3 }
                }}
                className="relative bg-batman-dark border border-batman-gray p-6 cursor-pointer group overflow-hidden"
            >
                {/* Threat level indicator */}
                <div className="absolute top-4 right-4 flex items-center gap-2">
                    <span className="text-xs text-gray-500 uppercase tracking-wider">Ameaça</span>
                    <div className="flex gap-0.5">
                        {Array.from({ length: 10 }).map((_, i) => (
                            <div
                                key={i}
                                className={`w-1 h-4 ${i < villain.threatLevel
                                        ? 'bg-joker-red'
                                        : 'bg-batman-gray'
                                    }`}
                            />
                        ))}
                    </div>
                </div>

                {/* Image placeholder */}
                <div className="aspect-video bg-batman-gray mb-4 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/50" />
                    <span
                        className="relative z-10 font-mono text-xs text-gray-600 uppercase tracking-widest"
                        style={{ color: villain.primaryColor }}
                    >
                        [Classificado]
                    </span>
                </div>

                {/* Content */}
                <div className="space-y-2">
                    <div className="flex items-baseline justify-between">
                        <h3 className="font-gotham font-bold text-2xl text-parchment group-hover:text-wayne-gold transition-colors duration-300">
                            {villain.name}
                        </h3>
                        <span className="text-xs text-gray-500 uppercase tracking-wider">#{villain.id}</span>
                    </div>

                    <p className="text-sm text-gray-400 font-mono uppercase tracking-wide border-l-2 pl-3" style={{ borderColor: villain.primaryColor }}>
                        {villain.alias}
                    </p>

                    <p className="text-gray-500 text-sm mt-3">
                        {villain.skillCategory}
                    </p>

                    <p className="text-gray-600 text-xs italic mt-2">
                        "{villain.tagline}"
                    </p>

                    <div className="mt-4 pt-4 border-t border-batman-gray">
                        <p className="text-xs text-gray-500">
                            {villain.caseFiles.length} Caso{villain.caseFiles.length !== 1 ? 's' : ''} Arquivado{villain.caseFiles.length !== 1 ? 's' : ''}
                        </p>
                    </div>
                </div>

                {/* Hover effect border */}
                <motion.div
                    className="absolute inset-0 border-2 border-transparent group-hover:border-wayne-gold pointer-events-none"
                    style={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                />
            </motion.div>
        </Link>
    );
}
