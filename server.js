var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;
var todos = [];
var todoNextId = 1;
var bodyParser = require('body-parser');

app.use(bodyParser.json());

app.get('/', function(req, res) {
	res.send('<h1>Todo API Root</h1>');
});

// GET /todos
app.get('/todos', function(req, res){
	res.json(todos);
});

// GET /todos/:id
app.get('/todos/:id', function(req, res){
	var todoId = parseInt(req.params.id);
	todos.forEach( function(item){
		if(item.id === todoId)
		{
			res.json(item);
		}
	});
	res.status(404).send();
});
// params = url parameters

// POST /todos
app.post('/todos', function(req, res) {
	var body = req.body;
	console.log('description: '+body.description);
	res.json(body.description);
});

app.listen(PORT, function(){
	console.log('express listenting on port '+PORT);
});