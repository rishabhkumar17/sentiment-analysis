const router = require("express").Router();

const getSentimentAnalysis = require("../controllers/sentimentAnalysis.controller");

router.post("/", getSentimentAnalysis);

module.exports = router;
