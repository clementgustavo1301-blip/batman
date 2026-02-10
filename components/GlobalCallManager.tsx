'use client';

import { useState, useRef } from 'react';
import useCallNotification from '@/hooks/useCallNotification';
import IncomingCall from '@/components/IncomingCall';

export default function GlobalCallManager() {
    const { showCall, character, acceptCall, declineCall } = useCallNotification();
    const [callAccepted, setCallAccepted] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

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

    // Only render if there is an active call attempt or an ongoing call
    if (!showCall || !character) return null;

    return (
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
    );
}
