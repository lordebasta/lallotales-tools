import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Character } from '../services/character';
import { FirestoreService } from '../services/firestore';


interface CharacterState {
  characters: Character[];
}

const initialState: CharacterState = {
  characters: await FirestoreService.getInstance().getCharacters(),
};

export const characterSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    setCharacters: (state, action: PayloadAction<Character[]>) => {
      state.characters = action.payload;
    },
    setCharacter: (state, action: PayloadAction<{ index: number, character: Character }>) => {
      state.characters[action.payload.index] = action.payload.character;
    }
  }
});

export const { setCharacters, setCharacter } = characterSlice.actions;
export default characterSlice.reducer;
