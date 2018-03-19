var express = require('express'); //standard
var router = express.Router();    //standard

var todos = require('../models/todos'); //creates a todos model
router.get('/', function(req, res) {
  res.render('todos', {title: 'Todos', todos: todos}); //passes todos model to todos view
});

module.exports = router;
