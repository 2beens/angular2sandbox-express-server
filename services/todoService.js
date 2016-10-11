var jsonfile = require('jsonfile');
var todosDataFile = './data/todos.json';
var logService = require('./logService');

var todoService = {};

var todosCount = 0;
var todosDirty = true;
var todosCache = [];

todoService.all = function(callback) {
	if(!todosDirty) {
		callback({}, todosCache);
		return;
	}

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
}

todoService.save = function(todo, callback) {
	if(todo === null || todo === undefined) {
		callback({ message: 'Todo cannot be null.' }, todo);
		return;
	}

	todo.id = ++todosCount;
	var todosData = { todos: todosCache };
	todosData.todos.push(todo);
	
	logService.log('TodoService: trying to save todo: ' + todo.id);

	jsonfile.writeFile(todosDataFile, todosData, {spaces: 3}, function (err) {
		if(err === null || err === undefined) {
			logService.log('New Todo saved! Id: ' + todo.id);
			todosDirty = true;
		}

		callback(err, todo);
	});
}

todoService.update = function(todo, callback) {
	if(todo === null || todo === undefined) {
		callback({ message: 'Todo cannot be null.' }, todo);
		return;
	}

	var todoIndex = findTodoIndex(todo.id);
	if(todoIndex === null || todoIndex === undefined || todoIndex < 0) {
		callback({ message: 'Cannot find todo for update.' }, todo);
		return;
	}

	todosCache[todoIndex] = todo;

	logService.log('TodoService: trying to update todo: ' + todo.id);
	jsonfile.writeFile(todosDataFile, { todos: todosCache }, {spaces: 3}, function (err) {
		if(err === null || err === undefined) {
			logService.log('Todo updated! Id: ' + todo.id);
			todosDirty = true;
		}

		callback(err, todo);
	});
}

function findTodoIndex(todoId) {
	return todosCache.findIndex(function(element, index, array) {
		return element.id === todoId;
	});
}

module.exports = todoService;