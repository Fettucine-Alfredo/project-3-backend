# Trakr

## Description

This is the backend for [Trakr](https://github.com/Fettucine-Alfredo/trakr) which is a Full Stack (MERN) application to facilitate the tracking of jobs during the job search process. It is an Express API deployed to Heroku providing CRUD functionality to the front app to create new users, and add/edit/delete jobs.

## Technologies
   - Express
   - Node
   - MongoDB
   - Mongoose
  
## Models

### User Model
```js
	{
		name: { type: String, required: true },
		username: { type: String, unique: true, required: true },
		email: { type: String, required: true },
		jobs: [jobSchema],
	}
```

### Job (Subdocument of User)
```js
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
		contacts: {
			name: String,
			email: String,
			phone: String,
		},
	}
```
## API Endpoints
    - GET: api/user/:username
    - GET: api/user/:username/jobs/:id
    - POST: api/user/:username/jobs
    - PATCH: api/user/:username/jobs/:id
    - DELETE: api/user/:username/jobs/:id
