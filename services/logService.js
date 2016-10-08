var logService = {};

logService.log = function(message) {
	console.log(message);
}

logService.err = function(message) {
	console.error(message);
}

module.exports = logService;