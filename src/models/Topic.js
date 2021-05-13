const moment = require("moment");
const con = require("../db.js")
const uuid = require("uuid")

module.exports = class Topic {
    constructor(title, description, creator, banner, image) {
        this.id = uuid.v1();
        this.title = title;
        this.description = description;
        this.image = image;
        this.banner = banner;
        this.creator = creator
        this.date = moment().format("YYYY-MM-DD");
    }
    static findTopicsNameByUserId(id, callback) {
        con.query(`SELECT title,id from topic WHERE creator = '${id}' ; `, callback)
    }
    static isJoined(u_id, t_id, cb) {
        con.query(`SELECT * FROM subscription where user_id = '${u_id}' and topic_id = '${t_id}'`, cb)
    }

    static getSubscribedTopics(u_id, callback) {
        con.query(`
        SELECT title,id,image,subscribers from topic
        INNER JOIN subscription ON id = topic_id
        WHERE user_id = '${u_id}' ; `, callback)
    }

    static getAllTopics(callback) {
        con.query(`SELECT title,id,image,subscribers,banner from topic`, callback)
    }

    static getPopularTopics(callback) {
        con.query(`SELECT title,id,image,subscribers from topic LIMIT 5`, callback)
    }

    static findTopicById(id, callback) {
        con.query(`SELECT * from topic where id = '${id}'`, callback)
    }
    static join(u_id, id, callback) {
        con.query(`INSERT INTO subscription values ('${u_id}','${id}');
                UPDATE topic SET subscribers = subscribers+1 WHERE topic.id = '${id}'; `, callback)
    }

    static disjoin(u_id, id, callback) {
        con.query(`DELETE FROM subscription  WHERE user_id = '${u_id}' and topic_id = '${id}' ;
                UPDATE topic SET subscribers = subscribers - 1 WHERE topic.id = '${id}'; `, callback)
    }
    save(callback) {
        con.query(`INSERT INTO  topic values ('${this.id}','${this.title}','${this.description}','0','${this.date}','${this.image}','${this.banner}','${this.creator}')`, callback)
    }
}