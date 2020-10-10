const util = require('util');
const mysql = require('mysql');
//database conexion y configuracion
var database = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database:"form_node"
});

database.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

database.query=util.promisify(database.query);
module.exports= database;