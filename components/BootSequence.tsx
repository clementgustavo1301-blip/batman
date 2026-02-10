'use client';

import { useState, useEffect, useRef } from 'react';

interface BootSequenceProps {
    onComplete: () => void;
}

interface BootLog {
    id: number;
    text: string;
    completed: boolean;
}

const BOOT_LINES = [
    "INITIALIZING WAYNETECH BIOS v9.4...",
    "CHECKING CPU INTEGRITY...",
    "VERIFYING ENCRYPTION KEYS...",
    "LOADING KERNEL MODULES...",
    "MOUNTING SECURE DRIVES...",
    "CONNECTING TO BATCOMPUTER...",
    "AUTHENTICATING USER...",
    "DECRYPTING ARCHIVES...",
    "LOADING GOTHAM CITY MAPS...",
    "SYNCING SATELLITE FEEDS...",
    "CHECKING PERIMETER SENSORS...",
    "LOADING VEHICLE DIAGNOSTICS...",
    "ESTABLISHING VPN TUNNEL...",
    "SCANNING FOR INTRUDERS...",
    "VERIFYING BIOMETRICS...",
    "LOADING CRIME DATABASE...",
    "SYNCING GCPD FREQUENCIES...",
    "ACTIVATING DEFENSE PROTOCOLS...",
    "RENDERING INTERFACE...",
    "SYSTEM READY."
];

export default function BootSequence({ onComplete }: BootSequenceProps) {
    const [displayedLogs, setDisplayedLogs] = useState<BootLog[]>([]);
    const [waitingForInput, setWaitingForInput] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Utils for delays
    const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    useEffect(() => {
        let isMounted = true;
        let isSkipped = false;

        // Interaction listener to skip animation if user gets impatient
        const skipAnimation = () => {
            if (!waitingForInput) {
                isSkipped = true;
            }
        };
        // We only want skip to work if we are animating. 
        // If we are waiting for input, the interaction should trigger handleInteraction instead.
        // But since we use same events, we need to be careful.
        // Actually, handleInteraction is on the div.

        const runSequence = async () => {
            // Initial slight pause
            await wait(200);

            for (let i = 0; i < BOOT_LINES.length; i++) {
                if (!isMounted) return;

                // Immediate finish if skipped
                if (isSkipped) {
                    setDisplayedLogs(BOOT_LINES.map((text, idx) => ({
                        id: idx,
                        text,
                        completed: true
                    })));
                    setWaitingForInput(true);
                    return;
                }

                const lineText = BOOT_LINES[i];

                // 1. Add the empty line first
                setDisplayedLogs(prev => [
                    ...prev,
                    { id: i, text: "", completed: false }
                ]);

                // 2. Type out character by character FASTER
                for (let j = 0; j < lineText.length; j++) {
                    if (!isMounted) return;
                    if (isSkipped) break;
                    await wait(2); // SUPER FAST TYPING (2ms)

                    setDisplayedLogs(prev => {
                        const newLogs = [...prev];
                        if (newLogs[i]) {
                            newLogs[i].text = lineText.slice(0, j + 1);
                        }
                        return newLogs;
                    });
                }

                if (isSkipped && isMounted) {
                    // if skipped during typing, loop will restart and catch it at top
                    continue;
                }

                // 3. Pause before validation FASTER
                if (!isMounted) return;
                await wait(50); // 50ms pause

                // 4. Show "V" checkmark
                setDisplayedLogs(prev => {
                    const newLogs = [...prev];
                    if (newLogs[i]) {
                        newLogs[i].completed = true;
                    }
                    return newLogs;
                });

                // 5. Short pause before next line FASTER
                if (!isMounted) return;
                await wait(10); // 10ms pause
            }

            // End of sequence
            if (isMounted) {
                setWaitingForInput(true);
            }
        };

        runSequence();

        return () => { isMounted = false; };
    }, []);

    // Auto-scroll
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [displayedLogs, waitingForInput]);


    const handleInteraction = () => {
        if (waitingForInput) {
            onComplete();
        }
    };

    // Global keyboard listener
    useEffect(() => {
        const handleKeyDown = () => handleInteraction();
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [waitingForInput]); // eslint-disable-line react-hooks/exhaustive-deps


    return (
        <div
            ref={containerRef}
            className="fixed inset-0 bg-black z-50 p-6 md:p-12 flex items-center justify-center font-[family-name:Courier_New,Courier,monospace] cursor-pointer"
            onClick={handleInteraction}
        >
            <div className="w-full max-w-5xl h-[90vh] flex flex-col relative z-50">

                {/* Header */}
                <div className="mb-8 text-wayne-gold border-b border-wayne-gold/30 pb-4 w-full shrink-0">
                    <pre className="text-[10px] md:text-sm leading-none hidden md:block mb-3 text-wayne-gold font-bold">
                        {`
 __          __ __  __  _   _  ______  _______  ______  _____  _    _ 
 \\ \\        / /|  \\/  || \\ | ||  ____||__   __||  ____|/ ____|| |  | |
  \\ \\  /\\  / / | \\  / ||  \\| || |__      | |   | |__  | |     | |__| |
   \\ \\/  \\/ /  | |\\/| || . \` ||  __|     | |   |  __| | |     |  __  |
    \\  /\\  /   | |  | || |\\  || |____    | |   | |____| |____ | |  | |
     \\/  \\/    |_|  |_||_| \\_||______|   |_|   |______|\\_____||_|  |_|
`}
                    </pre>
                    <div className="flex justify-between items-end text-sm text-wayne-gold font-mono tracking-widest">
                        <span>SYS_ROOT_ACCESS: <span className="font-bold">GRANTED</span></span>
                        <span>MEM: 64TB // ENCRYPTION: ACTIVE</span>
                    </div>
                </div>

                {/* Log Output Area */}
                <div
                    ref={scrollRef}
                    className="flex-1 w-full overflow-y-auto font-mono pb-2 pr-2 scrollbar-hide text-wayne-gold"
                >
                    {displayedLogs.map((log, index) => (
                        <div key={log.id} className="w-full flex text-sm md:text-xl py-0.5 items-center">
                            <span className="leading-relaxed tracking-wider flex-1">
                                {log.text}
                            </span>
                            {/* Stylized Checkmark */}
                            {log.completed && (
                                <span className="ml-4 text-green-500 font-bold font-mono text-xs md:text-base tracking-widest bg-green-500/10 px-2 rounded">
                                    [ OK ]
                                </span>
                            )}
                            {/* Blinking block for current typing line only */}
                            {!log.completed && index === displayedLogs.length - 1 && !waitingForInput && (
                                <div className="inline-block ml-1 w-2 h-4 sm:w-3 sm:h-5 bg-wayne-gold animate-pulse align-middle" />
                            )}
                        </div>
                    ))}


                    {/* Press Key Prompt */}
                    {waitingForInput && (
                        <div className="mt-8 animate-pulse text-wayne-gold font-bold text-lg md:text-2xl border-t border-wayne-gold/30 pt-4">
                            &gt; CLIQUE EM QUALQUER TECLA PARA ABRIR OS ARQUIVOS_
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
