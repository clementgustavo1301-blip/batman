export interface Equipment {
    id: string;
    name: string;
    category: string;
    description: string;
    specs: {
        material: string;
        weight: string;
        features: string[];
    };
    status: 'operational' | 'maintenance' | 'prototype';
}

export const equipmentList: Equipment[] = [
    {
        id: 'batsuit-v1',
        name: 'Batsuit V1 (Prototype)',
        category: 'Armadura',
        description: 'Primeira geração do traje tático. Focado em mobilidade e proteção básica.',
        status: 'operational',
        specs: {
            material: 'Nomex / Kevlar',
            weight: '18.5 kg',
            features: ['Proteção Balística Básica', 'Pontos de Ancoragem', 'Cinto de Utilidades V1']
        }
    },
    {
        id: 'batsuit-v2',
        name: 'Batsuit V2 (Bindado)',
        category: 'Armadura',
        description: 'Segunda geração com placas reforçadas para combate pesado. Mobilidade levemente reduzida.',
        status: 'maintenance',
        specs: {
            material: 'Tri-tecido com Titânio',
            weight: '24.2 kg',
            features: ['Placa Peitoral Reforçada', 'Absorção Cinética', 'Comunicação Integrada']
        }
    },
    {
        id: 'batsuit-v8',
        name: 'Batsuit Mark VIII',
        category: 'Armadura',
        description: 'Traje tático com revestimento de tripla camada de kevlar e comunicação integrada.',
        specs: {
            material: 'Kevlar de Tripla Camada / Titânio',
            weight: '18kg',
            features: ['À prova de balas', 'Resistente ao fogo', 'Capacidade de planeio']
        },
        status: 'operational'
    },
    {
        id: 'batarang-exp',
        name: 'Batarangue Explosivo',
        category: 'Armamento',
        description: 'Projétil tático detonado remotamente.',
        specs: {
            material: 'Fibra de Carbono',
            weight: '0.5kg',
            features: ['Detonação remota', 'Trava magnética', 'Fusível temporizado']
        },
        status: 'operational'
    },
    {
        id: 'grapnel-gun',
        name: 'Pistola de Arpéu',
        category: 'Mobilidade',
        description: 'Sistema de arpéu com cabo líquido de alta tensão.',
        specs: {
            material: 'Polímero Reforçado',
            weight: '1.2kg',
            features: ['Alcance de 300m', 'Retração automática', 'Cabo líquido']
        },
        status: 'operational'
    },
    {
        id: 'utility-belt',
        name: 'Cinto de Utilidades',
        category: 'Armazenamento',
        description: 'Sistema de armazenamento modular para equipamentos táticos.',
        specs: {
            material: 'Couro / Kevlar',
            weight: '2.5kg',
            features: ['Bolsas revestidas de chumbo', 'Trava biométrica', 'Sinalizador de emergência']
        },
        status: 'operational'
    },
    {
        id: 'cryptographic-sequencer',
        name: 'Sequenciador Criptográfico',
        category: 'Tecnologia',
        description: 'Dispositivo portátil de hacking para contornar sistemas de segurança.',
        specs: {
            material: 'Policarbonato',
            weight: '0.3kg',
            features: ['Quebra de WiFi', 'Spoofing de RF', 'Síntese de voz']
        },
        status: 'prototype'
    }
];
