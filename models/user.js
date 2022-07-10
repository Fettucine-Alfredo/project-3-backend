const mongoose = require('../db/connection');

//import Job Schema
const jobSchema = require('./job');

const userSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		username: { type: String, unique: true, required: true },
		email: { type: String, required: true },
		jobs: [jobSchema],
	},
	{
		timestamps: true,
	}
);

const User = mongoose.model('User', userSchema);

module.exports = User;
