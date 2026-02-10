'use client';

import Link from 'next/link';
import villains from '@/data/villains';

export default function VillainsPage() {
    return (
        <div style={{
            backgroundColor: '#0f0f0f',
            backgroundImage: 'radial-gradient(circle, #1a1a1a 0%, #000 100%)',
            fontFamily: "'Courier New', Courier, monospace",
            color: '#222',
            minHeight: '100vh',
            margin: 0
        }}>
            {/* Header fixo (Manter navegação) */}
            <header className="fixed top-0 left-0 right-0 h-14 bg-black/90 border-b border-wayne-gold/30 flex items-center justify-between px-6 z-[100] backdrop-blur-sm">
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                    <span className="font-mono text-wayne-gold tracking-widest text-xs">WAYNETECH_OS // ARQUIVOS</span>
                </Link>
                <span className="font-mono text-xs text-gray-500">SECURE_CHANNEL</span>
            </header>

            {/* Intro - Espaçamento inicial para o usuário começar a rolar */}
            <div className="intro" style={{
                height: '60vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: '#666',
                textAlign: 'center'
            }}>
                <div>
                    <h1 style={{ color: '#C9A961', fontSize: '2rem', marginBottom: '1rem', letterSpacing: '2px' }}>
                        EVIDÊNCIAS - CASO #404
                    </h1>
                    <p>↓ Role para analisar</p>
                </div>
            </div>

            {/* Mesa de Investigação - O CONTAINER DOS CARDS */}
            <main className="mesa-de-investigacao" style={{
                position: 'relative',
                maxWidth: '600px',
                margin: '0 auto',
                paddingBottom: '100vh' /* Permite que o último card pare e ainda haja scroll */
            }}>
                {villains.map((villain, index) => {
                    // Calcular rotação e z-index baseados no índice, similar ao nth-child do CSS
                    const rotations = [-3, 4, -5, 2, -2, 3];
                    const rotation = rotations[index % rotations.length];
                    const zIndex = index + 1;
                    const marginTop = index === 0 ? 0 : -380; // Primeiro card não tem margem negativa

                    return (
                        <div key={villain.id} className="arquivo" style={{
                            position: 'sticky',
                            top: '10vh', /* Onde o arquivo "trava" na mesa */
                            width: '100%',
                            height: '450px',
                            backgroundColor: '#9c8e77', /* Cor de pasta velha */
                            backgroundImage: "url('https://www.transparenttextures.com/patterns/paper.png')",
                            padding: '40px',
                            marginBottom: '150vh', /* DISTÂNCIA ENTRE OS CARDS NO SCROLL */
                            borderRadius: '2px',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.7)',
                            border: '1px solid #555',
                            boxSizing: 'border-box',
                            transition: 'transform 0.2s ease',
                            transform: `rotate(${rotation}deg)`,
                            zIndex: zIndex,
                            marginTop: `${marginTop}px`,
                            color: '#1a1a1a'
                        }}>
                            <div className="carimbo" style={{
                                position: 'absolute',
                                top: '20px',
                                right: '20px',
                                border: `4px solid ${villain.threatLevel > 8 ? '#8b0000' : '#222'}`,
                                color: villain.threatLevel > 8 ? '#8b0000' : '#222',
                                padding: '10px',
                                fontWeight: 'bold',
                                textTransform: 'uppercase',
                                transform: 'rotate(15deg)',
                                opacity: 0.7
                            }}>
                                {villain.threatLevel > 8 ? 'Confidencial' : 'Arquivado'}
                            </div>

                            <h2 style={{ borderBottom: '2px solid #555', paddingBottom: '5px', marginTop: 0, fontSize: '1.5rem' }}>
                                {villain.name.toUpperCase()}
                            </h2>

                            <img
                                src={villain.image}
                                alt={villain.name}
                                className="mugshot"
                                style={{
                                    width: '120px',
                                    height: '150px',
                                    background: '#222',
                                    float: 'left',
                                    margin: '0 20px 10px 0',
                                    border: '5px solid #fff',
                                    boxShadow: '2px 2px 5px rgba(0,0,0,0.5)',
                                    objectFit: 'cover'
                                }}
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = `https://via.placeholder.com/120x150/222222/666666?text=${villain.name.charAt(0)}`;
                                }}
                            />

                            <p style={{ lineHeight: 1.4, fontWeight: 'bold', margin: '5px 0' }}>ALIAS: {villain.alias}</p>
                            <p style={{ lineHeight: 1.4, fontWeight: 'bold', margin: '5px 0' }}>AMEAÇA: {villain.threatLevel}/10</p>
                            <p style={{ lineHeight: 1.4, margin: '15px 0', fontSize: '0.9rem' }}>{villain.description}</p>

                            <Link
                                href={`/villains/${villain.id}`}
                                style={{
                                    position: 'absolute',
                                    bottom: '30px',
                                    right: '40px',
                                    backgroundColor: '#222',
                                    color: '#fff',
                                    padding: '8px 12px',
                                    textDecoration: 'none',
                                    fontSize: '0.8rem',
                                    textTransform: 'uppercase'
                                }}
                            >
                                Acessar Arquivo &gt;
                            </Link>

                            <div className="footer-note" style={{
                                position: 'absolute',
                                bottom: '20px',
                                left: '40px',
                                fontSize: '0.8rem',
                                color: '#444'
                            }}>
                                PÁGINA {index + 1} de {villains.length}
                            </div>
                        </div>
                    );
                })}
            </main>

            <div style={{ height: '50vh' }}></div>
        </div>
    );
}
