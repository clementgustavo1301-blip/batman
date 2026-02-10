'use client';

import { useState, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import BootSequence from '@/components/BootSequence';
import SystemDashboard from '@/components/SystemDashboard';
import useCallNotification from '@/hooks/useCallNotification';
import IncomingCall from '@/components/IncomingCall';

export default function HomePage() {
    const [systemState, setSystemState] = useState<'booting' | 'active'>('booting');
    const { showCall, character, acceptCall, declineCall } = useCallNotification();
    const [callAccepted, setCallAccepted] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Always run boot sequence for this showcase
    // useEffect(() => {
    //     const hasBooted = sessionStorage.getItem('waynetech_booted');
    //     if (hasBooted) {
    //         setSystemState('active');
    //     }
    // }, []);

    const handleBootComplete = () => {
        // sessionStorage.setItem('waynetech_booted', 'true');
        setSystemState('active');
    };

    const handleAcceptCall = () => {
        setCallAccepted(true);
        acceptCall();

        // Play audio after accepting call
        setTimeout(() => {
            if (audioRef.current) {
                audioRef.current.play().catch(err => console.log('Audio play failed:', err));
            }
        }, 500); // Small delay for smooth transition
    };

    const handleMessageClose = () => {
        // Stop audio when closing
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
        setCallAccepted(false);
        declineCall();
    };

    // Call Content (Keeping the same logic as before)
    const characterMessages = {
        alfred: {
            title: 'Alfred Pennyworth',
            message: `Patrão Bruce... ou devo dizer, caro visitante.\n\nO sistema está operante. Recomendo verificar os Arquivos Criminais primeiro. E por favor, tente não sobrecarregar os servidores da Caverna com downloads desnecessários.`,
        },
        joker: {
            title: 'Ha Ha Ha!',
            message: `Acessando o computadorzinho do Morcego? Que divertido!\n\nSabe o que eu hackeei? Nada! Ele deixou a porta aberta! HAHAHA!`,
        },
    };

    const currentMessage = character ? characterMessages[character] : null;

    return (
        <main className="min-h-screen bg-batman-black text-parchment overflow-hidden">

            <AnimatePresence mode="wait">
                {systemState === 'booting' && (
                    <motion.div
                        key="boot"
                        exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
                        transition={{ duration: 0.8 }}
                        className="absolute inset-0 z-50"
                    >
                        <BootSequence onComplete={handleBootComplete} />
                    </motion.div>
                )}

                {systemState === 'active' && (
                    <motion.div
                        key="dashboard"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                    >
                        <SystemDashboard />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Incoming Call Overlay (Only shows when active) */}
            {systemState === 'active' && showCall && character && !callAccepted && (
                <IncomingCall
                    show={showCall}
                    character={character}
                    onAccept={handleAcceptCall}
                    onDecline={() => declineCall()}
                >
                    <></>
                </IncomingCall>
            )}

            {/* Call Message Modal */}
            <AnimatePresence>
                {callAccepted && currentMessage && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[60]"
                            onClick={handleMessageClose}
                        />

                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[70] w-full max-w-2xl mx-4"
                        >
                            <div
                                className={`bg-batman-dark border-2 p-8 ${character === 'alfred'
                                    ? 'border-wayne-gold'
                                    : 'border-joker-red'
                                    }`}
                            >
                                <h3 className={`font-mono font-bold text-2xl mb-4 ${character === 'alfred' ? 'text-wayne-gold' : 'text-joker-red'
                                    }`}>
                                    Incoming Transmission: {currentMessage.title}
                                </h3>

                                {/* Audio Visualizer */}
                                <div className="mb-6 flex items-center justify-center gap-1 h-16">
                                    {[...Array(20)].map((_, i) => (
                                        <motion.div
                                            key={i}
                                            className={`w-1 rounded-full ${character === 'alfred' ? 'bg-wayne-gold' : 'bg-joker-red'
                                                }`}
                                            animate={{
                                                height: [
                                                    Math.random() * 40 + 10,
                                                    Math.random() * 50 + 20,
                                                    Math.random() * 40 + 10,
                                                ],
                                            }}
                                            transition={{
                                                duration: 0.5 + Math.random() * 0.5,
                                                repeat: Infinity,
                                                ease: 'easeInOut',
                                            }}
                                        />
                                    ))}
                                </div>

                                <p className="font-mono text-parchment leading-relaxed whitespace-pre-line mb-6">
                                    {currentMessage.message}
                                </p>

                                <button
                                    onClick={handleMessageClose}
                                    className={`w-full px-6 py-3 font-bold font-mono transition-all duration-300 border ${character === 'alfred'
                                        ? 'border-wayne-gold text-wayne-gold hover:bg-wayne-gold hover:text-black'
                                        : 'border-joker-red text-joker-red hover:bg-joker-red hover:text-white'
                                        }`}
                                >
                                    TERMINATE CONNECTION
                                </button>
                            </div>
                        </motion.div>

                        {/* Hidden Audio Element */}
                        <audio
                            ref={audioRef}
                            src="/audio/ElevenLabs_2026-02-10T00_56_20_Liam - Energetic, Social Media Creator_pre_sp92_s36_sb73_v3.mp3"
                        />
                    </>
                )}
            </AnimatePresence>

        </main>
    );
}
