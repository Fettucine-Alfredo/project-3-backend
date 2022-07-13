const express = require('express');
const router = express.Router();
const User = require('../models/user');
const {
	handleRecordExists,
	handleValidateOwnership,
} = require('../middleware/custom_errors');

// GET (index) /api/user/:username/
// Gets User data including list of all jobs
router.get('/:username', (req, res, next) => {
	User.findOne({ username: req.params.username })
		.populate('jobs')
		.then((user) => {
			if (handleRecordExists(user)) {
				res.json(user);
			}
		})
		.catch(next);
});

// POST /api/user/
// Create a new user
router.post('/', async (req, res, next) => {
	try {
		const user = await User.create(req.body);
		if (user) {
			return res.json(user);
		} else {
			return res.sendStatus(400);
		}
	} catch (error) {
		next(error);
	}
});

// GET (show) /api/user/:username/jobs/:id
// Show individual job by ID
router.get('/:username/jobs/:id', async (req, res, next) => {
	try {
		const user = await User.findOne({ username: req.params.username });
		if (handleRecordExists(user)) {
			const job = user.jobs.id(req.params.id);
			if (handleRecordExists(job)) {
				return res.json(job);
			}
		}
	} catch (error) {
		return next();
	}
});

// POST (create) /api/user/:username/jobs/
router.post('/:username/jobs', (req, res, next) => {
	User.findOne({ username: req.params.username })
		.then((user) => {
			if (handleRecordExists(user)) {
				user.jobs.push(req.body);
				return user.save();
			}
		})
		.then((user) => res.status(201).json(user))
		.catch(next);
});

// PATCH (update) /api/user/:username/jobs/id
router.patch('/:username/jobs/:id', (req, res, next) => {
	User.findOne({ username: req.params.username })
		.then((user) => {
			if (handleRecordExists(user)) {
				const job = user.jobs.id(req.params.id);
				if (handleRecordExists(job)) {
					job.set(req.body);
					return user.save();
				}
			}
		})
		.then((user) => res.json(user))
		.catch(next);
});

// DELETE (delete) /api/user/:username/jobs/:id
router.delete('/:username/jobs/:id', (req, res, next) => {
	User.findOne({ username: req.params.username })
		.then((user) => {
			if (handleRecordExists(user)) {
				user.jobs.id(req.params.id).remove();
				return user.save();
			}
		})
		.then(() => res.sendStatus(204))
		.catch(next);
});

module.exports = router;
