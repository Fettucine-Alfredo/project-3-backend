const express = require('express');
const router = express.Router();
const Job = require('../models/job');

// GET (index) /api/job/
router.get('/', (req, res, next) => {
	Job.find()
		.then((job) => res.json(job))
		.catch(next);
});

// GET (show) /api/jobs/:id
router.get('/:id', async (req, res, next) => {
	try {
		const job = await Job.findById(req.params.id);
		return res.json(job);
	} catch (error) {
		return next();
	}
});

// POST (create) /api/jobs/
router.post('/', (req, res, next) => {
	Job.create(req.body)
		.then((job) => res.status(201).json(job))
		.catch(next);
});

// PUT (update) /api/jobs/id
router.put('/:id', async (req, res, next) => {
	try {
		// find the document being requested
		const job = await Job.findById(req.params.id);
		Book.findOneAndUpdate({ _id: req.params.id }, req.body, {
			new: true,
		})
			.then((job) => res.json(job))
			.catch(next);
	} catch (error) {
		next(error);
	}
});

// DELETE (delete) /api/jobs/:id
router.delete('/:id', (req, res, next) => {
	Job.findOneAndDelete({
		_id: req.params.id,
	})
		.then(() => res.sendStatus(204))
		.catch(next);
});

module.exports = router;
