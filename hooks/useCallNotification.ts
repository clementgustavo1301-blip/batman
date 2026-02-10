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


        // Trigger after 20 seconds
        const timer = setTimeout(() => {
            // Force Joker for now as requested
            const selectedCharacter: Character = 'joker';
            setCharacter(selectedCharacter);
            setShowCall(true);
        }, 20000); // 20 seconds

        return () => clearTimeout(timer);
    }, []);

    const acceptCall = () => {
        // Log accepted
    };

    const declineCall = () => {
        setShowCall(false);
    };

    return {
        showCall,
        character,
        acceptCall,
        declineCall,
    };
}
