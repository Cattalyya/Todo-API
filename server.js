var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;
var todos = [{
	id: 1,
	description: 'Complete 18.06 homework',
	completed: false
}, {
	id: 2,
	description: 'Began the exercise',
	completed: false
}, {
	id: 3,
	description: 'Go shopping',
	completed: true
}];

app.get('/', function(req, res) {
	res.send('<h1>Todo API Root</h1>');
});

// GET 
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

	//if 
	//todos.
	res.status(404).send();
});
// params = url parameters

app.listen(PORT, function(){
	console.log('express listenting on port '+PORT);
});