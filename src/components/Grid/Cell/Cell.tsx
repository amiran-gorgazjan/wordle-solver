import { MouseEventHandler } from "react";
import { useDispatch } from "react-redux";
import classNames from 'classnames';
import { Cell, updateCell, cellStates } from 'slices/gridSlice';
import _ from './Cell.module.scss';

let cx = classNames.bind(_);

export default function CellComponent({ cell } : { cell: Cell }) {
    const dispatch = useDispatch();

    const toggleStateForward: MouseEventHandler<HTMLDivElement> = ev => {
        ev.preventDefault();

        if (cell.state === null) {
            dispatch(updateCell({
                ...cell,
                state: cellStates[0],
            }));
            return;
        }

        let nextIndex = cellStates.indexOf(cell.state) + 1;

        if (!cellStates[nextIndex]) {
            nextIndex = 0;
        }

        dispatch(updateCell({
            ...cell,
            state: cellStates[nextIndex],
        }));
    }

    const toggleStateBackward: MouseEventHandler<HTMLDivElement> = ev => {
        ev.preventDefault();

        if (cell.state === null) {
            dispatch(updateCell({
                ...cell,
                state: cellStates[cellStates.length - 1],
            }));
            return;
        }

        let nextIndex = cellStates.indexOf(cell.state) - 1;

        if (!cellStates[nextIndex]) {
            nextIndex = cellStates.length - 1;
        }

        dispatch(updateCell({
            ...cell,
            state: cellStates[nextIndex],
        }));
    }

    if (cell.character) {
        return (
            <div
                className={cx({
                    [_.Cell]: true,
                    [_[cell.state || 'missing']]: true,
                })}
                onClick={toggleStateForward}
                onContextMenu={toggleStateBackward}
            >
                {cell.character.toUpperCase()}
            </div>
        );
    }

    return (
        <div className={_.Cell} />
    );
}