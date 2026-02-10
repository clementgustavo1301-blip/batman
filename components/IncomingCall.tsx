'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef } from 'react';
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

    // Identity logic: Joker is "UNKNOWN"
    const displayName = isAlfred ? 'ALFRED' : 'UNKNOWN';
    const displayRole = isAlfred ? 'SECURE LINE' : 'RESTRICTED ID';

    const cleanupRef = useRef<(() => void) | undefined>();

    // Play ringtone when call appears (only if not accepted yet)
    useEffect(() => {
        if (show && !isAccepted) {
            cleanupRef.current = createPhoneRingtone();
        }

        return () => {
            if (cleanupRef.current) {
                cleanupRef.current();
                cleanupRef.current = undefined;
            }
        };
    }, [show, isAccepted]);

    const handleAccept = () => {
        if (cleanupRef.current) {
            cleanupRef.current();
            cleanupRef.current = undefined;
        }
        onAccept();
    };

    const handleDecline = () => {
        if (cleanupRef.current) {
            cleanupRef.current();
            cleanupRef.current = undefined;
        }
        onDecline();
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
                        {/* Smartphone Container - Mobile First: Full screen on mobile, Phone size on desktop */}
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
                            {/* Device Frame Details (Desktop only) */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-black rounded-b-2xl z-50 hidden md:block"></div>

                            {/* Minimal Background (Discreet) */}
                            {!isAlfred && (
                                <div className="absolute inset-0 z-0 bg-gray-900"></div>
                            )}

                            {/* Main Content Area */}
                            <div className="h-full flex flex-col items-center justify-between py-16 px-6 relative z-10">

                                {/* Top Info */}
                                <div className="text-center space-y-2 mt-8">
                                    {!isAccepted && (
                                        <div className="flex flex-col items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                                            <span className="font-mono text-xs tracking-[0.2em] text-white/50 uppercase">Incoming Call...</span>
                                        </div>
                                    )}

                                    <h2 className="font-bold text-3xl md:text-4xl text-white tracking-widest mt-4">
                                        {displayName}
                                    </h2>

                                    <p className="text-xs tracking-widest text-gray-500 uppercase">
                                        {isAccepted ? 'CONNECTED 00:01' : displayRole}
                                    </p>
                                </div>

                                {/* Avatar / Visualizer */}
                                <div className="flex-1 flex items-center justify-center w-full">
                                    {isAccepted ? (
                                        // Active Call Visualizer
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
                                    ) : (
                                        // Caller Avatar
                                        <div className="relative w-40 h-40 rounded-full overflow-hidden border-2 border-gray-800 bg-gray-900 shadow-inner">
                                            {isAlfred ? (
                                                <img
                                                    src="https://static.wikia.nocookie.net/batman/images/e/e6/Alfred_Pennyworth_Infobox.jpg"
                                                    className="w-full h-full object-cover grayscale opacity-50"
                                                    alt="Caller"
                                                />
                                            ) : (
                                                // Anonymous Silhouette
                                                <div className="w-full h-full flex items-center justify-center bg-black">
                                                    <svg className="w-20 h-20 text-gray-800" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                                    </svg>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>

                                {/* Action Area */}
                                <div className="w-full space-y-8 mb-8 min-h-[120px]">
                                    {!isAccepted ? (
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

                                            {/* Decline Button */}
                                            <div className="flex justify-center">
                                                <button
                                                    onClick={handleDecline}
                                                    className="text-xs text-red-900/50 hover:text-red-500 transition-colors tracking-widest uppercase font-bold"
                                                >
                                                    Decline
                                                </button>
                                            </div>
                                        </>
                                    ) : (
                                        // End Call Button (Active State)
                                        <div className="flex justify-center items-center h-full">
                                            <button
                                                onClick={handleDecline}
                                                className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center shadow-lg hover:bg-red-700 transition-colors"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8l2-2m0 0l2-2m-2 2l-2 2m7.5 5.5L21 21m-9-1c2-2.5 5-2.5 5-2.5v-1l-2-2-2 2s-3 0-5 2.5V3a2 2 0 00-2-2 2 2 0 00-2 2v14l-4 4" />
                                                </svg>
                                            </button>

                                            {/* Audio Logic Embedded */}
                                            <div className="hidden">
                                                {children}
                                            </div>
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
