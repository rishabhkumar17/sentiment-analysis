const express = require("express");
const app = express();
const PORT = 8082;

const sentimentAnalysisRoutes = require("./routes/sentimentAnalysis.routes");

app.use(express.json()); // json middleware

app.use("/", sentimentAnalysisRoutes);

app.listen(PORT, () => {
  console.log(`Listening at ${PORT}`);
});
