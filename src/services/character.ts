export class Trait {
    name: string = '';
    description: string = '';
    cost: number = 0;
}

export class InventorySection {
    name: string;
    items: InventoryItem[] = [];

    constructor(name: string) {
        this.name = name;
    }
}

export class InventoryItem {
    name: string = '';
    description: string = '';
    quantity: number = 1;
}

export class Character {
    id: string = '';
    name: string = '';
    level: number = 1;
    description: string = '';
    movement: number = 5;
    currentPf: number = 0;
    maxPf: number = 0;
    fatique: number = 0;
    healthState: string = '';
    imageUrl: string = '';
    skills: Map<string, Set<string>> = new Map<string, Set<string>>([
        ['legendary', new Set<string>()],
        ['master', new Set<string>()],
        ['expert', new Set<string>()],
        ['apprentice', new Set<string>()],
        ['common', new Set<string>([
            'Agilità',
            'Conoscenza',
            'Convincere',
            'Esibirsi',
            'Forza',
            'Furto',
            'Ingegneria',
            'Magia',
            'Medicina',
            'Mira',
            'Mischia',
            'Nascondersi',
            'Notare',
            'Pilotare',
            'Sopravvivenza',
            'Volontà',
        ])]
    ]);
    coins: number = 10;
    traits: Trait[] = [];
    equipment: InventorySection[] = [new InventorySection('Addosso')];
}


export function serializeSkills(skills: Map<string, Set<string>>) {
    return Object.fromEntries(
        Array.from(skills.entries()).map(([k, v]) => [k, Array.from(v)])
    );
}

export function jsonifyCharacter(character: Character) {
    return JSON.stringify({
        ...character,
        skills: serializeSkills(character.skills),
    });
}

export function jsonifyCharacters(characters: Character[]) {
    return characters.map(jsonifyCharacter);
}