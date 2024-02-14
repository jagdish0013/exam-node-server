var Subject = require("../models/subject.model");
var Role = require("../models/role.model");
var User = require("../models/user.model");

exports.add = async (req, res) => {


   try {
      const newSubject = new Subject({
        subject_name: req.body.subject_name,
        subject_code: req.body.subject_code,
        description: req.body.description,
      });
  
      const savedSubject = await newSubject.save();
      res.status(201).json({ success : true, message: 'Subject added successfully', subject: savedSubject });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  

  
};


exports.list = async (req, res) => {
  Subject
        .find()
        .then(saved => {
            let content = {
                data: saved,
                success: true,
                message: 'Record get successfully.'
            };
            return res.send(content);
        })
        .catch(error => {
            let content = {
                data: error,
                success: false,
                message: 'Error while get record'
            };
            return res.send(content);
        })
};

exports.fatchOne = async (req, res) => {

  console.log("call", req.params.id)
  Subject
  .findById(req.params.id)
  .then(saved => {
      let content = {
          data: saved,
          success: true,
          message: 'Record Found successfully.'
      };
      return res.send(content);
  })
  .catch(error => {
      let content = {
          data: error,
          success: false,
          message: 'Error while Find record'
      };
      return res.send(content);
  })
};

exports.update = async (req, res) => {

  Subject
    .findByIdAndUpdate(req.body.id, req.body)
    .then(saved => {
        let content = {
            data: saved,
            success: true,
            message: 'Record update successfully.'
        };
        return res.send(content);
    })
    .catch(error => {
        let content = {
            data: error,
            success: false,
            message: 'Error while Find record'
        };
        return res.send(content);
    })
};

exports.count = async (req, res) => {

    const totalRecords = await Subject.countDocuments();
    let RoleId = await Role.findOne({name : 'user'});
    const totalUserRecords = await User.countDocuments({role : RoleId._id});
  res.status(200).json({ count: totalRecords, usercount: totalUserRecords });
};

exports.deleteData = async (req, res) => {

  console.log("delete calll")

  Subject
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

exports.search = async (req, res) => {
  Subject
    .find({ subject_name: req.body.search })
    .then(saved => {
        let content = {
            data: saved,
            success: true,
            message: 'successfully.'
        };
        return res.send(content);
    })
    .catch(error => {
        let content = {
            data: error,
            success: false,
            message: 'Error while record'
        };
        return res.send(content);
    })
}