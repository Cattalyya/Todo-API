module.exports = function(sequelize, DataType) {
	return sequelize.define('user', {
		email: {
			type: DataType.STRING,
			allowNull: false,
			unique: true, // to add new user => no other user's email in db is the same as new email
			validate: {
				isEmail: true
			}
		},
		password: {
			type: DataType.STRING,
			allowNull: false,
			validate: {
				len: [7,100]
			}
		}
	}, {
		hooks: {
			beforeValidate: function(user, options) {
				if(typeof user.email === 'string')
					user.email = user.email.toLowerCase();
			}
		}
	});
}