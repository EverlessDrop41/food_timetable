const password = require("./password");

module.exports = {
	findAll: function (filters, callback) {
		models.User.findAll().then(function (users) {
		    callback(users, null);
		}).catch(function (err) {
		    callback(null, err);
		});
	},
	findById: function (id, callback) {
		//Find by findById
		models.User.findOne({
	      where: {
	        id: id
	      }
	    }).then(callback);
	},
	findUser: function (username, callback) {
		models.User.findOne({
	      where: {
	        name: username
	      }
	    }).then(callback);
	},
	isAdmin: function (username, pword, callback) {
		models.User.findOne({
	      where: {
	        name: username
	      }
	    }).then(function (user) {
	    	if (!user) { 
	    		callback(false, {
					message: "User doesn't exist",
					error: null
				});
				return;
	    	}
	    	password.isMatch(pword, user.password, function (err, match) {
				if (!err && match) {
					callback(user.is_admin, null);
				} else {
					callback(false, {
						message: "Password does not match or there was an error",
						error: err || null
					});
				}
			});
	    });
	},
	register: function (username, pword, is_admin, callback) {
		if (password.isValid(pword)) {
      		password.hash(pword, function (err, hash) {
        		if (err) {
          			callback(false, null, err);
		        } else {
		          	models.User.create({
		            	name: username,
		            	password: hash,
		            	is_admin: is_admin
		          	}).then(function (user) {
		            	callback(true, user, null);
		          	}).catch(function (error) {
		            	callback(false, null, error);
		          	});
		        }
      		});
    	} else {
      		callback(false, null, { message: "Invalid Password" });
    	}
	},
	updateUser: function (newData, callback) {
		// body...
	},
	deleteUser: function (id, callback) {

	}
}
