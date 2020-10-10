const database = require('./database');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const yourPassword = "here";

function User() {};

User.prototype = {
    // Find the user data by id or username.
    find : function(user = null, callback)
    {
        // if the user variable is defind
        if(user) {
            // if user = number return field = id, if user = string return field = username.
            var field = Number.isInteger(user) ? 'id' : 'name';
        }
        // prepare the sql query
        let sql = `SELECT * FROM users WHERE ${field} = ?`;


        database.query(sql, user, function(err, result) {
            if(err) throw err

            if(result.length) {
                callback(result[0]);
            }else {
                callback(null);
            }
        });
    },

    create : function(body, callback){
        // let pwd=body.password
        // body.password= bcrypt.hashSync(pwd,10);

        var bind = [];
        // loop in the attributes of the object and push the values into the bind array.
        for(prop in body){
            bind.push(body[prop]);
        }

        let sql = `INSERT INTO users(name, email, adress, password) VALUES (?, ?, ?, ?)`;

        database.query(sql, bind, function(err, result) {
            if(err) throw err;
            // return the last inserted id. if there is no error
            callback(result.insertId);
        });
    }

    

}
module.exports = User;