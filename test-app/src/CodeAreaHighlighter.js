import React, { useEffect, useState } from 'react';
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

const walkTree = (text, tree) => {
  let previousIndex = 0;

  const walk = node => {
    let children;
    if (node.childCount > 0) {
      children = node.children.map(walk);
    } else {
      // This approach is required because node.text doesn't include whitespace.
      children = text.substring(previousIndex, node.endIndex);
      previousIndex = node.endIndex;
    }

    const className = highlightClasses[node.type];
    return className ? (
      <span className={className} key={node.id}>
        {children}
      </span>
    ) : (
      children
    );
  };

  return walk(tree.rootNode);
};

export const CodeAreaHighlighter = ({ text$, op$ }) => {
  const [parser, setParser] = useState();
  const [highlighted, setHighlighted] = useState(null);

  useEffect(() => {
    setupParser().then(setParser);
  }, []);

  useEffect(() => {
    if (!parser) {
      return;
    }

    // Initialize the tree.
    const text = text$.getValue();
    let tree = parser.parse(text);
    setHighlighted(walkTree(text, tree));

    return op$.subscribe(op => {
      // TODO set edit for efficient updates, derived from op.
      // console.log(op);

      //tree.edit({
      //  startIndex: 0,
      //  oldEndIndex: 3,
      //  newEndIndex: 5,
      //  startPosition: {row: 0, column: 0},
      //  oldEndPosition: {row: 0, column: 3},
      //  newEndPosition: {row: 0, column: 5},
      //});
      // tree = parser.parse(text$.getValue(), tree);
       
      const text = text$.getValue();
      tree = parser.parse(text);
      setHighlighted(walkTree(text, tree));

      //setTree(parser.parse(text$.getValue()));
    }).unsubscribe;
  }, [parser, text$, op$]);

  return <pre>{highlighted}</pre>;
};
