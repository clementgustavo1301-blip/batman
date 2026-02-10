'use client';

import { useState, useEffect } from 'react';

type Character = 'alfred' | 'joker' | null;

interface UseCallNotificationResult {
    showCall: boolean;
    character: Character;
    acceptCall: () => void;
    declineCall: () => void;
}

export default function useCallNotification(): UseCallNotificationResult {
    const [showCall, setShowCall] = useState(false);
    const [character, setCharacter] = useState<Character>(null);

    useEffect(() => {
        // Check if user already got a call in this session
        const hasReceivedCall = sessionStorage.getItem('batman_call_received');

        if (hasReceivedCall) {
            return; // Don't show again
        }

        // Trigger after 5 seconds
        const timer = setTimeout(() => {
            // Force Joker for now as requested
            const selectedCharacter: Character = 'joker';
            setCharacter(selectedCharacter);
            setShowCall(true);
        }, 5000); // 5 seconds

        return () => clearTimeout(timer);
    }, []);

    const acceptCall = () => {
        sessionStorage.setItem('batman_call_received', 'true');
    };

    const declineCall = () => {
        setShowCall(false);
        sessionStorage.setItem('batman_call_received', 'true');
    };

    return {
        showCall,
        character,
        acceptCall,
        declineCall,
    };
}
