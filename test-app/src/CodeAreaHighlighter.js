import React, { useEffect, useLayoutEffect, useState } from 'react';
import Parser from 'web-tree-sitter';

const setupParser = async () => {
  await Parser.init();
  const JavaScript = await Parser.Language.load('tree-sitter-javascript.wasm');
  const parser = new Parser();
  parser.setLanguage(JavaScript);
  return parser;
};

const highlightClasses = {
  identifier: 'identifier',
  string: 'string'
};

const getClassName = type => highlightClasses[type];

const Highlight = ({ node, children }) => {
  const className = getClassName(node.type);
  return className ? (
    <span className={className} key={node.id}>
      {children}
    </span>
  ) : children;
};

const walkTree = (text, tree) => {
  let previousIndex = 0;

  const getStr = node => {
    const str = text.substring(previousIndex, node.endIndex);
    previousIndex = node.endIndex;
    return str;
  };

  const walk = node => (
    <Highlight node={node}>
      {node.childCount > 0 ? node.children.map(walk) : getStr(node)}
    </Highlight>
  );
  return walk(tree.rootNode);
};

export const CodeAreaHighlighter = ({ text$ }) => {
  const [text, setText] = useState();
  const [parser, setParser] = useState();
  const [tree, setTree] = useState();

  useEffect(() => text$.subscribe(setText).unsubscribe, [text$, setText]);

  useEffect(() => {
    setupParser().then(setParser);
  }, []);

  useLayoutEffect(() => {
    if (!parser) {
      return;
    }
    // TODO set edit for efficient updates
    setTree(parser.parse(text));
  }, [parser, text]);

  return <pre>{tree ? walkTree(text, tree) : text}</pre>;
  //return <pre>{text}</pre>;
};
