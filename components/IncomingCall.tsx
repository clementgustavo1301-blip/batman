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
}

export default function IncomingCall({
    show,
    character,
    onAccept,
    onDecline,
    children
}: IncomingCallProps) {
    const isAlfred = character === 'alfred';
    const cleanupRef = useRef<(() => void) | undefined>();

    // Play ringtone when call appears
    useEffect(() => {
        if (show) {
            cleanupRef.current = createPhoneRingtone();
        }

        return () => {
            if (cleanupRef.current) {
                cleanupRef.current();
                cleanupRef.current = undefined;
            }
        };
    }, [show]);

    const handleAccept = () => {
        // Stop ringtone
        if (cleanupRef.current) {
            cleanupRef.current();
            cleanupRef.current = undefined;
        }
        onAccept();
    };

    const handleDecline = () => {
        // Stop ringtone
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
                                ${isAlfred ? 'border-gray-800 bg-black' : 'border-purple-900 bg-purple-950'}
                            `}
                        >
                            {/* Device Frame Details (Desktop only) */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-black rounded-b-2xl z-50 hidden md:block"></div>

                            {/* Joker CHAOS Overlay */}
                            {!isAlfred && (
                                <div className="absolute inset-0 z-0 pointer-events-none opacity-30 mix-blend-overlay bg-[url('https://media.giphy.com/media/26tP7axeSxDfwdL68/giphy.gif')] bg-cover bg-center"></div>
                            )}

                            {/* Main Content Area */}
                            <div className="h-full flex flex-col items-center justify-between py-16 px-6 relative z-10">

                                {/* Top Info */}
                                <div className="text-center space-y-2 mt-8">
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                                        <span className="font-mono text-xs tracking-[0.2em] text-white/50 uppercase">Incoming Encryption...</span>
                                    </div>

                                    <motion.h2
                                        animate={{ scale: [1, 1.05, 1] }}
                                        transition={{ repeat: Infinity, duration: 2 }}
                                        className={`font-black text-4xl md:text-5xl tracking-tighter
                                            ${isAlfred ? 'text-white' : 'text-[#00ff00] font-[Comic_Sans_MS]'}
                                        `}
                                        style={{ textShadow: !isAlfred ? '2px 2px 0px purple' : 'none' }}
                                    >
                                        {isAlfred ? 'ALFRED' : 'JOKER'}
                                    </motion.h2>

                                    <p className={`text-sm tracking-widest ${isAlfred ? 'text-gray-400' : 'text-purple-300'}`}>
                                        {isAlfred ? 'SECURE LINE' : 'UNKNOWN_LOCATION'}
                                    </p>
                                </div>

                                {/* Avatar / Image */}
                                <motion.div
                                    animate={!isAlfred ? {
                                        x: [0, -5, 5, -5, 5, 0],
                                        filter: ["hue-rotate(0deg)", "hue-rotate(90deg)", "hue-rotate(0deg)"]
                                    } : {}}
                                    transition={{ repeat: Infinity, duration: 0.5, repeatDelay: 3 }}
                                    className="relative w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 shadow-xl mb-4"
                                    style={{ borderColor: isAlfred ? '#C9A961' : '#800080' }}
                                >
                                    <img
                                        src={isAlfred
                                            ? "https://static.wikia.nocookie.net/batman/images/e/e6/Alfred_Pennyworth_Infobox.jpg"
                                            : "https://i.pinimg.com/736x/88/2c/8e/882c8e2285516027ab50849929532598.jpg"
                                        }
                                        className="w-full h-full object-cover"
                                        alt="Caller ID"
                                    />
                                    {/* Glitch Overlay for Joker */}
                                    {!isAlfred && (
                                        <div className="absolute inset-0 bg-green-500/20 mix-blend-color-dodge animate-pulse"></div>
                                    )}
                                </motion.div>

                                {/* Action Area */}
                                <div className="w-full space-y-8 mb-8">

                                    {/* Slide to Answer */}
                                    <div className="relative h-16 w-full bg-white/10 rounded-full backdrop-blur-sm overflow-hidden p-1 border border-white/20">
                                        <motion.div
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 text-sm font-bold tracking-widest pointer-events-none"
                                            animate={{ opacity: [0.3, 1, 0.3] }}
                                            transition={{ repeat: Infinity, duration: 2 }}
                                        >
                                            SLIDE TO ANSWER &gt;&gt;&gt;
                                        </motion.div>

                                        <motion.div
                                            drag="x"
                                            dragConstraints={{ left: 0, right: 280 }} // Approximate draggable width
                                            dragElastic={0.1}
                                            dragSnapToOrigin
                                            onDragEnd={(_, info) => {
                                                if (info.offset.x > 200) { // Threshold to accept
                                                    handleAccept();
                                                }
                                            }}
                                            className={`h-full aspect-square rounded-full flex items-center justify-center cursor-grab active:cursor-grabbing shadow-lg
                                                ${isAlfred ? 'bg-green-500' : 'bg-green-600'}
                                            `}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                            </svg>
                                        </motion.div>
                                    </div>

                                    {/* Decline Button */}
                                    <div className="flex justify-center">
                                        <button
                                            onClick={handleDecline}
                                            className="flex flex-col items-center gap-2 group"
                                        >
                                            <div className="w-16 h-16 rounded-full bg-red-500/20 border-2 border-red-500 flex items-center justify-center group-active:scale-95 transition-transform backdrop-blur-md">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </div>
                                            <span className="text-xs text-red-400 font-bold tracking-widest">DECLINE</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Content Modal (appears after accepting) */}
                    {children}
                </>
            )}
        </AnimatePresence>
    );
}
