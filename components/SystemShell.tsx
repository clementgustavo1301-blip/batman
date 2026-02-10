'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { pageTransitionVariants } from '@/utils/animations';

interface SystemShellProps {
    children: React.ReactNode;
    title: string;
}

export default function SystemShell({ children, title }: SystemShellProps) {
    const pathname = usePathname();
    const pathSegments = pathname.split('/').filter(Boolean);
    const [isBooting, setIsBooting] = useState(true);

    // System-wide boot effect on mount
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsBooting(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="min-h-screen bg-rich-dark pt-24 px-4 pb-12 relative overflow-x-hidden">

            {/* Boot Overlay - Runs on every page load */}
            <AnimatePresence>
                {isBooting && (
                    <motion.div
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center font-mono text-wayne-gold"
                    >
                        <div className="w-64 space-y-2">
                            <div className="border-b border-wayne-gold/30 pb-2 mb-4 text-xs tracking-widest text-center">
                                ACCESSING_MODULE // {title.split('_')[0]}
                            </div>
                            <div className="flex justify-between text-xs text-gray-500">
                                <span>DECRYPTING...</span>
                                <span>{Math.floor(Math.random() * 99)}%</span>
                            </div>
                            {/* Progress Bar */}
                            <motion.div
                                className="h-1 bg-wayne-gold/20 w-full overflow-hidden"
                            >
                                <motion.div
                                    className="h-full bg-wayne-gold"
                                    initial={{ width: "0%" }}
                                    animate={{ width: "100%" }}
                                    transition={{ duration: 1.8, ease: "easeInOut" }}
                                />
                            </motion.div>
                            <div className="text-right text-[10px] text-gray-600 pt-1">v9.4.2</div>
                        </div>

                        {/* Scanlines on Boot */}
                        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px]" />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* HUD Header */}
            <header className="fixed top-0 left-0 right-0 h-16 bg-batman-dark/95 border-b border-wayne-gold/30 flex items-center justify-between px-6 z-40 backdrop-blur-sm">
                <div className="flex items-center gap-6">
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-2 h-2 bg-red-500 rounded-full group-hover:bg-wayne-gold transition-colors" />
                        <span className="font-mono text-wayne-gold tracking-widest text-xs group-hover:text-white transition-colors">
                            WAYNETECH_OS // ROOT
                        </span>
                    </Link>

                    {/* Breadcrumbs */}
                    <div className="hidden md:flex items-center gap-2 font-mono text-xs text-gray-500">
                        {pathSegments.map((segment, index) => (
                            <div key={segment} className="flex items-center gap-2">
                                <span>/</span>
                                <span className={index === pathSegments.length - 1 ? 'text-wayne-gold' : ''}>
                                    {segment.toUpperCase()}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="font-mono text-xs text-gray-500 flex items-center gap-4">
                    <span className="hidden md:inline">RAM: 64TB</span>
                    <span className="text-wayne-gold">SECURE_CHANNEL</span>
                </div>
            </header>

            {/* Main Content Area */}
            <motion.main
                variants={pageTransitionVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="max-w-7xl mx-auto relative z-10"
            >
                <div className="flex items-center justify-between mb-8 border-b border-gray-800 pb-4">
                    <h1 className="font-gotham text-3xl md:text-4xl text-white tracking-tight">
                        {title}
                    </h1>
                    <div className="font-mono text-xs text-gray-600">
                        MODULE_ID: {Math.floor(Math.random() * 9999)}
                    </div>
                </div>

                {children}
            </motion.main>

            {/* Background Grid */}
            <div className="fixed inset-0 pointer-events-none z-0 opacity-20"
                style={{
                    backgroundImage: 'linear-gradient(rgba(201,169,97,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(201,169,97,0.05) 1px, transparent 1px)',
                    backgroundSize: '50px 50px'
                }}
            />

            {/* Scanlines */}
            <div className="fixed inset-0 pointer-events-none z-[60] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_2px,3px_100%]" />
        </div>
    );
}
