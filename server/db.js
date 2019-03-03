const mysql = require('mysql');
const util = require('util');
const db_connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'project_db'
});

const execQuery = util.promisify(db_connection.query.bind(db_connection));

module.exports = { db_connection, execQuery };
