const express = require('express')
const app = express()
app.use('/static/js', express.static(__dirname + '/node_modules/web-tree-sitter'))
app.use(express.static('static'));
const port = 4000
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
