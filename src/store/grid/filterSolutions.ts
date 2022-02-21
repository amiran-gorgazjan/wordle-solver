import { Cell } from "./gridSlice";

function setCharAt(str: string, index: number, chr: string) {
    if(index > str.length - 1) return str;
    return str.substring(0, index) + chr + str.substring(index + 1);
}

function isMatching(word: string, index: number, character: string | null, state: Cell["state"]): boolean {
    // Ideally, null should not happen, but it's easier to handle it here for typing purposes.
    if (character === null) {
        return true;
    }

    if (state === 'correct') {
        return word[index] === character;
    }

    if (state === 'present') {
        return word.includes(character) && word[index] !== character;
    }

    if (state === 'missing') {
        return !word.includes(character);
    }

    return true;
}

export default function filterSolutions(partialRows: Cell[][], words: string[]): string[] {
    // We filter incomplete rows
    const rows = partialRows.filter(row => row.every(cell => cell.character));

    return words.filter(original => {
        return rows.every(row => {
            let word = original;

            return row.every((cell, index) => {
                const { character, state } = cell;

                const matches = isMatching(word, index, character, state);

                // We set the character at the index to "_" to prevent it from matching again
                // word = setCharAt(word, index, '_');

                return matches;
            });
        });
    });
}