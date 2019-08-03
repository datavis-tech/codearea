import React, { useEffect, useState, Fragment } from 'react';
import Parser from 'web-tree-sitter';

const setupParser = async () => {
  await Parser.init();
  const JavaScript = await Parser.Language.load('tree-sitter-javascript.wasm');
  const parser = new Parser();
  parser.setLanguage(JavaScript);
  return parser;
};

const getClassName = type => {
  if(type === 'identifier'){
    return type;
  }
  return null;
};

// && node.type !== 'string'
const walkTree = (text, tree) => {
  let previousIndex = 0;
  const walk = node => {
    if (node.childCount > 0) {
      return <Fragment key={node.id}>{node.children.map(walk)}</Fragment>;
    } else {
      const str = text.substring(previousIndex, node.endIndex);
      previousIndex = node.endIndex;
      const className = getClassName(node.type);
      return className ? (
        <span className={className} key={node.id}>
          {str}
        </span>
      ) : (
        <Fragment key={node.id}>{str}</Fragment>
      );
    }
  };
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

  useEffect(() => {
    if (!parser) {
      return;
    }
    // TODO set edit for efficient updates
    setTree(parser.parse(text));
  }, [parser, text]);

  return <pre>{tree ? walkTree(text, tree) : text}</pre>;
  //return <pre>{text}</pre>;
};
