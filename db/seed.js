const mongoose = require('./connection');

const User = require('../models/user');
//const jobseeds = require('./seeds.json');

const fakeJob = {
	title: 'Fake Job',
	url: 'https://fakejob.com',
	company: {
		name: 'Fake INC',
	},
	skills: ['CSS', 'React', 'Express'],
	contacts: [
		{
			name: 'Bob',
			email: 'bob@fakeinc.com',
		},
		{
			name: 'Linda',
			email: 'linda@fakeinc.com',
		},
	],
};

User.deleteMany({})
	.then(() => {
		return User.create({
			name: 'Fake Name',
			username: 'fakeuser',
			email: 'fakeuser@yahoo.com',
		});
	})
	.then((user) => {
		user.jobs.push(fakeJob);
		return user.save();
	})
	.then(console.log)
	.catch(console.error)
	.finally(() => {
		process.exit();
	});
