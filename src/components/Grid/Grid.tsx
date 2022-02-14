import { useSelector } from "react-redux";
import { selectRows } from "store";
import Cell from './Cell/Cell';
import _ from './Grid.module.scss';

export default function Grid() {
    const rows = useSelector(selectRows);

    return (
        <div className={_.Grid}>
            {rows.map(row => (
                row.map(cell => (
                    <Cell cell={cell} key={cell.id} />
                ))
            ))}
        </div>
    );
}