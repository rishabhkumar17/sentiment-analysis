import { Box, Button, TextField, Typography } from "@mui/material";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [text, setText] = useState("");
  const [sentiment, setSentiment] = useState("");
  const [confidence, setConfidence] = useState("");

  const performAPICall = async () => {
    let response = {};
    try {
      response = await (
        await fetch("http://localhost:8082", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: text,
          }),
        })
      ).json();
      console.log(response);
      setPredictions(response.toFixed(4));
    } catch (e) {
      return e;
    }
  };

  const setPredictions = (response) => {
    if (response <= 0.6) setSentiment("Negative");
    if (response > 0.6 && response < 0.65) setSentiment("Neutral");
    if (response >= 0.65) setSentiment("Positive");

    setConfidence(response);
  };

  useEffect(() => {
    setConfidence("");
    setPredictions("");
  }, [text]);

  return (
    <div className="App">
      <Box
        sx={{
          width: "100vw",
          height: "90px",
          backgroundImage:
            "linear-gradient(to right, #0f0c29, #302b63, #24243e)",
          boxShadow: 3,
        }}
      >
        <h1
          style={{
            fontSize: 35,
            background: "-webkit-linear-gradient(#eee, #fff)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Sentiment Analysis
        </h1>
      </Box>
      <Box
        display="flex"
        justifyContent="flex-start"
        alignItems="center"
        flexDirection="column"
        gap={3}
        sx={{
          borderRadius: "20px",
          width: "80vw",
          height: "50vh",
          backgroundImage:
            "radial-gradient(circle farthest-side, #fceabb, #f8b500)",
          boxShadow: 3,
        }}
      >
        <Box
          marginTop="40px"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Typography sx={{ fontSize: 25, fontWeight: "700" }}>
            Input Text
          </Typography>
          <TextField
            value={text}
            sx={{ background: "#ffffff", width: "500px", marginBottom: "10px" }}
            multiline
            rows={2}
            inputProps={{
              sx: { fontSize: 25 },
            }}
            onChange={(e) => setText(e.target.value)}
          ></TextField>
          <Button
            variant="contained"
            onClick={() => performAPICall()}
            sx={{
              fontSize: 15,
              background:
                "linear-gradient(to right, #0f0c29, #302b63, #24243e)",
            }}
          >
            Calculate
          </Button>
        </Box>
        {confidence && (
          <Box>
            <Typography sx={{ fontSize: 25, fontWeight: "700" }}>
              Sentiment: {sentiment}
            </Typography>
            <Typography sx={{ fontSize: 25, fontWeight: "700" }}>
              Confidence: {confidence}
            </Typography>
          </Box>
        )}{" "}
      </Box>
    </div>
  );
}

export default App;
