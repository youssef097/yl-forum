const moment = require("moment");
const uuid = require("uuid")
const con = require("../db")

module.exports = class Post {
    constructor(topic_id, user_id, text) {
        this.id = uuid.v1();
        this.topic_id = topic_id;
        this.user_id = user_id;                
        this.text = text
        this.date = moment().format("YYYY-MM-DD");
    }

    save(callback) {
        con.query(`INSERT INTO  post values ('${this.id}','${this.user_id}','${this.topic_id}','${this.date}','${this.text}','0')`, callback)
    }
    static getPostsByUser(u_id,callback){
        con.query(`SELECT post.text ,post.likes, post.date, topic.title, topic.id as t_id, user.id as u_id, user.name as u_name  
                FROM post INNER 
                JOIN topic
                ON post.topic_id = topic.id 
                INNER JOIN  user
                on user.id = post.user_id
                `,callback)            
        if(u_id){
        }

        // else{
        // //     con.query
        // // }

        // con.query(``)
    }
}