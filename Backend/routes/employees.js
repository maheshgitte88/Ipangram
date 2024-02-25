const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');
const { auth, managerAuth } = require('../middleware/auth');

// GET all employees
router.get('/', auth, employeeController.getAllEmployees);

// GET a specific employee by ID
router.get('/:id', employeeController.getEmployeeById);

// CREATE a new employee 

// UPDATE an existing employee (only managers)
router.put('/:id', managerAuth, employeeController.updateEmployee);

// DELETE an employee (only managers)
router.delete('/:id', managerAuth, employeeController.deleteEmployee);

// employees sorted by location
router.get('/filter/location', employeeController.filterByLocation);

//  employees sorted by name
router.get('/filter/name/:order(ascending|descending)', employeeController.filterByName);


module.exports = router;
