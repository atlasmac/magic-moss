# magic-moss
A full stack app made for river surfers to see current river conditions and upcoming river level predictions.

## How It's Made:

### Tech used:
**Chart.js HTML, CSS, JavaScript, React, Node, Express, TailwindCSS, Cloudinary, Axios, Heroku Scheduler**

### Front-End
The front end was built with React and tailwind. Graphs to display river data were built with Chart.js, a js library for data visualization. The React authentication method revolves around the RequireAuth and useAuth components.

### Back-End
The backend follows MVC principals and was built using Node, Express, Mongoose and MongoDB. Passport-local, Express session and Bcrypt were used for authentication. Cloudinary is used to store and upload photos, a cloudiary reference string is stored on MongoDB

### Deployment 
The site is deployed on Heroku. The Heroku cron scheduler is used to run a script that fetches NOAA river data, parses it to JSON and updates the DB with the most recent river data.

## Optimizations
This is a long term project with many future optimizations planned.
- I would like to update my authentication strategy to include google and facebook auth strategies.
- I want to add more functionality to updating user info, specifically usernames, passwords and user info.
- I would like to add user photo uploads for each wave. This will allow users to share their photos of the wave with others in the local river surfing community.

## Visit the site at:
[Magic Moss](https://safe-castle-40765.herokuapp.com/).
