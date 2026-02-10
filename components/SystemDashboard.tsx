'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function SystemDashboard() {
    return (
        <div className="min-h-screen bg-batman-black pt-20 px-4 relative overflow-hidden">
            {/* HUD Header */}
            <header className="fixed top-0 left-0 right-0 h-16 bg-batman-dark/90 border-b border-wayne-gold/30 flex items-center justify-between px-6 z-40 backdrop-blur-sm">
                <div className="flex items-center gap-4">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                    <span className="font-mono text-wayne-gold tracking-widest text-sm">WAYNETECH OS // SECURE</span>
                </div>
                <div className="font-mono text-xs text-gray-500">
                    SYS.STATUS: ONLINE
                </div>
            </header>

            {/* Main Grid Interface */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 mt-8">

                {/* Module 1: Villain/Project Archives (Wide) */}
                <Link href="/villains" className="md:col-span-8 group">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="h-96 md:h-[500px] bg-batman-dark border border-gray-800 hover:border-wayne-gold relative overflow-hidden p-6 transition-all duration-300"
                    >
                        <div className="absolute top-0 left-0 p-2 bg-wayne-gold text-black font-bold text-xs">ARCHIVES_DB</div>

                        <div className="h-full flex flex-col justify-center items-center text-center z-10 relative">
                            <h2 className="font-gotham text-4xl md:text-6xl text-white mb-2 group-hover:text-wayne-gold transition-colors">CRIMINAL RECORDS</h2>
                            <p className="font-mono text-gray-500 text-sm">ACCESS PROJECT CASE FILES</p>
                        </div>

                        {/* Background Map Effect */}
                        <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/World_map_blank_without_borders.svg/2000px-World_map_blank_without_borders.svg.png')] bg-cover bg-center grayscale invert" />
                    </motion.div>
                </Link>

                {/* Module 2: Tech Specs (Side) */}
                <Link href="/equipment" className="md:col-span-4 group">
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="h-96 md:h-[500px] bg-batman-dark border border-gray-800 hover:border-blue-400 relative overflow-hidden p-6 transition-all duration-300"
                    >
                        <div className="absolute top-0 right-0 p-2 bg-blue-900 text-blue-200 font-bold text-xs">TECH_SPECS</div>
                        <div className="h-full flex flex-col justify-center items-center text-center z-10 relative">
                            <div className="text-6xl mb-4 text-blue-500/50 group-hover:text-blue-400 transition-colors">⚙️</div>
                            <h2 className="font-gotham text-2xl text-white mb-2">EQUIPMENT</h2>
                            <p className="font-mono text-gray-500 text-sm">WAYNE TECH R&D</p>
                        </div>
                    </motion.div>
                </Link>

                {/* Module 3: System Status (Bottom Bar) */}
                <div className="md:col-span-12 h-32 bg-batman-dark border border-gray-800 p-6 flex items-center justify-between font-mono text-xs text-gray-400">
                    <div className="flex gap-8">
                        <div>
                            <span className="block text-gray-600 mb-1">CPU LOAD</span>
                            <div className="w-32 h-2 bg-gray-800"><div className="w-1/3 h-full bg-wayne-gold" /></div>
                        </div>
                        <div>
                            <span className="block text-gray-600 mb-1">NETWORK</span>
                            <span className="text-green-500">ENCRYPTED (VPN-X9)</span>
                        </div>
                    </div>
                    <div>
                        LOCATION: GOTHAM_CAVE_V2
                    </div>
                </div>

            </div>

            {/* Decorative Grid Lines */}
            <div className="fixed inset-0 pointer-events-none z-0" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        </div>
    );
}
