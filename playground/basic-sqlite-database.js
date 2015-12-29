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

var User = sequelize.define('user', {
	email: Sequelize.STRING
	// same as email: { type: Sequelize.STRING }
});

Todo.belongsTo(User);
User.hasMany(Todo);

// force: true => drop all table and recreate 
// force: false => create table onlyif it not exist
//.sync({force: true}).then(
sequelize.sync().then(function(){
	console.log('Everything is synced');
	// User.create({
	// 	email: 'sai@hot.com'
	// }).then( function() {
	// 	return Todo.create({
	// 		description: 'Clean the room'
	// 	});
	// }).then( function (todo) {
	// 	User.findById(1).then(function (user) {
	// 		user.addTodo(todo);
	// 	});
	// })
	User.findById(1).then(function (user) {
		user.getTodos({
			where: {
				completed: false
			}
		}).then( function (todos){
			todos.forEach(function (todo) {
				console.log(todo.toJSON());
			});
		});
		// function of sequelize 'get'+Modelname+'s' (capitalized)
		// take same syntax as findOne/findAll
	});
});

// foreign key = userId in todo table

