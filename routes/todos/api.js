var express = require('express'); //standard
var router = express.Router();    //standard

var Todo = require('../../models/todos');

router.route('/')
  .get(function(req, res, next) {
    Todo.findAsync({}, null, {sort: {"_id": 1}}) //{} means all records, first param is fetch specific documents, 2nd param is certain fields in the response, so {text: 1, done: 1}
    .then(function(todos) {
      res.json(todos);
    })
    .catch(next);
  })
  .post(function(req, res, next) {
    var todo = new Todo();
    todo.text = req.body.text;
    todo.saveAsync()
    .then(function(todo) {
      console.log("success");
      res.json({'status': 'success', 'todo': todo});
    })
    .catch(function(e) {
      console.log("fail");
      res.json({'status': 'error', 'error': e});
    })
    .error(console.error);
  });

router.route('/:id')
  .get(function(req, res, next) {
    Todo.findOneAsync({_id: req.params.id}, {text: 1, done: 1})
    .then(function(todo) {
      res.json(todo);
    })
    .catch(next)
  })
  .put(function(req, res, next) {
    var todo = {};
    for(var prop in req.body) {
      todo[prop] = req.body[prop];
    }
    Todo.updateAsync({_id: req.params.id}, todo)
    .then(function(updatedTodo) {
      return res.json({'status': 'success', 'todo': updatedTodo});
    })
    .catch(next);
  })
  .delete(function(req, res, next) {
    Todo.findByIdAndRemoveAsync(req.params.id)
    .then(function(deletedTodo) {
      res.json({'status': 'success', 'todo': deletedTodo});
    })
    .catch(function(e) {
      res.status(400).json({'status': 'fail', 'error': e});
    })
    .error(console.error);
  })

module.exports = router;
