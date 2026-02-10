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

            {/* Incoming Call Overlay - Persistent */}
            {systemState === 'active' && showCall && character && (
                <IncomingCall
                    show={showCall}
                    character={character}
                    onAccept={handleAcceptCall}
                    onDecline={() => handleMessageClose()}
                    isAccepted={callAccepted}
                >
                    {/* Embedded Audio for Active Call */}
                    <audio
                        ref={audioRef}
                        src={character === 'alfred'
                            ? "/audio/alfred_message.mp3"
                            : "/audio/joker_call_tenebroso.mp3"
                        }
                        loop={false}
                        onEnded={handleMessageClose}
                    />
                </IncomingCall>
            )}

            {/* Old Modal Removed - UI is now inside IncomingCall */}

        </main>
    );
}
