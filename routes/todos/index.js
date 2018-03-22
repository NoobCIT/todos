var express = require('express'); //standard
var router = express.Router();    //standard

// var todos = require('../models/todos'); //creates a todos model
// router.get('/', function(req, res) {
//   res.render('todos', {title: 'Todos', todos: todos}); //passes todos model to todos view
// });

// var Todo = require('../models/todos'); //use todos model schema
// router.get('/', function(req, res) {
//   Todo.find(function(err, todos) {
//     if (err) return console.error(err);
//     res.render('todos', {title: 'Todos', todos: todos});
//   });
// });

var Todo = require('../../models/todos'); //use todos model schema
router.get('/', function(req, res, next) {
  Todo.findAsync({}, null, {sort: {"_id": 1}})
  .then(function(todos) {
    res.render('todos', {title: 'Todos', todos: todos});
  })
  .catch(next)
  .error(console.error);
});

module.exports = router;
