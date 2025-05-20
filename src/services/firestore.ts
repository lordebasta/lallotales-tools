import { Character, InventoryItem, InventorySection, Trait } from "./character";
import { auth } from "./fireauth";
import { app } from "./firebase";
import { doc, addDoc, collection, DocumentData, getDocs, getFirestore, query, QueryDocumentSnapshot, setDoc, SnapshotOptions, where } from "firebase/firestore";

const db = getFirestore(app);
export class FirestoreService {

    private static instance: FirestoreService;
    private constructor() { }
    public static getInstance(): FirestoreService {
        if (!FirestoreService.instance) {
            FirestoreService.instance = new FirestoreService();
        }
        return FirestoreService.instance;
    }

    async createNewCharacter(): Promise<string> {
        const character = new Character();
        const docRef = await addDoc(collection(db, "characters"), characterConverter.toFirestore(character));
        console.log("Document written with ID: ", docRef.id);
        return docRef.id;
    }

    async getCharacters(): Promise<Character[]> {
        console.log("Fetching characters from Firestore");
        const q = query(collection(db, "characters"), where("userId", "==", auth.currentUser?.uid));
        const querySnapshot = await getDocs(q);
        const characters: Character[] = [];
        querySnapshot.forEach((doc) => {
            const char = characterConverter.fromFirestore(doc, {});
            characters.push(char);
        });
        return characters;
    }

    async setCharacter(character: Character) {
        await setDoc(
            doc(db, 'characters', character.id),
            characterConverter.toFirestore(character)
        ).then(() => {
            console.log("Document successfully written!");
        }
        ).catch((error) => {
            console.error("Error writing document: ", error);
        });
    }
}

// --- Trait Converter ---
export const traitConverter = {
    toFirestore: (trait: Trait) => ({
        name: trait.name,
        description: trait.description,
        cost: trait.cost,
    }),
    fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions) => {
        const data = snapshot.data(options);
        const trait = new Trait();
        trait.name = data.name;
        trait.description = data.description;
        trait.cost = data.cost;
        return trait;
    }
};

// --- InventoryItem Converter ---
export const inventoryItemConverter = {
    toFirestore: (item: InventoryItem) => ({
        name: item.name,
        description: item.description,
        quantity: item.quantity,
    }),
    fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions) => {
        const data = snapshot.data(options);
        const item = new InventoryItem();
        item.name = data.name;
        item.description = data.description;
        item.quantity = data.quantity;
        return item;
    }
};

// --- InventorySection Converter ---
export const inventorySectionConverter = {
    toFirestore: (section: InventorySection) => ({
        name: section.name,
        items: section.items.map(item => inventoryItemConverter.toFirestore(item)),
    }),
    fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions) => {
        const data = snapshot.data(options);
        const section = new InventorySection(data.name);
        section.items = (data.items || []).map((itemData: DocumentData) => {
            // Simulate snapshot for item
            return inventoryItemConverter.fromFirestore({
                data: () => itemData
            } as QueryDocumentSnapshot, options);
        });
        return section;
    }
};

// --- Character Converter ---
export const characterConverter = {
    toFirestore: (char: Character) => ({
        name: char.name,
        level: char.level,
        description: char.description,
        movement: char.movement,
        currentPf: char.currentPf,
        fatique: char.fatique,
        healthState: char.healthState,
        imageUrl: char.imageUrl,
        legendary: Array.from(char.skills.get('legendary')!),
        master: Array.from(char.skills.get('master')!),
        expert: Array.from(char.skills.get('expert')!),
        apprentice: Array.from(char.skills.get('apprentice')!),
        common: Array.from(char.skills.get('common')!),
        monete: char.monete,
        traits: char.traits.map(trait => traitConverter.toFirestore(trait)),
        inventario: char.inventario.map(section => inventorySectionConverter.toFirestore(section)),
        userId: auth.currentUser?.uid,
    }),
    fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions) => {
        const data = snapshot.data(options);
        const char = new Character();
        char.id = snapshot.id;
        char.name = data.name;
        char.level = data.level;
        char.description = data.description;
        char.movement = data.movement;
        char.currentPf = data.currentPf;
        char.fatique = data.fatique;
        char.healthState = data.healthState;
        char.imageUrl = data.imageUrl;
        char.skills.set('legendary', new Set(data.legendary));
        char.skills.set('master', new Set(data.master));
        char.skills.set('expert', new Set(data.expert));
        char.skills.set('apprentice', new Set(data.apprentice));
        char.skills.set('common', new Set(data.common));
        char.monete = data.monete;
        char.traits = (data.traits || []).map((traitData: DocumentData) => {
            return traitConverter.fromFirestore({
                data: () => traitData
            } as QueryDocumentSnapshot, options);
        });
        char.inventario = (data.inventario || []).map((sectionData: DocumentData) => {
            return inventorySectionConverter.fromFirestore({
                data: () => sectionData
            } as QueryDocumentSnapshot, options);
        });
        return char;
    }
};