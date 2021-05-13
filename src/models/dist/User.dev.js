"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var con = require("../db");

var uuid = require("uuid");

var moment = require("moment");

var userFields = "(SELECT count(*) FROM follows WHERE follows.followed_id = user.id ) AS  followers,\n(SELECT count(*) FROM follows WHERE follows.user_id = user.id ) AS  follows,\n(SELECT count(*) FROM post WHERE post.user_id = user.id ) AS  posts  ";

module.exports =
/*#__PURE__*/
function () {
  function User(name, email, pass) {
    _classCallCheck(this, User);

    this.id = uuid.v1();
    this.name = name;
    this.email = email;
    this.pass = pass;
    this.date = moment().format("YYYY-MM-DD");
  }

  _createClass(User, [{
    key: "save",
    value: function save(callback) {
      con.query("INSERT INTO  user (id,name,email,pass,date) \n                   values ('".concat(this.id, "','").concat(this.name, "','").concat(this.email, "','").concat(this.pass, "','").concat(this.date, "')"), callback);
    }
  }], [{
    key: "getUserById",
    value: function getUserById(id, my_id, callback) {
      con.query("SELECT user.*, ".concat(userFields, " \n        ").concat(!my_id ? "" : ",(SELECT count(*)>0 FROM friendship where user_id = '".concat(id, "' and  friend_id = '").concat(my_id, "' and accepted = 1) as isFriend, \n        (SELECT count(*)>0 FROM follows where user_id = '").concat(my_id, "' and  followed_id = '").concat(id, "') as isFollowed"), " \n        from user            \n        where user.id = '").concat(id, "'   "), callback);
    } // Get users that you follow

  }, {
    key: "getFollows",
    value: function getFollows(id, callback) {
      con.query("SELECT user.name,user.id,user.profile,user.bio \n                   FROM follows\n                   INNER JOIN user ON follows.followed_id = user.id                   \n                   WHERE follows.user_id = '".concat(id, "'"), callback);
    }
  }, {
    key: "isFollowed",
    value: function isFollowed(id, f_id, callback) {
      con.query("SELECT * FROM follows where user_id = '".concat(id, "' and  followed_id = '").concat(f_id, "'; "), callback);
    }
  }, {
    key: "isFriend",
    value: function isFriend(id, f_id, callback) {
      con.query("SELECT * FROM friendship where user_id = '".concat(id, "' and  friend_id = '").concat(f_id, "' and accepted = 'true'; "), callback);
    }
  }, {
    key: "getUserByField",
    value: function getUserByField(field, value, callback) {
      con.query("SELECT * FROM user where ".concat(field, " = '").concat(value, "'"), callback);
    } // To follow a user

  }, {
    key: "follow",
    value: function follow(id, f_id, callback) {
      con.query("INSERT INTO follows values ('".concat(id, "','").concat(f_id, "');"), callback);
    }
  }, {
    key: "updateProfile",
    value: function updateProfile(avatar, bio, banner, uid, cb) {
      var sql = "";

      if (avatar) {
        sql += "UPDATE user SET profile = '".concat(avatar, "' where id = '").concat(uid, "';");
      }

      if (bio) {
        sql += "UPDATE user SET bio = '".concat(bio, "' where id = '").concat(uid, "';");
      }

      if (banner) {
        sql += "UPDATE user SET banner = '".concat(banner, "' where id = '").concat(uid, "';");
      }

      console.log(sql);
      con.query(sql, cb);
    }
  }, {
    key: "unfollow",
    value: function unfollow(id, f_id, callback) {
      con.query("DELETE  FROM follows WHERE user_id = '".concat(id, "' and followed_id = '").concat(f_id, "';"), callback);
    }
  }, {
    key: "getAllUsers",
    value: function getAllUsers(my_id, callback) {
      var sql = "SELECT user.*, ".concat(userFields, " ").concat(!my_id ? "" : ",(SELECT count(*)>0 FROM friendship where friend_id = '".concat(my_id, "' and  user_id = user.id or user.id = '").concat(my_id, "' and  friend_id = user.id) as isFriend, \n        (SELECT count(*)>0 FROM follows where user_id = '").concat(my_id, "' and  followed_id = user.id) as isFollowed"), " from user");
      con.query(sql, callback);
    }
  }, {
    key: "suggestedFriends",
    value: function suggestedFriends(u_id, callback) {
      con.query("SELECT  user.name, user.id, user.profile, user.bio  FROM user", callback);
    }
  }, {
    key: "getSentFriendRequests",
    value: function getSentFriendRequests(u_id, callback) {
      con.query("SELECT friendship.accepted as accepted, user.name,user.id,user.profile,user.bio \n        FROM friendship\n        INNER JOIN user ON friendship.user_id = user.id                   \n        WHERE friendship.user_id = '".concat(u_id, "'"), callback);
    }
  }, {
    key: "getReceivedFriendRequests",
    value: function getReceivedFriendRequests(u_id, callback) {
      con.query("SELECT friendship.accepted as accepted, user.name,user.id,user.profile,user.bio \n        FROM friendship\n        INNER JOIN user ON friendship.user_id = user.id                   \n        WHERE friendship.friend_id = '".concat(u_id, "'"), callback);
    }
  }, {
    key: "sendFriendRequest",
    value: function sendFriendRequest(id, friend_id, callback) {
      con.query("INSERT INTO  friendship(user_id, friend_id) values('".concat(id, "', '").concat(friend_id, "') "), callback);
    }
  }, {
    key: "cancelFriendRequest",
    value: function cancelFriendRequest(id, friend_id, callback) {
      con.query("DELETE FROM  friendship WHERE user_id = '".concat(id, "' and friend_id = '").concat(friend_id, "' "), callback);
    }
  }, {
    key: "acceptFriendRequest",
    value: function acceptFriendRequest(id, friend_id, callback) {
      con.query("INSERT INTO  friendship(user_id, friend_id) values('".concat(friend_id, "', '").concat(id, "'); \n        UPDATE  friendship SET accepted = 1  WHERE user_id = '").concat(id, "' and friend_id = '").concat(friend_id, "';\n        UPDATE  friendship SET accepted = 1  WHERE user_id = '").concat(friend_id, "' and friend_id = '").concat(id, "' "), callback);
    }
  }, {
    key: "declineFriendRequest",
    value: function declineFriendRequest(id, friend_id, callback) {
      con.query("UPDATE  friendship SET accepted = 2  WHERE user_id = '".concat(id, "' and friend_id = '").concat(friend_id, "';\n        UPDATE  friendship SET accepted = 2  WHERE user_id = '").concat(friend_id, "' and friend_id = '").concat(id, "'; "), callback);
    }
  }, {
    key: "getFriends",
    value: function getFriends(u_id, callback) {
      con.query("SELECT  user.name, user.id, user.profile, user.bio \n        FROM friendship inner join user   on user.id = friendship.friend_id     \n        WHERE friendship.user_id = '".concat(u_id, "' and accepted = '1' "), callback);
    }
  }, {
    key: "updateField",
    value: function updateField(field, newValue, id, callback) {
      con.query("UPDATE user SET ".concat(field, " = '").concat(newValue, "' WHERE id = '").concat(id, "'"), callback);
    }
  }]);

  return User;
}();