const Job = require('../models/Job');

exports.createJob = async (req, res) => {
  try {
    const job = new Job({
      ...req.body,
      clientId: req.user.id
    });
    
    await job.save();
    res.status(201).json({ success: true, data: job });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error creando trabajo' });
  }
};

exports.getJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ status: 'open' })
      .populate('clientId', 'name')
      .sort({ createdAt: -1 });
    
    res.json({ success: true, data: jobs });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error obteniendo trabajos' });
  }
};