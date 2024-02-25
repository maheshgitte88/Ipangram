const Department = require('../models/Department');

// Create a new department
exports.createDepartment = async (req, res) => {
  try {
    const { name } = req.body;
    const manager = req.employee._id; 

    const department = new Department({ name, manager });
    await department.save();

    res.status(201).json(department);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get all departments
exports.getAllDepartments = async (req, res) => {
  try {
    const departments = await Department.find().populate('manager', 'firstName lastName');
    res.json(departments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update a department
exports.updateDepartment = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;

    const department = await Department.findByIdAndUpdate(id, { name }, { new: true });

    if (!department) {
      return res.status(404).json({ message: 'Department not found' });
    }

    res.json(department);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete a department
exports.deleteDepartment = async (req, res) => {
  try {
    const { id } = req.params;

    const department = await Department.findByIdAndDelete(id);

    if (!department) {
      return res.status(404).json({ message: 'Department not found' });
    }

    res.json({ message: 'Department deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
