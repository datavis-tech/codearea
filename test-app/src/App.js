import React, { useRef, useEffect, useState, useMemo } from 'react';
import './App.css';
import { initialText } from './initialText';
import { Subject } from 'rxjs';
import { useOps } from './useOps';

function App() {
  const [text, setText] = useState(initialText);

  const op$ = useMemo(() => new Subject(), []);

  useOps(text, op$);

  useEffect(() => {
    op$.subscribe({
      next: v => console.log(`observerB: ${v}`)
    });
  }, []);

  const onTextChange = event => {
    setText(event.target.value);
  };

  return (
    <div className="App">
      <textarea
        value={text}
        onChange={onTextChange}
        className="codearea-textarea"
      />
    </div>
  );
}

export default App;
