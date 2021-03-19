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
    static getPostsByTopic(topic_id, callback) {
        con.query(`SELECT post.text ,post.likes,post.id, post.date, topic.title, topic.id as t_id,topic.image as t_img, user.id as u_id, user.name as u_name  
                FROM post INNER 
                JOIN topic
                ON post.topic_id = topic.id
                INNER JOIN  user
                on user.id = post.user_id
                where topic.id = '${topic_id}' `, callback)
    }

    static relevantPosts(callback) {
        con.query(`SELECT post.text , post.id,post.likes, post.date, count(comment.post_id) as comments, topic.title, topic.id as t_id,topic.image as t_img, user.id as u_id, user.name as u_name  
        FROM post 
        INNER JOIN topic ON post.topic_id = topic.id
        INNER JOIN  user ON user.id = post.user_id
        LEFT JOIN comment ON comment.post_id = post.id
        GROUP BY post.id
        order by likes`, callback)
    }

    static getPosts(u_id, callback) {
        con.query(`SELECT post.text, post.id, count(comment.post_id) as comments, post.likes, post.date, topic.title,  topic.id as t_id,topic.image as t_img,user.id as u_id, user.name as u_name 
                FROM post 
                INNER JOIN topic ON post.topic_id = topic.id                                
                INNER JOIN user ON user.id = post.user_id
                INNER JOIN subscription ON subscription.topic_id = topic.id               
                LEFT JOIN comment ON comment.post_id = post.id
                WHERE subscription.user_id = '${u_id}'
                GROUP BY post.id
                `, callback)

    }
    static getPost(id, callback) {
        con.query(`SELECT post.text, post.id, post.likes, post.date, topic.title, topic.id as t_id,topic.image as t_img  
                FROM post INNER JOIN topic
                ON post.topic_id = topic.id
                where post.id = '${id}';              
                `, callback)
    }

    static getNumComments(post_id) {
        con.query(`SELECT count(comment.id) from comment where comment.post_id =  'post_id';`, callback)
    }

    static getPostsByUser(u_id, callback) {
        console.log(u_id);
        con.query(`SELECT post.text, post.likes, post.date, count(comment.post_id) as comments, post.id, topic.title, topic.id as t_id,topic.image as t_img  
                FROM post 
                LEFT JOIN comment ON comment.post_id = post.id
                INNER JOIN topic ON post.topic_id = topic.id 
                INNER JOIN  user ON user.id = post.user_id
                WHERE post.user_id = '${u_id}'
                GROUP by post.id;              
                `, callback)
    }
}

// SELECT * FROM post WHERE post.user_id = '4c291b90-79eb-11eb-a0f7-b7e091b52365'