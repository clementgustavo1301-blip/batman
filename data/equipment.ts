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
        id: 'batsuit-v8',
        name: 'Batsuit Mark VIII',
        category: 'Armor',
        description: 'Tactical suit with tri-weavekevlar plating and integrated comms.',
        specs: {
            material: 'Tri-weave Kevlar / Titanium',
            weight: '18kg',
            features: ['Bulletproof', 'Fire resistant', 'Gliding capability']
        },
        status: 'operational'
    },
    {
        id: 'batarang-exp',
        name: 'Explosive Batarang',
        category: 'Weaponry',
        description: 'Remote detonated tactical projectile.',
        specs: {
            material: 'Carbon Fiber',
            weight: '0.5kg',
            features: ['Remote detonation', 'Magnetic latch', 'Timed fuse']
        },
        status: 'operational'
    },
    {
        id: 'grapnel-gun',
        name: 'Grapnel Gun',
        category: 'Mobility',
        description: 'High-tensile liquid cable grapnel system.',
        specs: {
            material: 'Reinforced Polymer',
            weight: '1.2kg',
            features: ['300m range', 'Auto-retract', 'Liquid cable']
        },
        status: 'maintenance'
    },
    {
        id: 'utility-belt',
        name: 'Utility Belt',
        category: 'Storage',
        description: 'Modular storage system for tactical equipment.',
        specs: {
            material: 'Leather / Kevlar',
            weight: '2.5kg',
            features: ['Lead-lined pouches', 'Biometric lock', 'Emergency beacon']
        },
        status: 'operational'
    },
    {
        id: 'cryptographic-sequencer',
        name: 'Cryptographic Sequencer',
        category: 'Tech',
        description: 'Portable hacking device for bypassing security systems.',
        specs: {
            material: 'Polycarbonate',
            weight: '0.3kg',
            features: ['WiFi cracking', 'RF spoofing', 'Voice synthesis']
        },
        status: 'prototype'
    }
];
