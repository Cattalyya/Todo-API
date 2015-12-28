var Sequelize = require('sequelize');
var env = process.env.NODE_ENV || 'development';
var sequelize;

if (env === 'production') {
	sequelize = new Sequelize(process.env.DATABASE_URL, {
		dialect: 'postgres' // set prostgres db in heroku
	});
}else {
	sequelize = new Sequelize(undefined, undefined, undefined, {
		'dialect': 'sqlite',
		'storage': __dirname+'/data/dev-todo-api.sqlite'
	});
}

// var sequelize = new Sequelize(undefined, undefined, undefined, {
// 	'dialect': 'sqlite',
// 	'storage': __dirname+'/data/dev-todo-api.sqlite'
// });
var db = {};

db.todo = sequelize.import(__dirname+'/models/todo.js');
// load model to separate model => copy to new folder
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

