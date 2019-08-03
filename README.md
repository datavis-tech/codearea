A proof-of-concept code editor with syntax highlighting that uses

 * highlighted-pre-over-textarea approach (like [react-simple-code-editor](https://github.com/satya164/react-simple-code-editor))
 * tree-sitter for incremental parsing
 * diff-match-patch for computing text diffs (needed for using tree-sitter)
 * React for DOM updates


For context, see https://github.com/codemirror/codemirror.next/issues/109

To start:

`npm start` to serve the React app.

`node server.js` to serve the Node.js server (required for WASM issues).

