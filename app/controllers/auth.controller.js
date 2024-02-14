const config = require("../config/auth.config");
const db = require("../models");
const User = require("../models/user.model");
const Role = require("../models/role.model")

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
console.log("req.body.role--------", req.body.role);
let role_name = req.body.role == undefined ? 'admin' : 'user'
  
    console.log("dddddddddd");
    Role.findOne({ name: role_name }, (err, role) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }else{
        console.log("role", role)
        req.body.role = role._id;

        const user = new User({
          username: req.body.username,
          email: req.body.email,
          password: bcrypt.hashSync(req.body.password, 8),
          role : role._id
        });
      
        user.save((err, user) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
          res.send({ message: "User was registered successfully!" });
        });
      }
      
    })
  }


exports.signin = (req, res) => {

  try {
    User.findOne({
      username: req.body.username,
    })
      .populate("role", "-__v")
      .exec((err, user) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
  
        if (!user) {
          return res.status(404).send({ message: "User Not found." });
        }
  
        var passwordIsValid = bcrypt.compareSync(
          req.body.password,
          user.password
        );
  
        if (!passwordIsValid) {
          return res.status(401).send({ message: "Invalid Password!" });
        }
  
        const token = jwt.sign({ id: user.id },
                                config.secret,
                                {
                                  algorithm: 'HS256',
                                  allowInsecureKeySizes: true,
                                  expiresIn: 86400, // 24 hours
                                });
  
       req.session.token = token;

       console.log("user", user)
  
        res.status(200).send({
          id: user._id,
          username: user.username,
          email: user.email,
          role: user?.role?.name,
        });
      });  
  } catch (error) {
    console.log(error)
  }

  
};

exports.signout = async (req, res) => {
  try {
    req.session = null;
    return res.status(200).send({ message: "You've been signed out!" });
  } catch (err) {
    this.next(err);
  }
};
