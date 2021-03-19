const con = require("../db")
const uuid = require("uuid")
module.exports = class Comment{

    constructor(comment_id,text,user_id,post_id){
        this.comment_id = comment_id || '';
        this.id = uuid.v4();      
        this.text = text;
        this.user_id = user_id;
        this.post_id = post_id; 
    }

    static getCommentsByPost(postId,cb){
        console.log("query");
        con.query(`SELECT comment.*, user.name as user, user.profile as profile  from comment
        inner join user on comment.user_id = user.id
        WHERE comment.post_id = '${postId}';`,cb)
    }
    static getCommentAnswers(commentId,cb){
        console.log(commentId);
        console.log("quering answers...");
        con.query(`SELECT comment.*, user.name as user, user.profile as profile  from comment
        inner join user on comment.user_id = user.id
        WHERE comment.comment_id = '${commentId}';`,cb)
    }
    static deleteComment(commentId,cb){                
        con.query(`DELETE FROM  comment WHERE comment.id = '${commentId}';`,cb)
    }
    save(cb){
        con.query(`INSERT INTO comment VALUES('${this.id}','${this.user_id}','${this.post_id}','${this.comment_id}','${this.text}');`,cb);
    }

}