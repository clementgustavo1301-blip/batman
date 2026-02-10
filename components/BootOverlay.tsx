'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function BootOverlay() {
    const [progress, setProgress] = useState(0);
    const [text, setText] = useState("INITIALIZING");

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return prev + 2;
            });

            // Random tech text cycling
            const texts = ["DECRYPTING", "AUTHENTICATING", "LOADING ASSETS", "ESTABLISHING LINK", "BIOMETRIC SCAN"];
            if (Math.random() > 0.8) {
                setText(texts[Math.floor(Math.random() * texts.length)]);
            }
        }, 30);
        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
            transition={{ duration: 0.8, ease: "circIn" }}
            className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center overflow-hidden"
        >
            {/* Background Ambience */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--color-batman-gray)_0%,_black_100%)] opacity-20" />
            <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/c/c0/Noisegrid.png')] opacity-[0.03] mix-blend-overlay" />

            {/* Central Module */}
            <div className="relative z-10 flex flex-col items-center gap-8 w-full max-w-md px-8">

                {/* Logo / Emblem */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="w-16 h-16 border-2 border-wayne-gold/30 rounded-full flex items-center justify-center relative"
                >
                    <div className="absolute inset-0 border border-wayne-gold/10 rounded-full animate-ping opacity-20" />
                    <span className="font-gotham text-2xl text-wayne-gold font-bold">W</span>
                </motion.div>

                {/* Text & Progress */}
                <div className="w-full space-y-2">
                    <div className="flex justify-between items-end">
                        <span className="font-mono text-xs text-wayne-gold tracking-[0.2em] animate-pulse">
                            {text}...
                        </span>
                        <span className="font-mono text-xl text-white font-bold">
                            {progress}%
                        </span>
                    </div>

                    {/* Progress Bar Container */}
                    <div className="h-[2px] w-full bg-gray-900 relative overflow-hidden">
                        {/* Active Bar */}
                        <motion.div
                            className="h-full bg-wayne-gold shadow-[0_0_10px_rgba(201,169,97,0.5)]"
                            style={{ width: `${progress}%` }}
                        />
                    </div>

                    {/* Decoding/Cryptic Footer */}
                    <div className="flex justify-between text-[10px] font-mono text-gray-600 pt-2">
                        <span>MEM: 64TB // SECURE</span>
                        <span>KEY: {Math.random().toString(36).substring(7).toUpperCase()}</span>
                    </div>
                </div>
            </div>

            {/* Decorative Grid Lines */}
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-wayne-gold/20 to-transparent transform -translate-y-1/2 opacity-30" />
            <div className="absolute left-1/2 top-0 w-[1px] h-full bg-gradient-to-b from-transparent via-wayne-gold/20 to-transparent transform -translate-x-1/2 opacity-30" />

        </motion.div>
    );
}
