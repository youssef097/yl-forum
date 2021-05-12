const uuid = require("uuid")
const con= require("../db");

module.exports =  class Message{
    constructor(text,sender, receiver, roomId=null, ){
        this.text = text;
        this.sender = sender;
        this.receiver = receiver;
        this.roomId = roomId;
    }


    save(){
        con.query(`INSERT INTO message (id, sender, receiver, room_id, text_content) 
        VALUES ('${uuid.v4()}','${this.sender}','${this.receiver}','${this.roomId}','${this.text}') `,(err)=>{
            if(err){
                console.log(err);
            }// console.log(err);
        })
    }
}