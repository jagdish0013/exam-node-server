var Exam = require("../models/exam.model");


exports.add = async (req, res) => {

  
    try {
      const newExam = new Exam({
        exam_name: req.body.exam_name,
        description: req.body.description,
        dateTime : req.body.dateTime,
        users : req.body.users,
        subject : req.body.subject,
        type : req.body.type,
      });
  
      const savedExam = await newExam.save();
      res.status(201).json({ success : true, message: 'added successfully', exam: savedExam });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  

  
};


exports.list = async (req, res) => {
  Exam
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
  Exam
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

  Exam
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

  const totalRecords = await Exam.countDocuments();
  res.status(200).json({ count: totalRecords });
};

exports.deleteData = async (req, res) => {

  console.log("delete calll")

  Exam
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
  console.log("req.body.search")
  Exam
    .find({ exam_name: req.body.search })
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