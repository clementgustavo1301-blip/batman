export interface Project {
    id: string;
    title: string;
    description: string;
    fullDescription?: string;
    tech: string[];
    image?: string;
    gallery?: string[];
    link?: string;
    repoUrl?: string; // GitHub
    demoUrl?: string; // Live Link
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
                title: 'Arkham Asylum Security Override',
                description: 'Sistema descentralizado para controle de acesso e monitoramento.',
                fullDescription: 'Um sistema de override completo para os protocolos de segurança de Arkham. Utiliza criptografia polimórfica para contornar firewalls estáticos e injetar código em tempo real. Este projeto demonstra capacidade de analisar sistemas legados complexos e encontrar vetores de otimização não documentados.',
                tech: ['React', 'Node.js', 'Chaos Engineering', 'WebSockets'],
                image: 'https://i.pinimg.com/originals/e5/28/7f/e5287f32cb4109db50a73da2eb665be7.jpg',
                gallery: [
                    'https://i.pinimg.com/736x/87/46/64/87466453187c532454a8e0cb20d0df1e.jpg',
                    'https://w0.peakpx.com/wallpaper/105/291/HD-wallpaper-hacking-screen-matrix-code.jpg'
                ],
                demoUrl: 'https://arkham-override.demo.com',
                repoUrl: 'https://github.com/joker/arkham-override'
            },
            {
                id: 'laughing-gas',
                title: 'Giggle-OS Distribution Network',
                description: 'Rede de distribuição de conteúdo altamente escalável e virulenta.',
                fullDescription: 'Algoritmo de propagação em malha (mesh network) para entrega de payload em baixa latência. O sistema se adapta à topologia da rede para maximizar a cobertura com o mínimo de nós infraestruturais. Uma metáfora técnica para campanhas de marketing viral.',
                tech: ['Go', 'Kubernetes', 'gRPC', 'Network Analysis'],
                demoUrl: '#',
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
                title: 'Enigma Cipher Engine',
                description: 'Motor de criptografia quântica para proteção de dados sensíveis.',
                fullDescription: 'Implementação de curvas elípticas personalizadas para geração de chaves assimétricas. O projeto foca em eficiência computacional e resistência a ataques de força bruta, simulando a complexidade dos troféus do Charada espalhados pela cidade.',
                tech: ['TypeScript', 'Algorithms', 'Cryptography', 'WASM'],
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
                title: 'CoinFlip Load Balancer',
                description: 'Balanceador de carga probabilístico com viés determinístico.',
                fullDescription: 'Um sistema de roteamento de tráfego que utiliza lógica fuzzy para decisões de "cara ou coroa" em microsserviços. Implementa padrões de Circuit Breaker e Retry com uma interface de gerenciamento que reflete a dualidade do acaso.',
                tech: ['State Machines', 'Redux', 'Nginx', 'Lua'],
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
                title: 'Iceberg Analytics Platform',
                description: 'Plataforma de BI para análise de mercados submersos.',
                fullDescription: 'Dashboard executivo para visualização de dados em tempo real. Focado em "o que está abaixo da superfície" – métricas profundas de performance e KPIs de negócio. Arquitetura orientada a eventos para processamento de alto volume.',
                tech: ['Microservices', 'AWS', 'Tableau API', 'Kafka'],
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
                title: 'Phobia VR Experience',
                description: 'Interface imersiva para terapia de exposição e testes de usabilidade.',
                fullDescription: 'Aplicação WebXR que mapeia as reações do usuário a estímulos visuais. Utiliza eye-tracking e análise de sentimento para adaptar a interface em tempo real, garantindo que o usuário nunca saia da zona de engajamento (ou terror).',
                tech: ['UX Research', 'WebXR', 'Three.js', 'TensorFlow.js'],
            }
        ],
    },
];

export default villains;
