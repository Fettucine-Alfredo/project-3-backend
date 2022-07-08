const mongoose = require('../db/connection');

// import User schema
const userSchema = require('./user');

const jobSchema = new mongoose.Schema(
	{
		title: { type: String, required: true },
		url: String,
		description: String,
		company: {
			name: { type: String, required: true },
			logo: String,
		},
		currentStep: String,
		skills: [String],
		contacts: [
			{
				name: { type: String, required: true },
				email: String,
				phone: String,
			},
		],
		owner: userSchema,
	},
	{ timestamps: true }
);

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
