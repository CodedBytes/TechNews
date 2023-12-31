/////////////////////////////////////////////////////////////////////////////////////////////
//                               MYSQL DATABASE IMPORT                                     //
//                      Programado por Joao Victor Segantini.                              //
//                                 		                                                   //
/////////////////////////////////////////////////////////////////////////////////////////////
const mysql = require("mysql");

// SQL Config
const conn = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "", 
    database: "news",
    charset : 'utf8mb4',// adicionado charset por conta dos emojis.
    multipleStatements: true
});

// Conecta com a DB
conn.connect((error)=>{
    if(error) throw error;
    else console.log('Database conectada !');
});

// Exportando modulo.
module.exports = conn;