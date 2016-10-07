var express = require('express');
var router = express.Router();
var todosService = require('../services/todoService');

/* GET todos listing. */
router.get('/', function(req, res) {
	todosService.all(function(err, data) {
		res.send(data);
	});
});

router.post('/', function(req, res) {
	var todo = req.body.todo;

	todoService.save(todo, function(err) { 	});
});

module.exports = router;