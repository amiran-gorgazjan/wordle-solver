import { useSelector } from "react-redux";
import { selectSolutions } from "store";

import _ from './SolutionList.module.scss';

export default function SolutionComponent() {
    let solutions = useSelector(selectSolutions);
    const limit = 100;
    const length = solutions.length;
    const isOverLimit = length > limit;

    if (!length) {
        return (
            <div className={_.Solution}>
                <p>No solution found.</p>
            </div>
        )
    }

    // Cut down the number of solutions to the first 100
    if (isOverLimit) {
        solutions = solutions.slice(0, limit);
    }

    const overLimitMessage = isOverLimit ? <p>Showing {limit} out of {length} answers...</p> : null;

    return (
        <div className={_.Solution}>
            {overLimitMessage}

            <div className={_.List}>
                {solutions.map(solution => (
                    <span className={_.Word} key={solution}>{solution}</span>
                ))}
            </div>
            
        </div>
    );
}