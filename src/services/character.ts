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
    languages: string[] = ["Comune"];
    movement: number = 5;
    currentPf: number = 0;
    fatique: number = 0;
    healthState: string = '';
    imageUrl: string = '';
    leggendary: string[] = [];
    mastery: string[] = [];
    expert: string[] = [];
    apprentice: string[] = [];
    common: string[] = [
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
    ];
    monete: number = 10;
    traits: Trait[] = [];
    inventario: InventorySection[] = [new InventorySection('Addosso')];
}
