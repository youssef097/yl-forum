
const con = require("../db")

module.exports =  class User {
    constructor(data){
        if(!data.id){
            throw new Error("Id is required in order to")
        }
    }

    save(){
        con.query(`INSERT INTO  users values ()`,(error, results, fields)=>{
            if(error) throw error;
            console.log(fields);
            console.log(results);
        })
        con.end()
    }

    getUserById(id){
        con.query(`SELECT * FROM users where id = ${id}`,(error, results, fields)=>{
            if(error) throw error;
            console.log(fields);
            console.log(results);
        })
        con.end()
    } 
    getUserById(getAllUsers){
        con.query(`SELECT * FROM users`,(error, results, fields)=>{
            if(error) throw error;
            console.log(fields);
            console.log(results);
        })
        con.end()
    }

    static createTable(){
        con.query(`
            CREATE TABLE IF NOT EXISTS users(          
                id int(20),
                name varchar(255),
                email varchar(255),
                bio varchar(255),
                ubication varchar(255),
                PRIMARY KEY (id)          
            );
        `)
    }

}

