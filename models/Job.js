const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  budget: {
    minimum: { type: Number, required: true },
    maximum: { type: Number, required: true }
  },
  location: {
    address: { type: String, required: true },
    city: { type: String, required: true }
  },
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['open', 'in_progress', 'completed'], default: 'open' }
}, { timestamps: true });

module.exports = mongoose.model('Job', jobSchema);