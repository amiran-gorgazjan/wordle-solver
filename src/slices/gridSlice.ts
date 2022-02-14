import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { choices } from "data/wordlist_simple";

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

function getRemainingSolutions(rows: Cell[][]): string[] {
    let remaining = [...choices];

    rows.forEach(row => {
        // Row is incomplete
        if (row.some(cell => cell.character === null)) {
            return;
        }

        row.forEach((cell, column) => {
            const character = cell.character;

            if (!character) {
                return;
            }

            remaining = remaining.filter(word => {
                if (cell.state === 'missing') {
                    console.log('missing', word, character);
                    return !word.includes(character);
                }

                if (cell.state === 'correct') {
                    console.log('correct', word, character);
                    return word[column] === character;
                }

                if (cell.state === 'present') {
                    console.log('present', word, character, word[column]);
                    return word[column] !== character && word.includes(character);
                }

                return true;
            })
        });
    });

    return remaining;
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

            state.solutions = getRemainingSolutions(state.rows);
        },
        addCharacter: (state, action: PayloadAction<string>) => {
            if (action.payload === 'Backspace') {
                state.characters = state.characters.slice(0, -1);
                const index = state.characters.length;
                const row = Math.floor(index / numColumns);
                const column = index % numColumns;

                state.rows[row][column].character = null;
                state.rows[row][column].state = null;

                state.solutions = getRemainingSolutions(state.rows);
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

                state.solutions = getRemainingSolutions(state.rows);
            }
        }
    }
})

export const { updateCell, addCharacter } = gridSlice.actions;