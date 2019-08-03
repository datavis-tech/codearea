import React, { useEffect, useState } from 'react';
import Parser from 'web-tree-sitter';

const setupParser = async () => {
  await Parser.init();
  const JavaScript = await Parser.Language.load('tree-sitter-javascript.wasm');
  const parser = new Parser();
  parser.setLanguage(JavaScript);
  return parser;
};

const walk = (node, tokens) => {
  if (node.childCount > 0 && node.type !== 'string') {
    for (let i = 0; i < node.childCount; i++) {
      walk(node.children[i], tokens);
    }
  } else {
    tokens.push(node.text);
  }
  return tokens;
};

export const CodeAreaHighlighter = ({ text$ }) => {
  const [text, setText] = useState();
  const [parser, setParser] = useState();
  const [tokens, setTokens] = useState();

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

    setTokens(walk(tree.rootNode, []));
  }, [parser, text]);

  return (
    <pre>{tokens ? tokens.map((token, i) => <span key={i}>{token}</span>) : text}</pre>
  );
  //return <pre>{text}</pre>;
};
