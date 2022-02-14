import _ from './App.module.scss';
import Grid from 'components/Grid/Grid';
import Solution from 'components/Solution/Solution';

function App() {
  return (
    <div className={_.App}>
      <header className={_.Header}>
        <h1 className={_.Title}>Wordle Solver</h1>
        <p>Start typing and then click on the letters to switch between hint states.</p>
      </header>
      <section className={_.Body}>
        <div className={_.GridWrapper}>
          <Grid />
        </div>
        <div className={_.SolutionWrapper}>
          <h2>Solution</h2>
          <Solution />
        </div>
      </section>
    </div>
  );
}

export default App;
