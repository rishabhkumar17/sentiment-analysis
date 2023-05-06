import { Box, TextField, Typography } from "@mui/material";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Box
        sx={{
          width: "100vw",
          height: "90px",
          backgroundImage:
            "linear-gradient(to right, #0f0c29, #302b63, #24243e)",
        }}
      >
        <h1
          style={{
            fontSize: 35,
            background: "-webkit-linear-gradient(#eee, #fff)",
            webkitBackgroundClip: "text",
            webkitTextFillColor: "transparent",
          }}
        >
          Sentiment Analysis
        </h1>
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        gap={3}
        sx={{
          borderRadius: "20px",
          width: "80vw",
          height: "50vh",
          backgroundImage:
            "radial-gradient(circle farthest-side, #fceabb, #f8b500)",
        }}
      >
        <Box>
          <Typography sx={{ fontSize: 25, fontWeight: "700" }}>
            Input Text
          </Typography>
          <TextField
            sx={{ background: "#ffffff", width: "500px" }}
            multiline
            rows={2}
            inputProps={{
              sx: { fontSize: 25 },
            }}
          ></TextField>
        </Box>
        <Typography sx={{ fontSize: 25, fontWeight: "700" }}>
          Sentiment: Positive
        </Typography>
        <Typography sx={{ fontSize: 25, fontWeight: "700" }}>
          Confidence: 0.8501
        </Typography>
      </Box>
    </div>
  );
}

export default App;
