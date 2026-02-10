'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { createPhoneRingtone } from '@/utils/ringtone';

type Character = 'alfred' | 'joker';

interface IncomingCallProps {
    show: boolean;
    character: Character;
    onAccept: () => void;
    onDecline: () => void;
    children: React.ReactNode;
    isAccepted: boolean;
}

export default function IncomingCall({
    show,
    character,
    onAccept,
    onDecline,
    children,
    isAccepted
}: IncomingCallProps) {
    const isAlfred = character === 'alfred';
    const [isHacking, setIsHacking] = useState(false);
    const [hackProgress, setHackProgress] = useState(0);
    const [hackLogs, setHackLogs] = useState<string[]>([]);
    const [hasHacked, setHasHacked] = useState(false);

    // Identity logic: Joker is "UNKNOWN" until hacked (or normally)
    const displayName = isAlfred ? 'ALFRED' : (hasHacked ? 'CORINGA' : 'UNKNOWN');
    const displayRole = isAlfred ? 'SECURE LINE' : (hasHacked ? 'LOCATION: BATCAVERNA' : 'RESTRICTED ID');

    const cleanupRef = useRef<(() => void) | undefined>();
    const logIntervalRef = useRef<NodeJS.Timeout | null>(null);

    // Play ringtone when call appears (only if not accepted yet)
    useEffect(() => {
        if (show && !isAccepted && !isHacking) {
            cleanupRef.current = createPhoneRingtone();
        }

        return () => {
            if (cleanupRef.current) {
                cleanupRef.current();
                cleanupRef.current = undefined;
            }
            if (logIntervalRef.current) {
                clearInterval(logIntervalRef.current);
            }
        };
    }, [show, isAccepted, isHacking]);

    const handleAccept = () => {
        stopRingtone();
        onAccept();
    };

    const handleDecline = () => {
        stopRingtone();
        onDecline();
    };

    const stopRingtone = () => {
        if (cleanupRef.current) {
            cleanupRef.current();
            cleanupRef.current = undefined;
        }
    };

    // Hacking Logic
    const startHack = () => {
        setIsHacking(true);
        setHackProgress(0);
        setHackLogs(['INITIALIZING BRUTE FORCE...']);
        // Ringtone continues playing during hack as per user request ("o coringa continua falando no audio")

        // Hacking Simulation
        let progress = 0;
        const totalDuration = 3000; // 3 seconds to hack
        const intervalTime = 100;
        const steps = totalDuration / intervalTime;
        const increment = 100 / steps;

        const possibleLogs = [
            "BYPASSING FIREWALL...",
            "INJECTING PAYLOAD...",
            "DECRYPTING AUDIO STREAM...",
            "RE-ROUTING SIGNAL...",
            "OVERRIDING SECURITY PROTOCOL...",
            "ACCESSING MAINFRAME...",
            "DECODING KEY...",
            "ESTABLISHING SECURE LINK..."
        ];

        const timer = setInterval(() => {
            progress += increment;
            setHackProgress(Math.min(progress, 100));

            // Add random log
            if (Math.random() > 0.6) {
                const randomLog = possibleLogs[Math.floor(Math.random() * possibleLogs.length)];
                setHackLogs(prev => [...prev.slice(-4), randomLog]); // Keep last 5
            }

            if (progress >= 100) {
                clearInterval(timer);
                setTimeout(() => {
                    setHasHacked(true);
                    setIsHacking(false);
                    if (!isAccepted) {
                        handleAccept();
                    }
                }, 500);
            }
        }, intervalTime);
    };

    return (
        <AnimatePresence>
            {show && (
                <>
                    {/* Backdrop - Blur effect */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-0 md:p-8"
                    >
                        {/* Smartphone Container */}
                        <motion.div
                            initial={{ y: 1000, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 1000, opacity: 0 }}
                            transition={{ type: "spring", damping: 20 }}
                            className={`relative w-full h-full md:w-[375px] md:h-[812px] md:max-h-[90vh] 
                                overflow-hidden md:rounded-[3rem] shadow-2xl border-4
                                ${isAlfred ? 'border-gray-800 bg-black' : 'border-gray-900 bg-black'}
                            `}
                        >
                            {/* HAHAHA Overlay Logic */}
                            {hasHacked && !isAlfred && (
                                <div className="absolute inset-0 z-50 pointer-events-none overflow-hidden mix-blend-color-dodge">
                                    {[...Array(50)].map((_, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{
                                                opacity: 0,
                                                x: Math.random() * 400 - 200,
                                                y: Math.random() * 800 - 400,
                                                scale: 0.5
                                            }}
                                            animate={{
                                                opacity: [0, 1, 0],
                                                scale: [0.5, 2, 3],
                                                rotate: [0, Math.random() * 180 - 90]
                                            }}
                                            transition={{
                                                duration: 1 + Math.random() * 2,
                                                repeat: Infinity,
                                                delay: Math.random() * 3,
                                                ease: "easeOut"
                                            }}
                                            className="absolute left-1/2 top-1/2 text-purple-600/60 font-bold font-mono text-2xl md:text-5xl whitespace-nowrap select-none"
                                        >
                                            HAHAHA
                                        </motion.div>
                                    ))}
                                </div>
                            )}

                            {/* Device Frame Details (Desktop only) */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-black rounded-b-2xl z-50 hidden md:block"></div>

                            {/* Minimal Background (Discreet) */}
                            {!isAlfred && (
                                <div className="absolute inset-0 z-0 bg-gray-900"></div>
                            )}

                            {/* Main Content Area */}
                            <div className="h-full flex flex-col items-center justify-between py-16 px-6 relative z-10 w-full">

                                {/* Top Info */}
                                <div className="text-center space-y-2 mt-8 w-full">
                                    {!isAccepted && !isHacking && (
                                        <div className="flex flex-col items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                                            <span className="font-mono text-xs tracking-[0.2em] text-white/50 uppercase">Incoming Call...</span>
                                        </div>
                                    )}

                                    {isHacking ? (
                                        <div className="text-green-500 font-mono text-sm tracking-widest animate-pulse">
                                            HACKING IN PROGRESS...
                                        </div>
                                    ) : (
                                        <>
                                            <h2 className={`font-bold text-3xl md:text-4xl tracking-widest mt-4 ${hasHacked && !isAlfred ? 'text-purple-500 glitch-text' : 'text-white'}`}>
                                                {displayName}
                                            </h2>
                                            <p className={`text-xs tracking-widest uppercase ${hasHacked ? 'text-red-500 font-bold animate-pulse' : 'text-gray-500'}`}>
                                                {isAccepted ? (
                                                    hasHacked ? 'LOCATION: BATCAVERNA' : 'CONNECTED 00:01'
                                                ) : displayRole}
                                            </p>
                                        </>
                                    )}
                                </div>

                                {/* Avatar / Visualizer / Hacking Interface */}
                                <div className="flex-1 flex items-center justify-center w-full relative">
                                    {isHacking ? (
                                        // Hacking Interface
                                        <div className="w-full h-full flex flex-col items-center justify-center space-y-4 px-4">
                                            {/* Glitchy Lock Icon */}
                                            <motion.div
                                                animate={{
                                                    scale: [1, 1.1, 1],
                                                    rotate: [0, 5, -5, 0],
                                                    opacity: [0.8, 1, 0.8]
                                                }}
                                                transition={{ duration: 0.2, repeat: Infinity }}
                                                className="text-green-500 mb-4"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                                </svg>
                                            </motion.div>

                                            {/* Terminal Logs */}
                                            <div className="w-full h-32 bg-black/50 border border-green-900/50 p-2 font-mono text-[10px] text-green-500 overflow-hidden flex flex-col justify-end">
                                                {hackLogs.map((log, i) => (
                                                    <motion.div
                                                        key={i}
                                                        initial={{ opacity: 0, x: -10 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        className="truncate"
                                                    >
                                                        {`> ${log}`}
                                                    </motion.div>
                                                ))}
                                            </div>

                                            {/* Progress Bar */}
                                            <div className="w-full h-2 bg-gray-900 rounded-full overflow-hidden border border-green-900">
                                                <motion.div
                                                    className="h-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]"
                                                    style={{ width: `${hackProgress}%` }}
                                                />
                                            </div>
                                            <div className="w-full text-right text-green-500 text-xs font-mono">
                                                {Math.round(hackProgress)}% COMPLETE
                                            </div>
                                        </div>
                                    ) : isAccepted && !hasHacked ? (
                                        // Active Call Visualizer (Pre-Hack)
                                        <div className="flex flex-col items-center gap-8 w-full">
                                            {/* Standard Visualizer */}
                                            <div className="flex items-center gap-1 h-12">
                                                {[...Array(5)].map((_, i) => (
                                                    <motion.div
                                                        key={i}
                                                        animate={{ height: [10, 30, 10] }}
                                                        transition={{
                                                            repeat: Infinity,
                                                            duration: 0.5 + Math.random() * 0.5,
                                                            delay: i * 0.1
                                                        }}
                                                        className="w-2 bg-green-500 rounded-full"
                                                    />
                                                ))}
                                            </div>

                                            {/* HACK BUTTON (In-Call) - ENSURED VISIBILITY */}
                                            {!isAlfred && (
                                                <div className="w-full flex justify-center z-50">
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            startHack();
                                                        }}
                                                        className="animate-pulse bg-black/50 backdrop-blur-sm text-xs text-amber-500 font-mono tracking-widest border border-amber-600/50 px-6 py-3 hover:bg-amber-600/20 rounded-full flex items-center gap-2 shadow-[0_0_15px_rgba(245,158,11,0.2)]"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.2-2.858.59-4.18" />
                                                        </svg>
                                                        DECRYPT SIGNAL
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        // Caller Avatar (Hacked or Initial)
                                        <div className={`relative w-40 h-40 rounded-full overflow-hidden border-2 bg-gray-900 shadow-inner group ${hasHacked ? 'border-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.5)]' : 'border-gray-800'}`}>
                                            {isAlfred ? (
                                                <img
                                                    src="https://static.wikia.nocookie.net/batman/images/e/e6/Alfred_Pennyworth_Infobox.jpg"
                                                    className="w-full h-full object-cover grayscale opacity-50"
                                                    alt="Caller"
                                                />
                                            ) : hasHacked ? (
                                                // REVEALED IDENTITY
                                                <motion.img
                                                    initial={{ opacity: 0, scale: 0.8 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    transition={{ duration: 0.5 }}
                                                    src="https://i.pinimg.com/736x/2c/08/04/2c0804e9d3c4319dc235ce4a259c0ea4.jpg"
                                                    className="w-full h-full object-cover grayscale-[0.2]"
                                                    alt="JOKER"
                                                />
                                            ) : (
                                                // Anonymous Silhouette
                                                <div className="w-full h-full flex items-center justify-center bg-black">
                                                    <svg className="w-20 h-20 text-gray-800" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                                    </svg>
                                                </div>
                                            )}

                                            {/* Glitch Overlay for Unknown */}
                                            {!isAlfred && !hasHacked && (
                                                <div className="absolute inset-0 bg-red-900/10 mix-blend-overlay animate-pulse"></div>
                                            )}
                                        </div>
                                    )}
                                </div>

                                {/* Action Area */}
                                <div className="w-full space-y-4 mb-8 min-h-[160px] flex flex-col justify-end">
                                    {!isAccepted && !isHacking ? (
                                        <>
                                            {/* Slide to Answer */}
                                            <div className="relative h-16 w-full bg-white/5 rounded-full backdrop-blur-sm overflow-hidden p-1 border border-white/10">
                                                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 text-xs font-bold tracking-widest pointer-events-none">
                                                    slide to answer
                                                </div>

                                                <motion.div
                                                    drag="x"
                                                    dragConstraints={{ left: 0, right: 280 }}
                                                    dragElastic={0.1}
                                                    dragSnapToOrigin
                                                    onDragEnd={(_, info) => {
                                                        if (info.offset.x > 200) {
                                                            handleAccept();
                                                        }
                                                    }}
                                                    className="h-full aspect-square rounded-full flex items-center justify-center cursor-grab active:cursor-grabbing shadow-lg bg-green-900/80 border border-green-500/50"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                    </svg>
                                                </motion.div>
                                            </div>

                                            {/* HACK BUTTON */}
                                            <div className="flex justify-center w-full">
                                                <button
                                                    onClick={startHack}
                                                    className="group relative px-6 py-2 overflow-hidden rounded bg-transparent border border-amber-600/50 text-amber-500 font-mono text-xs tracking-[0.2em] transition-all hover:bg-amber-600/10 hover:border-amber-500 hover:text-amber-400 hover:shadow-[0_0_15px_rgba(245,158,11,0.3)]"
                                                >
                                                    <span className="relative z-10 flex items-center gap-2">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                                        </svg>
                                                        HACK SECURE LINE
                                                    </span>
                                                </button>
                                            </div>

                                            {/* Decline Button */}
                                            <div className="flex justify-center mt-2">
                                                <button
                                                    onClick={handleDecline}
                                                    className="text-xs text-red-900/50 hover:text-red-500 transition-colors tracking-widest uppercase font-bold"
                                                >
                                                    Decline
                                                </button>
                                            </div>
                                        </>
                                    ) : isHacking ? (
                                        // Hacking Controls (Abort)
                                        <div className="flex justify-center w-full">
                                            <button
                                                onClick={() => {
                                                    setIsHacking(false);
                                                    // We don't decline here if it was already accepted, just abort hack
                                                }}
                                                className="text-xs text-red-500 font-mono tracking-widest border border-red-900/50 px-4 py-2 hover:bg-red-900/20"
                                            >
                                                ABORT HACK SEQUENCE
                                            </button>
                                        </div>
                                    ) : (
                                        // End Call Button (Active State)
                                        <div className="flex flex-col items-center justify-center gap-4 h-full">
                                            {/* Audio Logic Embedded */}
                                            <div className="hidden">
                                                {children}
                                            </div>

                                            <button
                                                onClick={handleDecline}
                                                className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center shadow-lg hover:bg-red-700 transition-colors"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8l2-2m0 0l2-2m-2 2l-2 2m7.5 5.5L21 21m-9-1c2-2.5 5-2.5 5-2.5v-1l-2-2-2 2s-3 0-5 2.5V3a2 2 0 00-2-2 2 2 0 00-2 2v14l-4 4" />
                                                </svg>
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
