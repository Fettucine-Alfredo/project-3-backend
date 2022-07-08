const mongoose = require('./connection');

const Job = require('../models/job');
const User = require('../models/User');
const jobseeds = require('./seeds.json');

Job.deleteMany({})
	.then(() => User.deleteMany({}))
	.then(() => {
		return User.create({ name: 'Fake Name', username: 'Fake Username' })
			.then((user) => jobseeds.map((job) => ({ ...job, user: user._id })))
			.then((jobs) => Job.insertMany(jobs));
	})
	.then(console.log)
	.catch(console.error)
	.finally(() => {
		process.exit();
	});
