var express = require('express');
var router = express.Router();
var todosService = require('../services/todoService');

/* GET todos listing. */
router.get('/', function(req, res) {
	var todos = todosService.all(function(err, data) {
		res.send(data.todos);
	});
});

router.post('/', function(req, res) {
	var todo = req.body.todo;

	todoService.save(todo, function(err) {
		console.log('New todo saved: ' + todo);
	});
});

module.exports = router;