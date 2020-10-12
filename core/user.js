const database = require('./database');
const bcrypt = require('bcrypt');


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
    },
    index: function(user, callback){
       

        let sql= `SELECT * FROM users`;

        database.query(sql,user,function(err, result) {
            
            if(err) throw err

            if(result) {
                callback(result)
          
            }
        });
    },

    delete: function(par,callback){
        let sql= `DELETE FROM users WHERE id=${par.id}`;
        database.query(sql,par,function(err, result) {
            if(err) throw err
            if(result) {
                callback(result)
          
            }
        });

    },
    edit: function(par,callback){
        let sql = `SELECT * FROM users WHERE id = ${par.id}`;
        database.query(sql,par,function(err, result) {
            if(err) throw err
            if(result) {
                callback(result)
          
            }
        });


    },
    update: function(userUpdate,reqs,callback){
        console.log(userUpdate)
        
        let sql = `UPDATE users set ? WHERE id = ${reqs.id}`;
        database.query(sql,userUpdate,function(err, result) {
            if(err) throw err
            if(result) {
                callback(result)
          
            }
        });


    },


    

}
module.exports = User;