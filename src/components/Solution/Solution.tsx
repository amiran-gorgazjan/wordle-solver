import { useSelector } from "react-redux";
import { selectSolutions } from "store";

import _ from './Solution.module.scss';

export default function SolutionComponent() {
    const solutions = useSelector(selectSolutions);

    console.log(solutions.length);

    if (!solutions.length) {
        return (
            <div className={_.Solution}>
                <p>No solution found.</p>
            </div>
        )
    }

    if (solutions.length > 100) {
        return (
            <div className={_.Solution}>
                <p>Too many solutions found (over 100). Please add more letters.</p>
            </div>
        )
    }

    return (
        <div className={_.Solution}>
            {solutions.map(solution => (
                <p key={solution}>{solution}</p>
            ))}
        </div>
    );
}