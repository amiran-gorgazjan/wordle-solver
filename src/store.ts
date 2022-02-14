import { configureStore } from "@reduxjs/toolkit";
import { gridSlice } from 'slices/gridSlice';

const store = configureStore({
    reducer: {
        grid: gridSlice.reducer,
    },
});

type RootState = ReturnType<typeof store.getState>;

export const selectRows = (state : RootState) => state.grid.rows;
export const selectCharacters = (state : RootState) => state.grid.characters;
export const selectSolutions = (state : RootState) => state.grid.solutions;

export default store;