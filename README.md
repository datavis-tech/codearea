![image](https://user-images.githubusercontent.com/68416/62412128-c6f79f80-b61b-11e9-803e-c5b7413bb99d.png)

A proof-of-concept code editor with syntax highlighting that uses

 * highlighted-pre-over-textarea approach (like [react-simple-code-editor](https://github.com/satya164/react-simple-code-editor))
 * [web-tree-sitter](https://www.npmjs.com/package/web-tree-sitter) for incremental parsing
 * [diff-match-patch](https://github.com/JackuB/diff-match-patch) via [json0-ot-diff](https://github.com/kbadk/json0-ot-diff) for computing text diffs (needed for using tree-sitter)
 * [React](https://reactjs.org/) for DOM updates

For context, see https://github.com/codemirror/codemirror.next/issues/109

To start:

`npm start` to serve the React app.

`node server.js` to serve the Node.js server (required for WASM issues).

This is a very rough prototype and there are known [issues](https://github.com/datavis-tech/codearea/issues).

Feel free to file new issues!
