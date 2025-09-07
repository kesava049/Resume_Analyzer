const express = require("express");
const multer = require("multer");
const controller = require("./resume.controller");

const router = express.Router();
const upload = multer({ dest: "uploads/", limits: { fileSize: 10 * 1024 * 1024 } });

// Defines the POST endpoint for uploading a resume
// It uses multer middleware first, then calls the controller function.
router.post("/upload", upload.single("resume"), controller.uploadAndAnalyze);

// Defines the GET endpoint for listing all resumes
router.get("/", controller.listAllResumes);

module.exports = router;