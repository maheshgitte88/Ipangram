const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department' 
  },
  role: {
    type: String,
    enum: ['employee', 'manager'],
    default: 'employee'
  }
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
