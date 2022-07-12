const mongoose = require('./connection');

const User = require('../models/user');
const jobseed = require('./jobs.json');

User.deleteMany({})
	.then(() => {
		return User.create({
			name: 'Fake Name',
			username: 'fakeuser',
			email: 'fakeuser@yahoo.com',
		});
	})
	.then((user) => {
		user.jobs.push(jobseed[0]);
		return user.save();
	})
	.then((user) => {
		user.jobs.push(jobseed[1]);
		return user.save();
	})
	.then((user) => {
		user.jobs.push(jobseed[2]);
		return user.save();
	})
	.then((user) => {
		user.jobs.push(jobseed[3]);
		return user.save();
	})
	.then(console.log)
	.catch(console.error)
	.finally(() => {
		process.exit();
	});
