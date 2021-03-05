
const con = require("../db")
const uuid = require("uuid")
const moment = require("moment");


module.exports = class User{
    constructor(name, email, pass) {
        this.id = uuid.v1();
        this.name = name;
        this.email = email;
        this.pass = pass;
        this.date = moment().format("YYYY-MM-DD");
    }
    
    save(callback) {        
        con.query(`INSERT INTO  user (id,name,email,pass,date) 
                   values ('${this.id}','${this.name}','${this.email}','${this.pass}','${this.date}')`,callback)         
    }

    static getUserById(id,callback) {
        con.query(`SELECT * FROM user where id = '${id}'`,callback)
    }
    
    // Get users that you follow
    static getFollows(id,callback) {   
        con.query(`SELECT user.name,user.id,user.profile,user.bio 
                   FROM follows
                   INNER JOIN user ON follows.followed_id = user.id                   
                   WHERE follows.user_id = '${id}'`,callback)
    }

    static isFollowed(id,f_id,callback){
        con.query(`SELECT * FROM follows where user_id = '${id}' and  followed_id = '${f_id}'; `,callback)
    }

    static getUserByField(field,value,callback) {
        con.query(`SELECT * FROM user where ${field} = '${value}'`,callback)
    }

    // To follow a user
    static follow(id,f_id,callback) {
        con.query(`INSERT INTO follows values ('${id}','${f_id}');
                   UPDATE user SET user.follows = user.follows + 1 where id = '${id}';
                   UPDATE user SET user.followers = user.followers + 1 where id = '${f_id}'`,callback)                 
    }



    static unfollow(id,f_id,callback) {
        console.log(id,f_id);
        con.query(`DELETE  FROM follows WHERE user_id = '${id}' and followed_id = '${f_id}';
                   UPDATE user SET follows = follows - 1 where id = '${id}';
                   UPDATE user SET followers = followers - 1  where id = '${f_id}';  `,callback)                 
    }

    static getAllUsers(callback) {
        con.query(`SELECT * FROM user`, callback) 
    }

    static updateField(field,newValue,id, callback) {
        con.query(`UPDATE user SET ${field} = '${newValue}' WHERE id = '${id}'`, callback) 
    }
  

}

