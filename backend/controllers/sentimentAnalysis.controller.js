const getPrediction = require("../services/tensorflow.service");

const getSentimentAnalysis = async (req, res) => {
  const { text } = req.body;
  const prediction = await getPrediction(text);
  res.json(prediction);
};

module.exports = getSentimentAnalysis;
