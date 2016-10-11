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
	var todo = req.body;
	todosService.save(todo, function(err, todo) { 
		if(err !== null && err !== undefined) {
			res.status(400).send(err);
		} else {
			res.send(todo);
		}
	});
});

router.put('/', function(req, res) {
	var todo = req.body;
	todosService.update(todo, function(err, todo) {
		if(err !== null && err !== undefined) {
			res.status(400).send(err);
		} else {
			res.send(todo);
		}
	});
});

module.exports = router;