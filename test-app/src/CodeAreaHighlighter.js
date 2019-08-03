import React, { useCallback, useEffect, useState } from 'react';
import Parser from 'web-tree-sitter';

const setupParser = async () => {
  await Parser.init();
  const JavaScript = await Parser.Language.load('tree-sitter-javascript.wasm');
  const parser = new Parser();
  parser.setLanguage(JavaScript);
  return parser;
};

let tokens;
const walk = node => {
  if (node.childCount > 0 && node.type !== 'string') {
    node.children.forEach(walk);
  } else {
    tokens.push(node.text);
  }
};

export const CodeAreaHighlighter = ({ text$ }) => {
  const [text, setText] = useState();
  const [parser, setParser] = useState();

  useEffect(() => text$.subscribe(setText).unsubscribe, [text$, setText]);

  useEffect(() => {
    setupParser().then(setParser);
  }, []);

  useEffect(() => {
    if (!parser) {
      return;
    }
    const tree = parser.parse(text);
    console.log(tree.rootNode.toString());

    tokens = [];
    walk(tree.rootNode);
    console.log(tokens);
  }, [parser]);

  return <pre>{text}</pre>;
};
