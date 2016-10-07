var jsonfile = require('jsonfile');
var todosDataFile = './data/todos.json';

var todoService = {};

var todosDirty = true;
var todosCache = [];

todoService.all = function(callback) {
	if(todosDirty) {
		jsonfile.readFile(todosDataFile, function(err, data) {
			if(err !== null && err !== undefined) {
				console.log('Error occured whyle reading Todos JSON file:');
				console.error(err);
			} else {
				var todosCount = data.todos.length;
				console.log('Getting all todos! Received todos: ' + todosCount);
				todosCache = data.todos;
				todosDirty = false;
			  	callback(err, todosCache);
			}
		});
	} else {
		callback({}, todosCache);
	}
}

todoService.save = function(todo, callback) {
	jsonfile.writeFile(todosDataFile, todo, {spaces: 3}, function (err) {
		if(err === null || err === undefined) {
			console.log('New Todo saved!');
			todosDirty = true;
		}

		callback(err);
	});
}

module.exports = todoService;