const mysql = require('mysql');
const {promisify}= require('util')
 const {database}= require('./keys');
const { query } = require('express');
  const pool = mysql.createPool(database);

  pool.getConnection(( err, connection)=>{
    if (err) {
                
      if (err.code === 'PROTOCOL_CONNECTION_LOST'){
        console.error('database connection was closed');
      }
      if (err.code === 'ER_CON_COUNT_ERROR'){
        console.error('database has to many connections');
      }
      if(err.code === 'ECONNREFUSED'){
        console.error('database connection was refuse');
      }
      return;
    }
    if(connection) connection.release();
    console.log('DB is connected');
     return;
    
  });
//   promisify pool query
  pool.query = promisify(pool.query);


  module.exports = pool;