var express = require('express');
var bodyParser = require('body-parser');
var _= require('underscore');

var app = express();
var PORT = process.env.PORT || 3000;
var todos = [];
var todoNextId = 1;

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
	matchedTodo = _.findWhere(todos, {id: todoId});
	if (matchedTodo)
		res.send(matchedTodo);
	else 
		res.status(404).send();
});

// POST /todos
app.post('/todos', function(req, res) {
	var body = _.pick(req.body, 'description', 'completed');

	if (!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length==0){
		return res.status(404).send();
	}
	body.description = body.description.trim();

	body.id = todoNextId++;
	todos.push(body);
	res.json(body);
});

// DELETE /todos/:id
app.delete('/todos/:id', function(req, res){
	var todoId = parseInt(req.params.id);
	var matchedTodo = _.findWhere(todos, {id: todoId});
	
	if (matchedTodo){
		todos = _.without(todos, matchedTodo);
		res.send('Successfully deleted');
	}
	else 
		res.status(404).send();
});

app.listen(PORT, function(){
	console.log('express listenting on port '+PORT);
});



