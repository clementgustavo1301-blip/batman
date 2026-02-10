'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import BootSequence from '@/components/BootSequence';
import SystemDashboard from '@/components/SystemDashboard';

export default function HomePage() {
    const [systemState, setSystemState] = useState<'booting' | 'active'>('booting');

    const handleBootComplete = () => {
        setSystemState('active');
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

        </main>
    );
}
