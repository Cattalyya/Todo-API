var express = require('express');
var bodyParser = require('body-parser');
var _= require('underscore');
var db = require('./db.js');

var app = express();
var PORT = process.env.PORT || 3000;
var todos = [];
var todoNextId = 1;

app.use(bodyParser.json());

app.get('/', function(req, res) {
	res.send('<h1>Todo API Root</h1>');
});

// GET /todos?completed=true?keyword=work
app.get('/todos', function(req, res){
	var query  = req.query;
	var where =  {};



	if(query.hasOwnProperty('completed') && _.isBoolean(JSON.parse(query.completed)) ){
		where.completed = JSON.parse(query.completed);
	} 
	if(query.hasOwnProperty('keyword') && query.keyword.trim().length>0  ){
		where.description = {$like: '%'+query.keyword+'%'} ;
	} 

	db.todo.findAll({where: where}).then(function(todos){
		res.json(todos);
	},function(e){
		res.status(500).send();
	});

	// var filteredTodos = todos;

	// if(queryParams.hasOwnProperty('completed') && _.isBoolean(JSON.parse(queryParams.completed)) ){
	// 	filteredTodos = _.where(filteredTodos, {'completed': JSON.parse(queryParams.completed)})
	// } else if(queryParams.hasOwnProperty('completed') ){
	// 	res.status(400).send();	
	// }
	// if(queryParams.hasOwnProperty('keyword') && _.isString( queryParams.keyword.trim() ) && queryParams.keyword.trim().length>0  ){
	// 	filteredTodos = _.filter(filteredTodos, function(eachList){
	// 		if( eachList.description.toLowerCase().indexOf( queryParams.keyword.trim().toLowerCase() ) != -1)
	// 			return true;
	// 	});
	// } else if ( queryParams.hasOwnProperty('keyword') ) {
	// 	res.status(400).send();	
	// }
	// res.json(filteredTodos);
});

// GET /todos/:id
app.get('/todos/:id', function(req, res){
	var todoId = parseInt(req.params.id);

	db.todo.findById(todoId).then(function(todo){
		if (!!todo) {
			res.json(todo.toJSON());
		} else {
			res.status(404).send();
		}
	}, function(e){
		res.status(500).send();
		// error with database & server
	});
});

// POST /todos
app.post('/todos', function(req, res) {
	var body = _.pick(req.body, 'description', 'completed');

	db.todo.create(body).then( function(todo){
		res.json(todo.toJSON());
	}, function(e){
		res.status(400).json(e);
	});
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

// PUT /todos/:id   => update todo item

app.put('/todos/:id', function(req, res) {
	var todoId = parseInt(req.params.id);
	var matchedTodo = _.findWhere(todos, {id: todoId});
	var body = _.pick(req.body, 'description', 'completed');
	var validAttributes = {};

	if(!matchedTodo){
		return res.status(404).send();
	}
	if( body.hasOwnProperty('completed') && _.isBoolean(body.completed)) {
		validAttributes.completed = body.completed;
	}
	else if ( body.hasOwnProperty('completed') ) {
		return res.status(400).send();
	}
	if ( body.hasOwnProperty('description') && _.isString(body.description) && body.description.trim().length!=0) {
		validAttributes.description = body.description;
	}
	else if ( body.hasOwnProperty('description') ) {
		return res.status(400).send();
	}
	_.extend(matchedTodo, validAttributes);
	res.send("Successfully Update data");
});

db.sequelize.sync().then( function(){
	app.listen(PORT, function(){
		console.log('express listenting on port '+PORT);
	});
} );



