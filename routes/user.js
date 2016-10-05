var express = require('express');
var router = express.Router();

var dummyUsers = [
	{ id: 1, name: 'User 1' },
	{ id: 2, name: 'User 2' },
	{ id: 3, name: 'User 3' }
];

/* GET users listing. */
router.get('/', function(req, res) {
	res.send('respond with a resource');
});

router.get('/test', function(req, res) {
	var testUser = {
		id: 1,
		name: 'Test User'
	};

	res.send(testUser);
});

router.get('/all', function(req, res) {
	res.send(dummyUsers);
});

module.exports = router;
