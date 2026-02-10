export interface Project {
    id: string;
    title: string;
    description: string;
    tech: string[];
    image?: string;
    link?: string;
}

export interface Villain {
    id: string;
    name: string;
    alias: string;
    skillCategory: string;
    description: string;
    tagline: string;
    caseFiles: Project[];
    threatLevel: number;
    image: string;
    primaryColor: string;
}

const villains: Villain[] = [
    {
        id: 'joker',
        name: 'Joker',
        alias: 'O Palhaço do Crime',
        skillCategory: 'Engenharia do Caos & Solução de Problemas Complexos',
        description: 'Especialista em transformar sistemas imprevisíveis em soluções elegantes. Arquitetura resiliente sob incerteza.',
        tagline: 'Why so serious about complexity?',
        threatLevel: 10,
        primaryColor: '#8B0000',
        image: '/villains/coringa.jpg',
        caseFiles: [
            {
                id: 'chaos-1',
                title: '[Seu Projeto Aqui]',
                description: 'Descreva um projeto onde você resolveu um problema complexo ou imprevisível.',
                tech: ['React', 'Node.js', 'Chaos Engineering'],
            }
        ],
    },
    {
        id: 'riddler',
        name: 'Riddler',
        alias: 'O Homem-Enigma',
        skillCategory: 'Algoritmos & Puzzles Lógicos',
        description: 'Mestre em algoritmos complexos e otimizações. Cada problema é um quebra-cabeça a ser resolvido com elegância matemática.',
        tagline: 'Riddle me this: What optimizes in O(log n)?',
        threatLevel: 8,
        primaryColor: '#2E8B57',
        image: '/villains/charada.jpg',
        caseFiles: [
            {
                id: 'riddle-1',
                title: '[Seu Projeto Aqui]',
                description: 'Descreva um projeto focado em algoritmos, otimizações ou lógica complexa.',
                tech: ['TypeScript', 'Algorithms', 'Data Structures'],
            }
        ],
    },
    {
        id: 'two-face',
        name: 'Two-Face',
        alias: 'Duas-Caras',
        skillCategory: 'Sistemas de Decisão & Lógica Binária',
        description: 'Especialista em sistemas de decisão, state machines, e arquiteturas duais. A dualidade como design.',
        tagline: 'Life is binary: 0 or 1, success or failure.',
        threatLevel: 7,
        primaryColor: '#D4AF37',
        image: '/villains/duas caras.jpg',
        caseFiles: [
            {
                id: 'decision-1',
                title: '[Seu Projeto Aqui]',
                description: 'Descreva um projeto com sistemas de decisão, state management ou arquitetura dual.',
                tech: ['State Machines', 'Redux', 'Decision Trees'],
            }
        ],
    },
    {
        id: 'penguin',
        name: 'Penguin',
        alias: 'O Pinguim',
        skillCategory: 'Estratégia de Negócios & Arquitetura',
        description: 'Arquiteto de sistemas escaláveis e estrategista de produto. Estrutura empresarial com código limpo.',
        tagline: 'Business logic is my empire.',
        threatLevel: 6,
        primaryColor: '#4B0082',
        image: '/villains/pinguim.jpg',
        caseFiles: [
            {
                id: 'empire-1',
                title: '[Seu Projeto Aqui]',
                description: 'Descreva um projeto focado em arquitetura de sistemas, escalabilidade ou strategy.',
                tech: ['Microservices', 'AWS', 'System Design'],
            }
        ],
    },
    {
        id: 'scarecrow',
        name: 'Scarecrow',
        alias: 'O Espantalho',
        skillCategory: 'Psicologia UX & Comportamento do Usuário',
        description: 'Especialista em psicologia do usuário e design comportamental. Entendendo medos e desejos para criar experiências memoráveis.',
        tagline: 'Fear is just poor UX.',
        threatLevel: 7,
        primaryColor: '#8B4513',
        image: '/villains/espantalho.jpg',
        caseFiles: [
            {
                id: 'fear-1',
                title: '[Seu Projeto Aqui]',
                description: 'Descreva um projeto focado em UX, psicologia do usuário ou design comportamental.',
                tech: ['UX Research', 'A/B Testing', 'Analytics'],
            }
        ],
    },
];

export default villains;
