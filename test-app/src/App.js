import React, { useMemo } from 'react';
import './App.css';
import { initialText } from './initialText';
import { Subject, BehaviorSubject } from 'rxjs';
import { useOps } from './useOps';
import { CodeArea } from './CodeArea';

function App() {
  const text$ = useMemo(() => new BehaviorSubject(initialText), []);
  const op$ = useMemo(() => new Subject(), []);

  useOps(text$, op$);

  //useEffect(
  //  () =>
  //    op$.subscribe({
  //      next: op => {
  //        console.log(op);
  //      }
  //    }).unsubscribe,
  //  [op$]
  //);

  return (
    <div className="App">
      <CodeArea text$={text$} op$={op$}/>
    </div>
  );
}

export default App;
