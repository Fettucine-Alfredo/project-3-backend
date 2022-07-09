const mongoose = require('../db/connection');

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
	},
	{ timestamps: true }
);

module.exports = jobSchema;
