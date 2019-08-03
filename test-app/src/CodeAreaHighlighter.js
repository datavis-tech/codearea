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

const positionFromIndex = (index, text) => {
  let row = 0;
  let column = 0;
  for (let i = 0; i < index; i++) {
    row++;
    if (text[i] === '\n') {
      column++;
      row = 0;
    }
  }
  return { row, column };
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
      // Handle string insert, string delete,
      // and string replace (one si and one sd, at same index).
      let p, si, sd;
      op.forEach(c => {
        p = c.p;
        si = c.si;
        sd = c.sd;
      });

      const text = text$.getValue();

      const edit = {
        startIndex: p[0],
        oldEndIndex: p[0] + (sd ? sd.length : 0),
        newEndIndex: p[0] + (si ? si.length : 0)
      };

      edit.startPosition = positionFromIndex(edit.startIndex, text);
      edit.oldEndPosition = positionFromIndex(edit.oldEndIndex, text);
      edit.newEndPosition = positionFromIndex(edit.newEndIndex, text);

      // Incremental parsing happens here.
      tree.edit(edit);
      tree = parser.parse(text, tree);

      // Re-generate JSX for highlighting.
      setHighlighted(walkTree(text, tree));
    }).unsubscribe;
  }, [parser, text$, op$]);

  return <pre>{highlighted}</pre>;
};
