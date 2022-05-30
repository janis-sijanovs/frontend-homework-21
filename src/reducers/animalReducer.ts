/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import Animal, { Translation } from '../models/models';

type AnimalLangagePayload = {
    animal: Animal,
    translation: Translation
}

interface AnimalState {
    animals: Animal[];
}

const initialState: AnimalState = {
  animals: [],
};

export const animalSlice = createSlice({
  name: 'animal',
  initialState,
  reducers: {
    addAnimal: (state, action: PayloadAction<Animal>) => {
      state.animals.push(action.payload);
    },
    addTranslation: (state, action: PayloadAction<AnimalLangagePayload>) => {
      const id = state.animals.findIndex(({ name }) => name === action.payload.animal.name);
      state.animals[id].translation.push(action.payload.translation);
    },
  },
});

export const {
  addAnimal, addTranslation,
} = animalSlice.actions;

export const selectAnimals = (state: RootState) => state.animal.animals;

export default animalSlice.reducer;
