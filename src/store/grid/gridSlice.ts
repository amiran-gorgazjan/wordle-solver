import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { answers } from "data/wordlist";
import filterSolutions from "./filterSolutions";

export const cellStates = [ 'missing', 'present', 'correct'] as const;
export const numRows = 6;
export const numColumns = 5;

export interface Cell {
    id: string;
    row: number;
    column: number;
    character: string | null;
    state: typeof cellStates[number] | null;
}

interface GridSliceState {
    rows: Cell[][];
    characters: string[];
    solutions: string[];
}

const initialGrid: Cell[][] = [...Array(numRows)].map((_, row) => [...Array(numColumns)].map((_, column) => ({
    id: `${row}_${column}`,
    row,
    column,
    character: null,
    state: null,
})));

const initialState: GridSliceState = {
    rows: initialGrid,
    characters: [],
    solutions: [],
};

function findCell(grid: Cell[][], { row, column }: { row: number, column: number }): Cell | null {
    return grid[row]?.[column];
}

export const gridSlice = createSlice({
    name: 'grid',
    initialState,
    reducers: {
        updateCell: (state, action: PayloadAction<Cell>) => {
            const cell = findCell(state.rows, action.payload);

            if (cell) {
                Object.assign(cell, action.payload);
            }

            state.solutions = filterSolutions(state.rows, answers);
        },
        addCharacter: (state, action: PayloadAction<string>) => {
            if (action.payload === 'Backspace') {
                state.characters = state.characters.slice(0, -1);
                const index = state.characters.length;
                const row = Math.floor(index / numColumns);
                const column = index % numColumns;

                state.rows[row][column].character = null;
                state.rows[row][column].state = null;

                state.solutions = filterSolutions(state.rows, answers);
                return;
            }

            if (action.payload.length === 1 && /[a-zA-Z]/.test(action.payload)) {
                const char = action.payload.toLowerCase();
                state.characters.push(char);
                const index = state.characters.length - 1;
                const row = Math.floor(index / numColumns);
                const column = index % numColumns;
                state.rows[row][column].character = char;
                state.rows[row][column].state = 'missing';

                state.solutions = filterSolutions(state.rows, answers);
            }
        }
    },
})

export const { updateCell, addCharacter } = gridSlice.actions;