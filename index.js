var express = require('express');
var todoController = require('./controllers/todoController');
var app = express();

app.set('view engine','ejs');

app.use('/assets',express.static('./public/assets'));

todoController(app);

app.listen(3000);
console.log('Port : 3000');
