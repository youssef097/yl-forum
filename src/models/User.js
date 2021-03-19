
const con = require("../db")
const uuid = require("uuid")
const moment = require("moment");

const userFields = `(SELECT count(*) FROM follows WHERE follows.followed_id = user.id ) AS  followers,
(SELECT count(*) FROM follows WHERE follows.user_id = user.id ) AS  follows,
(SELECT count(*) FROM post WHERE post.user_id = user.id ) AS  posts  `

module.exports = class User {
    constructor(name, email, pass) {
        this.id = uuid.v1();
        this.name = name;
        this.email = email;
        this.pass = pass;
        this.date = moment().format("YYYY-MM-DD");
    }

    save(callback) {
        con.query(`INSERT INTO  user (id,name,email,pass,date) 
                   values ('${this.id}','${this.name}','${this.email}','${this.pass}','${this.date}')`, callback)
    }

    static getUserById(id, my_id, callback) {
        con.query(`SELECT user.*, ${userFields} 
        ${!my_id ? "" : `,(SELECT count(*)>0 FROM friendship where user_id = '${my_id}' and  friend_id = '${id}' and accepted = 'true') as isFriend, 
        (SELECT count(*)>0 FROM follows where user_id = '${my_id}' and  followed_id = '${id}') as isFollowed`} 
        from user            
        where user.id = '${id}'   `, callback)
    }

    // Get users that you follow
    static getFollows(id, callback) {
        con.query(`SELECT user.name,user.id,user.profile,user.bio 
                   FROM follows
                   INNER JOIN user ON follows.followed_id = user.id                   
                   WHERE follows.user_id = '${id}'`, callback)
    }

    static isFollowed(id, f_id, callback) {
        con.query(`SELECT * FROM follows where user_id = '${id}' and  followed_id = '${f_id}'; `, callback)
    }
    static isFriend(id, f_id, callback) {
        con.query(`SELECT * FROM friendship where user_id = '${id}' and  friend_id = '${f_id}' and accepted = 'true'; `, callback)
    }

    static getUserByField(field, value, callback) {
        con.query(`SELECT * FROM user where ${field} = '${value}'`, callback)
    }

    // To follow a user
    static follow(id, f_id, callback) {
        con.query(`INSERT INTO follows values ('${id}','${f_id}');`, callback)
    }



    static unfollow(id, f_id, callback) {
        console.log(id, f_id);
        con.query(`DELETE  FROM follows WHERE user_id = '${id}' and followed_id = '${f_id}';`, callback)
    }

    static getAllUsers(my_id, callback) {
        console.log("My id!",my_id);
        let sql = `SELECT user.*, ${userFields} ${!my_id ? "" : `,(SELECT count(*)>0 FROM friendship where user_id = '${my_id}' and  friend_id = user.id and accepted = 'true') as isFriend, 
        (SELECT count(*)>0 FROM follows where user_id = '${my_id}' and  followed_id = user.id) as isFollowed`} from user`
        console.log(sql);
        con.query(sql, callback)
    }

    static suggestedFriends(u_id, callback) {
        con.query(`SELECT  user.name, user.id, user.profile, user.bio  FROM user`, callback)
    }

    static getSentFriendRequests(u_id, callback) {
        con.query(`SELECT friendship.accepted as accepted, user.name,user.id,user.profile,user.bio 
        FROM friendship
        INNER JOIN user ON friendship.user_id = user.id                   
        WHERE friendship.user_id = '${u_id}'`, callback)
    }
    static getReceivedFriendRequests(u_id, callback) {
        con.query(`SELECT friendship.accepted as accepted, user.name,user.id,user.profile,user.bio 
        FROM friendship
        INNER JOIN user ON friendship.user_id = user.id                   
        WHERE friendship.friend_id = '${u_id}'`, callback)
    }

    static sendFriendRequest(id, friend_id, callback) {
        con.query(`INSERT INTO  friendship(user_id, friend_id) values('${id}', '${friend_id}') `, callback)
    }

    static cancelFriendRequest(id, friend_id, callback) {
        con.query(`DELETE FROM  friendship WHERE user_id = '${id}' and friend_id = '${friend_id}' `, callback)
    }

    static acceptFriendRequest(id, friend_id, callback) {
        con.query(`UPDATE  friendship SET accepted = true  WHERE user_id = '${id}' and friend_id = '${friend_id}' `, callback)
    }

    static getFriends(u_id, callback) {
        con.query(`SELECT  user.name, user.id, user.profile, user.bio 
        FROM friendship
        INNER JOIN user ON friendship.user_id = user.id                   
        WHERE friendship.user_id = '${u_id}'`, callback)
    }

    static updateField(field, newValue, id, callback) {
        con.query(`UPDATE user SET ${field} = '${newValue}' WHERE id = '${id}'`, callback)
    }


}

