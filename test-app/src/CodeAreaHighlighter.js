import React, { useCallback, useEffect, useState } from 'react';
import Parser from 'web-tree-sitter';

const setupParser = async () => {
  await Parser.init();
  const JavaScript = await Parser.Language.load('tree-sitter-javascript.wasm');
  const parser = new Parser;
  parser.setLanguage(JavaScript);
  const sourceCode = 'let x = 1; console.log(x);';
  const tree = parser.parse(sourceCode);
  console.log(tree.rootNode.toString());
};

export const CodeAreaHighlighter = ({ text$ }) => {
  const [text, setText] = useState();

  useEffect(() => text$.subscribe(setText).unsubscribe, [text$, setText]);

  useEffect(() => {
    setupParser();
  }, []);

  return (
    <pre>{text}</pre>
  );
};
