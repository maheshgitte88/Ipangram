const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const Users = require('../models/Employee');

dotenv.config();

const auth = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const employee = await Users.findById(decoded.userId).select('-password');
        if (!employee) {
            throw new Error();
        }
        req.employee = employee;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

const managerAuth = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const employee = await Users.findById(decoded.userId).select('-password');
        if (!employee) {
            throw new Error();
        }
        
        // Check if the user role is 'manager'
        if (employee.role !== 'manager') {
            return res.status(403).json({ message: 'Access forbidden, requires manager role' });
        }

        req.employee = employee;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = { auth, managerAuth };
