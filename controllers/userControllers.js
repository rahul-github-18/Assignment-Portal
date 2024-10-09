const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// User registration
exports.register = async (req, res) => {
    const { username, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ username, password: hashedPassword });
        res.status(201).json({ message: "User registered", user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// User login
exports.login = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
};

// Upload assignment
exports.uploadAssignment = async (req, res) => {
    const { task, adminId } = req.body;
    try {
        const assignment = await Assignment.create({ userId: req.user.id, task, admin: adminId });
        res.status(201).json(assignment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
