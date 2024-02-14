const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
  subject_name: {
    type: String,
    required: true,
  },
  subject_code: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  }
});

const Subject = mongoose.model('Subject', subjectSchema);

module.exports = Subject;