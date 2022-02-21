import filterSolutions from "./filterSolutions";
import { Cell } from "./gridSlice";

function makeRow(row: number, ...cells: [string, "missing" | "present" | "correct" | null][]): Cell[] {
    return cells.map(([character, state], index) => ({
        id: `${row}_${index}`,
        row,
        column: index,
        character,
        state,
    }));
}

const words = ['crane', 'karma', 'ultra', 'whale', 'tacit', 'kayle', 'rigid', 'humus'];

describe('filterSolutions', () => {
    test('finds fully matching CRANE', () => {
        const rows = [makeRow(0,
            ['c', 'correct'],
            ['r', 'correct'],
            ['a', 'correct'],
            ['n', 'correct'],
            ['e', 'correct'],
        )];

        expect(filterSolutions(rows, words)).toEqual(['crane']);
    });

    test('the "present" state excludes the character at the index', () => {
        const rows = [makeRow(0,
            ['c', 'correct'],
            ['r', 'correct'],
            ['a', 'correct'],
            ['n', 'correct'],
            ['e', 'present'],
        )];

        expect(filterSolutions(rows, words)).toEqual([]);
    });

    test('the "present" state finds CRANE shuffled', () => {
        const rows = [makeRow(0,
            ['r', 'present'],
            ['c', 'present'],
            ['n', 'present'],
            ['e', 'present'],
            ['a', 'present'],
        )];

        expect(filterSolutions(rows, words)).toEqual(['crane']);
    });

    test('finds partially matching words', () => {
        const rows = [ makeRow(0,
            // AGILE
            ['a', 'present'],
            ['g', 'missing'],
            ['i', 'missing'],
            ['l', 'correct'],
            ['e', 'correct'],
        )];

        expect(filterSolutions(rows, words)).toEqual([ 'whale', 'kayle' ]);
    });

    test('correctly finds complex case', () => {
        const rows = [
            makeRow(0, ['s', 'missing'], ['o', 'missing'], ['a', 'present'], ['r', 'missing'], ['e', 'missing']),
            makeRow(1, ['h', 'missing'], ['i', 'present'], ['j', 'missing'], ['a', 'present'], ['b', 'missing']),
            makeRow(2, ['c', 'present'], ['a', 'correct'], ['l', 'missing'], ['i', 'correct'], ['f', 'missing']),
            makeRow(3, ['p', 'missing'], ['a', 'correct'], ['n', 'missing'], ['i', 'correct'], ['c', 'present']),
        ];

        expect(filterSolutions(rows, words)).toEqual(['tacit']);
    });

    test('should not match the same letter multiple times', () => {
            const rows = [ makeRow(0,
                // AGILE
                ['s', 'present'],
                ['a', 'missing'],
                ['s', 'present'],
                ['s', 'present'],
                ['y', 'missing'],
            )];

        expect(filterSolutions(rows, words)).toEqual([]);
    });
});
