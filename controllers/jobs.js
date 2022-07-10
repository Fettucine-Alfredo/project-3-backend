const express = require('express');
const router = express.Router();
const User = require('../models/user');

// GET (index) /api/user/:username/
// Gets User data including list of all jobs
router.get('/:username', (req, res, next) => {
	User.findOne({ username: req.params.username })
		.populate('jobs')
		.then((user) => res.json(user))
		.catch(next);
});

// GET (show) /api/user/:username/jobs/:id
// Show individual job by ID
router.get('/:username/jobs/:id', async (req, res, next) => {
	try {
		const user = await User.findOne({
			username: req.params.username,
			'jobs.__id': req.params.id,
		});
		const job = user.jobs.id(req.params.id);
		return res.json(job);
	} catch (error) {
		return next();
	}
});

// POST (create) /api/user/:username/jobs/
router.post('/:username/jobs', (req, res, next) => {
	User.findOne({ username: req.params.username })
		.then((user) => {
			user.jobs.push(req.body);
			return user.save();
		})
		.then((user) => res.status(201).json(user))
		.catch(next);
});

// PATCH (update) /api/user/:username/jobs/id
router.patch('/:username:/jobs/:id', async (req, res, next) => {
	try {
		// find the document being requested
		const user = await User.findOne({ username: req.params.username });
		const job = await user.jobs.id(req.params.id);
		job.set(req.body);
		const upDatedJob = job.save();
		return res.json(upDatedJob);
	} catch (error) {
		next(error);
	}
});

// DELETE (delete) /api/user/:username/jobs/:id
router.delete('/:username/jobs/:id', (req, res, next) => {
	User.findOne({ username: req.params.username })
		.then((user) => {
			user.jobs.id(req.params.id).remove();
			return user.save();
		})
		.then(() => res.sendStatus(204))
		.catch(next);
});

module.exports = router;
