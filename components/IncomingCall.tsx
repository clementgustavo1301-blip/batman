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
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
                        onClick={onDecline}
                    />

                    {/* Call Modal */}
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0, y: 50 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.8, opacity: 0, y: 50 }}
                        transition={{
                            type: 'spring',
                            damping: 25,
                            stiffness: 300
                        }}
                        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md mx-4"
                    >
                        <div
                            className={`bg-batman-dark border-2 p-8 shadow-2xl ${isAlfred
                                ? 'border-wayne-gold'
                                : 'border-joker-red'
                                }`}
                        >
                            {/* Caller Info */}
                            <div className="text-center mb-8">
                                <motion.div
                                    animate={{
                                        scale: [1, 1.1, 1],
                                    }}
                                    transition={{
                                        duration: 1.5,
                                        repeat: Infinity,
                                        ease: 'easeInOut'
                                    }}
                                    className={`w-24 h-24 mx-auto rounded-full mb-4 flex items-center justify-center text-4xl ${isAlfred
                                        ? 'bg-wayne-gold/20 border-2 border-wayne-gold'
                                        : 'bg-joker-red/20 border-2 border-joker-red glow-red'
                                        }`}
                                >
                                    {isAlfred ? '🎩' : '🃏'}
                                </motion.div>

                                <h2 className={`font-gotham font-bold text-3xl mb-2 ${isAlfred ? 'text-wayne-gold' : 'text-joker-red'
                                    }`}>
                                    {isAlfred ? 'Alfred Pennyworth' : 'The Joker'}
                                </h2>

                                <p className="text-gray-400 text-sm uppercase tracking-wider">
                                    {isAlfred ? 'Wayne Manor' : 'Arkham Asylum'}
                                </p>

                                <motion.p
                                    animate={{ opacity: [0.5, 1, 0.5] }}
                                    transition={{
                                        duration: 1.5,
                                        repeat: Infinity,
                                        ease: 'easeInOut'
                                    }}
                                    className="text-parchment mt-4 text-lg"
                                >
                                    Chamada recebida...
                                </motion.p>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-4">
                                <button
                                    onClick={handleDecline}
                                    className="flex-1 px-6 py-4 bg-transparent border-2 border-gray-600 text-gray-400 font-bold hover:bg-gray-600 hover:text-white transition-all duration-300"
                                >
                                    Recusar
                                </button>

                                <button
                                    onClick={handleAccept}
                                    className={`flex-1 px-6 py-4 font-bold transition-all duration-300 ${isAlfred
                                        ? 'bg-wayne-gold text-batman-black hover:glow-gold'
                                        : 'bg-joker-red text-white hover:glow-red'
                                        }`}
                                >
                                    Atender
                                </button>
                            </div>
                        </div>
                    </motion.div>

                    {/* Content Modal (appears after accepting) */}
                    {children}
                </>
            )}
        </AnimatePresence>
    );
}
