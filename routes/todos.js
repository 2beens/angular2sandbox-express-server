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
	if(todo === null || todo === undefined) {
		res.status(400).send('Received todo object is null/undefined!');
		return;
	}

	todosService.save(todo, function(err, todo) { 
		res.send(todo);
	});
});

module.exports = router;