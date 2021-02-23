const User = require("../models/User");
const userController  = {
    getAllUsers: (req,res)=>{
        User.createTable();
        res.json(User.get)
    }
}
module.exports = userController;