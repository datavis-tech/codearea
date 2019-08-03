import React from 'react';
import { CodeAreaTextArea } from './CodeAreaTextArea';
import { CodeAreaHighlighter } from './CodeAreaHighlighter';
import "./CodeArea.css";

export const CodeArea = ({ text$ }) => {
  return (
    <div className="code-area" >
      <CodeAreaTextArea text$={text$} />
      <CodeAreaHighlighter text$={text$} />
    </div>
  );
};
