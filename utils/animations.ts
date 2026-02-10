import { Variants } from 'framer-motion';

// Easing cinemático (rápido na saída, suave na chegada)
export const cinematicEase = [0.25, 0.1, 0.25, 1.0];

// Transição de página estilo "Varredura de Sistema"
export const pageTransitionVariants: Variants = {
    initial: {
        opacity: 0,
        filter: 'blur(10px)',
        scale: 0.98
    },
    animate: {
        opacity: 1,
        filter: 'blur(0px)',
        scale: 1,
        transition: {
            duration: 0.6,
            ease: cinematicEase,
            staggerChildren: 0.1
        }
    },
    exit: {
        opacity: 0,
        filter: 'blur(10px)',
        scale: 1.02,
        transition: { duration: 0.4, ease: "easeIn" }
    }
};

// Efeito de "Holograma Ligando" para cards
export const holographicCard: Variants = {
    hidden: {
        opacity: 0,
        scale: 0.9,
        y: 20,
        filter: 'brightness(0) blur(5px)'
    },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        filter: 'brightness(1) blur(0px)',
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 15,
            mass: 0.8
        }
    },
    hover: {
        scale: 1.02,
        filter: 'brightness(1.2)',
        boxShadow: '0 0 20px rgba(201,169,97,0.3)',
        transition: { duration: 0.2 }
    }
};

// Efeito de texto "decodificando" (simples)
export const textDecoder: Variants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.3 }
    }
};

// Efeito de linha de scanner
export const scanlineSweep: Variants = {
    initial: { scaleY: 0, opacity: 0 },
    animate: {
        scaleY: 1,
        opacity: 1,
        transition: { duration: 0.4 }
    }
};
