import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Character } from '../services/character';

// --- Types for serializable skills ---
export interface SerializableCharacter extends Omit<Character, 'skills'> {
  skills: Record<string, string[]>;
}

interface CharacterState {
  characters: string[]; // Store as JSON strings
}

const initialState: CharacterState = {
  characters: [],
};

export const characterSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    setCharacters: (state, action: PayloadAction<string[]>) => {
      state.characters = action.payload
    },
    setCharacter: (state, action: PayloadAction<{ index: number, character: string }>) => {
      state.characters[action.payload.index] = action.payload.character;
    }
  }
});

export const { setCharacters, setCharacter } = characterSlice.actions;

// Selector to convert skills back to Map/Set for UI usage
export const selectCharactersWithMap = (state: { characters: CharacterState }) =>
  state.characters.characters.map(str => {
    const char = JSON.parse(str);
    return {
      ...char,
      skills: new Map(
        Object.entries(char.skills).map(([k, v]) => [k, new Set(v as string[])])
      ),
    };
  });

export default characterSlice.reducer;
