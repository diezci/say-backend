const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

exports.register = async (req, res) => {
  try {
    const { name, email, password, userType } = req.body;
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Usuario ya existe' });
    }
    
    const user = new User({ name, email, password, userType });
    await user.save();
    
    const token = generateToken(user._id);
    
    res.status(201).json({
      success: true,
      token,
      user: { id: user._id, name: user.name, email: user.email, userType: user.userType }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error del servidor' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ success: false, message: 'Credenciales inválidas' });
    }
    
    const token = generateToken(user._id);
    
    res.json({
      success: true,
      token,
      user: { id: user._id, name: user.name, email: user.email, userType: user.userType }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error del servidor' });
  }
};