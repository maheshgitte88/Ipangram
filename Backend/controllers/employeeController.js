const Employee = require('../models/Employee');

// Controller methods
exports.getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.find().select('-password');
        res.json(employees);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getEmployeeById = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id).select('-password');
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.json(employee);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};



exports.updateEmployee = async (req, res) => {
    try {
        // Validate request body
        //   const { error } = employeeSchema.validate(req.body);
        //   if (error) {
        //     return res.status(400).json({ message: error.details[0].message });
        //   }

        const { department } = req.body; // Extract department ID from request body
        console.log(department)
        // Check if department ID is provided
        if (!department) {
            return res.status(400).json({ message: 'Department ID is required' });
        }

        // Update the employee's department
        const employee = await Employee.findByIdAndUpdate(req.params.id, { department }, { new: true });

        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        res.json(employee);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.deleteEmployee = async (req, res) => {
    try {
        const employee = await Employee.findByIdAndDelete(req.params.id);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.json({ message: 'Employee deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.filterByLocation = async (req, res) => {
    try {
        const employees = await Employee.find().sort({ location: 1 });
        res.json(employees);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

exports.filterByName = async (req, res) => {
    const { order } = req.params;

    try {
        let employees;

        if (order === 'ascending') {
            employees = await Employee.find().sort({ firstName: 1 });
        } else {
            employees = await Employee.find().sort({ firstName: -1 });
        }

        res.json(employees);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}
