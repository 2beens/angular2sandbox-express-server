var jsonfile = require('jsonfile');
var todosDataFile = './data/todos.json';

var todoService = {};

todoService.all = function(callback) {
	jsonfile.readFile(todosDataFile, function(err, data) {
		if(err !== null && err !== undefined) {
			console.log('Error occured whyle reading Todos JSON file:');
			console.error(err);
		} else {
			var todosCount = data.todos.length;
			console.log('Getting all todos! Received todos: ' + todosCount);
		  	callback(err, data);
		}
	});
}

todoService.save = function(todo, callback) {
	jsonfile.writeFile(todosDataFile, todo, {spaces: 3}, function (err) {
		if(err === null || err === undefined) {
			console.log('New Todo saved!');
		}

		callback(err);
	});
}

module.exports = todoService;