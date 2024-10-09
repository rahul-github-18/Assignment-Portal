const User = require('../models/User');
const Assignment = require('../models/Assignment');

// Admin registration
exports.register = async (req, res) => {
    // Similar to user registration but setting role to 'admin'
};

// Admin login
exports.login = async (req, res) => {
    // Similar to user login
};

// Get assignments for admin
exports.getAssignments = async (req, res) => {
    const assignments = await Assignment.find({ admin: req.user.id });
    res.json(assignments);
};

// Accept assignment
exports.acceptAssignment = async (req, res) => {
    const { id } = req.params;
    const assignment = await Assignment.findByIdAndUpdate(id, { status: 'accepted' }, { new: true });
    res.json(assignment);
};

// Reject assignment
exports.rejectAssignment = async (req, res) => {
    const { id } = req.params;
    const assignment = await Assignment.findByIdAndUpdate(id, { status: 'rejected' }, { new: true });
    res.json(assignment);
};
