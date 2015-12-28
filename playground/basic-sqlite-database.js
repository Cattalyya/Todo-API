var Sequelize = require('sequelize');
var sequelize = new Sequelize(undefined, undefined, undefined, {
	'dialect': 'sqlite',
	'storage': __dirname+'/basic-sqlite-database.sqlite'
});

var Todo = sequelize.define('todo', {
	description: {
		type: Sequelize.STRING,
		allowNull: false,
		// not optional => require to fill form
		validate:{
			len: [1,250]
		}
	},
	completed: {
		type: Sequelize.BOOLEAN,
		allowNull: false,
		defaultValue: false
		// if not give value => it's ok
	}
});

// force: true => drop all table and recreate 
// force: false => create table onlyif it not exist
//.sync({force: true}).then(
sequelize.sync().then(function(){
	console.log('Everything is synced');
	
	Todo.create({
		description: 'Walk to Lobby7',
		completed: false
	}).then(function(todo) {
		return Todo.create({
			description: 'Clean room'
		});
	}).then(function(){
		//return Todo.findById(1);
		return Todo.findAll({
			where: {
				//completed: false
				description: {
					$like: '%lobby%'
				}
			}
		});
	}).then(function(todos){
		if(todos) {
			todos.forEach(function(todo){
				console.log(todo.toJSON());
			});
		} else {
			console.log('No todo found');
		}
	})
	.catch(function(error){
		console.log(error);
	});
});

