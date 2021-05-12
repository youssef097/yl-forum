const User = require("../models/User");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken")

dotenv.config();

const userController = {
    getAllUsers: (req, res) => {
        let myId = req.user? req.user.id : null; 

        User.getAllUsers(myId, (err, users) => {
            // Una vez tengo los 
            if(err){
                console.log(err);

            }else{
                        
                // users.map((u, i) => {
                //     User.isFollowed(req.user.id, u.id, (err, isFwd) => {
                //         u.pass = undefined;
                //         if (err || !isFwd.length) {
                //             u.isFollowed = false
                //         } else {
                //             u.isFollowed = true
                //         }
                //         if (i == users.length - 1) {
                //         }
                //     })
                // })
                // console.log(users);
                // console.log(users);
                // users.map((e)=>{

                //     console.log("is followed", e.isFollowed);
                //     console.log("is Friend", e.isFriend);
                // })
                // let notification = new Notification(req.user.id "")
                res.status(200).json({ users: users })
            }
        })
    },
    acceptFriendRequest:(req,res)=>{
        User.acceptFriendRequest (req.params.id, req.user.id,  (error, result) => {
            if (error) return res.status(500).json({ ERROR: error.code, message: error.sqlMessage })
            // console.log(result);
            // console.log("From", req.user.id, "to", req.params.id );
            res.status(200).json({ "SUCCESS": "Friend requestAccepted" })
        })
    },

    cancelFriendRequest:(req,res)=>{
        User.cancelFriendRequest(req.user.id,req.params.id,(err,result)=>{
            if(!err){
                console.log(err);
                res.status(500).json({ "ERR": "Friend requestAccepted" })

            }else{
                res.status(200).json({ "SUCCESS": "Friend requestAccepted" })
            }
        })
    },
    declineFriendRequest:(req,res)=>{
        User.declineFriendRequest(req.user.id,req.params.id,(err,result)=>{
            if(err){
                console.log(err);
                res.status(500).json({ "ERR": "Friend request not  declined" })

            }else{                
                res.status(200).json({ "SUCCESS": "Friend request declined" })
            }
        })
    },

    getFriends: (req, res) => {
        let { id } = req.user
        User.getFriends(id, (error, result) => {
            if (error) return res.status(500).json({ ERROR: error.code, message: error.sqlMessage })
            res.status(200).json({ users: result })
        })
    },
    getFollows: (req, res) => {
        let { id } = req.user
        User.getFollows(id, (error, result) => {
            if (error) return res.status(500).json({ ERROR: error.code, message: error.sqlMessage })

            res.status(200).json({ users: result })
        })
    },
    getUser: (req, res) => {
        console.log("llamado");
        let { id } = req.params;
        let myId = req.user? req.user.id : null; 
        User.getUserById(id,  myId, (err, result) => {
            let u = result[0]
            if (err || !result[0]) {
                console.log(err);
                res.status(404).json({ ERROR: "Could not find user with ID " + id })
            } else {
                // result[0].pass = undefined;
                // if(!req.user){
                //     console.log("paso 2");
                //     res.status(200).json({ user: u })
                // }else{
                //     console.log("paso 3");
                //     User.isFollowed(req.user.id, id, (err, isFwd) => {
                //         // u.pass = undefined;
                //         console.log(err);
                //         if (err || !isFwd.length) {
                //             u.isFollowed = false
                //         } else {
                //             u.isFollowed = true
                //         }
                //         console.log(u);
                //         res.status(200).json({ user: u })
                //     })
                // }
                // console.log("paso 232");
                if (result[0]) {
                    res.status(200).json({ user: result[0] })
                }
            }
        })
    },
    register: (req, res) => {
        if (!req.body || !req.body.email || !req.body.name || !req.body.password)
            return res.status(400).send({ ERROR: "INCOMPLETE_USER_DATA" });

        const { name, password, email } = req.body;

        try {
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(password, salt, (err, hash) => {
                    const newUser = new User(name, email, hash);
                    newUser.save((error) => {
                        if (!error) {
                            res.status(200).json({ SUCCESS: "User registered correctly" })
                        } else {
                            res.status(500).json({ ERROR: error.code, message: error.sqlMessage })
                        }
                    });
                })

            })
        } catch (error) {
            res.status(500).json({ ERROR: error })
        }

    },
    login: (req, res) => {
        console.log("Hellooo");
        // console.log(req.body);
        if (!req.body || !req.body.email || !req.body.pass)
            return res.status(401).json({ ERROR: "SOME FIELDS ARE REQUIRED" })

        User.getUserByField("email", req.body.email, (err, result) => {
            if (err) return res.status(404).json({ ERROR: err.sqlMessage })
            if (result[0]) {
                let user = result[0];
                // console.log(user);
                bcrypt.compare(req.body.pass, user.pass).then((val) => {
                    // console.log(val);
                    if (val) {
                        user.pass = undefined;
                        user = JSON.stringify(user)
                        let token = jwt.sign(user, process.env.JWT_SECRET)
                        res.status(200).json({ token })
                    } else {
                        res.status(404).send("WRONG_PASSWORD")
                    }
                }).catch((ERR) => {
                    console.log(ERR);
                    res.status(404).send("WRONG_PASSWORD")
                })
            } else {
                res.status(404).send("USER_DOES_NOT_EXIST")
            }


        })


    },
    follow: (req, res) => {
        const from = req.user.id;
        const to = req.params.id;
        if (!from || !to || from == to) return res.status(500).json({ ERROR: "Couldnt follow" })


        User.follow(from, to, (error, result) => {
            if (error) {
                res.status(500).json({ ERROR: error.code, message: error.sqlMessage })
            } else {
                res.status(200).json({ SUCCESS: "You followed " + to + " successfully" })
            }
        })
    },

    sendFriendRequest: (req, res) => {
        const from = req.user.id;
        const to = req.params.id;
        if (!from || !to || from == to) return res.status(500).json({ ERROR: "Couldnt add friend " })


        User.sendFriendRequest(from, to, (error, result) => {
            if (error) {
                res.status(500).json({ ERROR: error.code, message: error.sqlMessage })
            } else {
                res.status(200).json({ SUCCESS: "You added friend  " + to + " successfully" })
            }
        })
    },
    
    unfollow: (req, res) => {
        User.unfollow(req.user.id, req.params.id, (err, resul) => {
            if (err) {
                res.status(500).json({ ERROR: err.code, message: err.sqlMessage })
            } else {
                res.status(200).json({ SUCCESS: "Unofollow " + req.params.id + " successfully" })
            }
        })
    },

    updateProfile: (req, res) => {
        let newProfile = "myNewProfile.png"
        User.updateField("profile", newProfile, "153d46c0-7792-11eb-b0dc-35181c452216", (error, result) => {
            if (error) {
                res.status(500).json({ ERROR: error.code, message: error.sqlMessage })
            } else {
                res.status(200).json({ SUCCESS: "Updated profile image succesfully" })

            }
        })
    },
    updateBanner: (req, res) => {
        let newBanner = "myNewBanner.png"
        User.updateField("banner", newBanner, "153d46c0-7792-11eb-b0dc-35181c452216", (error, result) => {
            if (error) {
                res.status(500).json({ ERROR: error.code, message: error.sqlMessage })
            } else {
                res.status(200).json({ SUCCESS: "Updated Pro image succesfully" })

            }
        })
    },
    updateBio: (req, res) => {
        let newBio = "Im from callosica del segura"
        User.updateField("bio", newBio, "153d46c0-7792-11eb-b0dc-35181c452216", (error, result) => {
            if (error) {
                res.status(500).json({ ERROR: error.code, message: error.sqlMessage })
            } else {
                res.status(200).json({ SUCCESS: "Updated Bio succesfully" })
            }
        })
    },
    updateUbication: (req, res) => {
        let newUbication = "Australia"
        User.updateField("ubication", newUbication, "153d46c0-7792-11eb-b0dc-35181c452216", (error, result) => {
            if (error) {
                res.status(500).json({ ERROR: error.code, message: error.sqlMessage })
            } else {
                res.status(200).json({ SUCCESS: "Updated ubication succesfully" })
            }
        })
    },
    getReceivedFriendRequests:(req,res)=>{
        User.getReceivedFriendRequests(req.user.id,(err,requests)=>{
            if (err) {
                res.status(500).json({ ERROR: err.code, message: err.sqlMessage })
            } else {
                console.log(requests);
                res.status(200).json({ requests })
            }
        })
    },

    getSentFriendRequests:(req,res)=>{
        User.getSentFriendRequests(req.user.id,(err,requests)=>{
            if (err) {
                res.status(500).json({ ERROR: err.code, message: err.sqlMessage })
            } else {
                console.log(requests);
                res.status(200).json({ requests })
            }
        })
    }
}
module.exports = userController;