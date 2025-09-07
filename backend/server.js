const express = require("express");
const cors = require('cors');

// 1. Import your new router
const resumeRoutes = require('./api/resumes/resume.router');

const app = express();
app.use(cors());
app.use(express.json());

// 2. Mount the router
// Tell Express that any request to "/api/resume" should be handled by resumeRoutes
app.use('/api/resume', resumeRoutes);

app.listen(4000, () => console.log("Server listening on :4000"));






