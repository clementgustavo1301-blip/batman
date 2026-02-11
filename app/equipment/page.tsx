'use client';

import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import Batsuit from '@/components/3d/Batsuit';
import BatsuitModel from '@/components/3d/BatsuitModel';
import Batarang3D from '@/components/3d/Batarang';
import GrapnelGun from '@/components/3d/GrapnelGun';
import SystemShell from '@/components/SystemShell';
import { equipmentList } from '@/data/equipment';
import { holographicCard, pageTransitionVariants } from '@/utils/animations';

export default function EquipmentPage() {
  return (
    <SystemShell title="TECH_SPECS // R&D">
      <motion.div
        variants={pageTransitionVariants}
        initial="initial"
        animate="animate"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {equipmentList.map((item) => (
          <motion.div
            key={item.id}
            variants={holographicCard}
            className="card-gradient border border-gray-800 hover:border-wayne-gold/50 relative overflow-hidden group p-6 backdrop-blur-md transition-colors duration-500 shadow-lg"
          >
            {/* Blueprint Grid Background - Extremely subtle */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
              style={{
                backgroundImage: 'linear-gradient(#C9A961 1px, transparent 1px), linear-gradient(90deg, #C9A961 1px, transparent 1px)',
                backgroundSize: '20px 20px'
              }}
            />

            {/* Corner Markers - Darker */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-gray-800 group-hover:border-wayne-gold/30 transition-colors" />
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-gray-800 group-hover:border-wayne-gold/30 transition-colors" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-gray-800 group-hover:border-wayne-gold/30 transition-colors" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-gray-800 group-hover:border-wayne-gold/30 transition-colors" />

            {/* Header */}
            <div className="flex justify-between items-start mb-4 relative z-10">
              <h2 className="font-mono text-xl text-gray-300 font-bold tracking-tight group-hover:text-wayne-gold transition-colors">
                {item.name.toUpperCase()}
              </h2>
              {/* Status - Monochrome/Stealth */}
              <span className={`text-[10px] font-mono px-2 py-1 border ${item.status === 'operational' ? 'border-gray-800 text-gray-500 bg-gray-900/50' :
                item.status === 'maintenance' ? 'border-gray-800 text-gray-600 bg-black' :
                  'border-wayne-gold/20 text-wayne-gold/70 bg-wayne-gold/5'
                }`}>
                {item.status.toUpperCase()}
              </span>
            </div>

            {/* Description */}
            <p className="font-mono text-xs text-gray-600 mb-6 h-12 relative z-10 leading-relaxed">
              {item.description}
            </p>

            {/* Specs Table */}
            <div className="space-y-2 border-t border-gray-900 pt-4 relative z-10">
              <div className="flex justify-between font-mono text-[10px] text-gray-700">
                <span>MATERIAL_COMPOSITION</span>
                <span className="text-gray-500">{item.specs.material}</span>
              </div>
              <div className="flex justify-between font-mono text-[10px] text-gray-700">
                <span>NET_WEIGHT</span>
                <span className="text-gray-500">{item.specs.weight}</span>
              </div>
            </div>

            {/* Features List */}
            <div className="mt-4 flex flex-wrap gap-2 relative z-10">
              {item.specs.features.map(feature => (
                <span key={feature} className="text-[10px] font-mono text-gray-500 bg-gray-900/30 px-1 border border-gray-800">
                  &gt; {feature}
                </span>
              ))}
            </div>

            {/* 3D Model View */}
            {item.id === 'batsuit-v1' ? (
              <div className="absolute inset-0 z-0 opacity-80 group-hover:opacity-100 transition-opacity duration-500">
                <Canvas camera={{ position: [0, 0, 4.5], fov: 45 }}>
                  <ambientLight intensity={0.4} />
                  <pointLight position={[10, 10, 10]} intensity={1} color="#4455bb" />
                  <pointLight position={[-10, 5, -5]} intensity={0.5} />
                  <spotLight position={[0, 10, 0]} intensity={0.8} />
                  <BatsuitModel path="/models/batsuit-v1.glb" />
                  <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1} maxPolarAngle={Math.PI / 1.8} minPolarAngle={Math.PI / 2.5} />
                  <Environment preset="city" />
                </Canvas>
              </div>
            ) : item.id === 'batsuit-v2' ? (
              <div className="absolute inset-0 z-0 opacity-80 group-hover:opacity-100 transition-opacity duration-500">
                <Canvas camera={{ position: [0, 0, 4.5], fov: 45 }}>
                  <ambientLight intensity={0.4} />
                  <pointLight position={[10, 10, 10]} intensity={1} color="#4455bb" />
                  <pointLight position={[-10, 5, -5]} intensity={0.5} />
                  <spotLight position={[0, 10, 0]} intensity={0.8} />
                  <BatsuitModel path="/models/batsuit-v2.glb" />
                  <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1} maxPolarAngle={Math.PI / 1.8} minPolarAngle={Math.PI / 2.5} />
                  <Environment preset="city" />
                </Canvas>
              </div>
            ) : item.id === 'batsuit-v8' ? (
              <div className="absolute inset-0 z-0 opacity-80 group-hover:opacity-100 transition-opacity duration-500">
                <Canvas camera={{ position: [0, 0, 4.5], fov: 45 }}>
                  <ambientLight intensity={0.4} />
                  <pointLight position={[10, 10, 10]} intensity={1} color="#4455bb" />
                  <pointLight position={[-10, 5, -5]} intensity={0.5} />
                  <spotLight position={[0, 10, 0]} intensity={0.8} />
                  <Batsuit />
                  <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1} maxPolarAngle={Math.PI / 1.8} minPolarAngle={Math.PI / 2.5} />
                  <Environment preset="city" />
                </Canvas>
              </div>
            ) : item.id === 'batarang-exp' ? (
              <div className="absolute inset-0 z-0 opacity-80 group-hover:opacity-100 transition-opacity duration-500">
                <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
                  <ambientLight intensity={0.5} />
                  <pointLight position={[10, 10, 10]} intensity={1.5} color="#C9A961" />
                  <Batarang3D />
                  <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} />
                  <Environment preset="city" />
                </Canvas>
              </div>
            ) : item.id === 'grapnel-gun' ? (
              <div className="absolute inset-0 z-0 opacity-80 group-hover:opacity-100 transition-opacity duration-500">
                <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
                  <ambientLight intensity={0.6} />
                  <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
                  <pointLight position={[-10, -10, -10]} intensity={0.5} />
                  <GrapnelGun />
                  <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.5} />
                  <Environment preset="studio" />
                </Canvas>
              </div>
            ) : (
              <div className="absolute top-1/2 right-4 w-24 h-24 border border-gray-800/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-10 transition-opacity duration-700">
                <span className="font-mono text-[8px] text-gray-600">SCHEMATIC_LOAD</span>
              </div>
            )}

          </motion.div>
        ))}
      </motion.div>
    </SystemShell>
  );
}
