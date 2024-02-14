const mongoose = require('mongoose');

const examSchema = new mongoose.Schema({
  exam_name: {
    type: String,
    required: true,
  },
  dateTime : {
    type : Date
 },
 users : {
  type : Array
},
subject: 
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subject"
  },
  type: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  }
});

const Exam = mongoose.model('Exam', examSchema);

module.exports = Exam;