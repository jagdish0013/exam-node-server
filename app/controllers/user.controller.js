const config = require("../config/auth.config");
const db = require("../models");
const User = require("../models/user.model");
const Role = require("../models/role.model")

var bcrypt = require("bcryptjs");

exports.add = async (req, res) => {

  console.log("aaaaaaaaa");
let role_name = req.body.role == undefined ? 'admin' : 'user'
  
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
          res.send({success : true,  message: "Registered successfully!" });
        });
      }
      
    })
  }

  exports.list = async (req, res) => {
    let userRole = await Role.findOne({name : "user"})

    User
          .find({role : userRole._id})
          .then(saved => {

              let content = {
                  data: saved,
                  success: true,
                  message: 'Record get successfully.'
              };
              return res.send(content);
          })
          .catch(error => {

            console.log("error", error);

              let content = {
                  data: error,
                  success: false,
                  message: 'Error while get record'
              };
              return res.send(content);
          })
  };

  exports.deleteData = async (req, res) => {
  
    User
          .findByIdAndRemove(req.params.id)
          .then(saved => {
              let content = {
                  data: saved,
                  success: true,
                  message: 'Record Deleted successfully.'
              };
              return res.send(content);
          })
          .catch(error => {
              let content = {
                  data: error,
                  success: false,
                  message: 'Error while Delete record'
              };
              return res.send(content);
          })
  };
