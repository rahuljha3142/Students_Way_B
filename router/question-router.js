const express = require("express");
const router = express.Router();
const { generateQuestions } = require("../controllers/question-controller");

router.post("/generate", generateQuestions);

module.exports = router;
