import { Character } from '../services/character';

// Helper to serialize skills
export function serializeSkills(skills: Map<string, Set<string>>) {
    return Object.fromEntries(
        Array.from(skills.entries()).map(([k, v]) => [k, Array.from(v)])
    );
}

// Helper to serialize a Character
export function serializeCharacter(character: Character) {
    return JSON.stringify({
        ...character,
        skills: serializeSkills(character.skills),
    });
}

export function serializeCharacters(characters: Character[]) {
    return characters.map(serializeCharacter);
}

