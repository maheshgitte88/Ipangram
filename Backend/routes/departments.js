const express = require('express');
const router = express.Router();
const departmentController = require('../controllers/departmentController');
const { auth, managerAuth } = require('../middleware/auth');

// Create department route
router.post('/', managerAuth, departmentController.createDepartment);

// Read all departments route
router.get('/', departmentController.getAllDepartments);

// Update department route
router.put('/:id', managerAuth, departmentController.updateDepartment);

// Delete department route
router.delete('/:id', managerAuth, departmentController.deleteDepartment);

module.exports = router;
