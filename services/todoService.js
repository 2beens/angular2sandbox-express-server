var jsonfile = require('jsonfile');
var todosDataFile = './data/todos.json';
var logService = require('./logService');

var todoService = {};

var todosCount = 0;
var todosDirty = true;
var todosCache = [];

todoService.all = function(callback) {
	if(todosDirty) {
		jsonfile.readFile(todosDataFile, function(err, data) {
			if(err !== null && err !== undefined) {
				logService.log('Error occured whyle reading Todos JSON file:');
				logService.err(err);
			} else {
				todosCount = data.todos.length;
				logService.log('Getting all todos! Received todos: ' + todosCount);
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
	todo.id = ++todosCount;
	var todosData = { todos: todosCache };
	todosData.todos.push(todo);
	
	logService.log('TodoService: trying to save todo: ' + todo);
	jsonfile.writeFile(todosDataFile, todosData, {spaces: 3}, function (err) {
		if(err === null || err === undefined) {
			logService.log('New Todo saved! Id: ' + todo.id);
			todosDirty = true;
		}

		callback(err, todo);
	});
}

module.exports = todoService;