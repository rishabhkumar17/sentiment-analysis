const tf = require("@tensorflow/tfjs");

const urlModel =
  "https://storage.googleapis.com/tfjs-models/tfjs/sentiment_cnn_v1/model.json";

const urlMetaData =
  "https://storage.googleapis.com/tfjs-models/tfjs/sentiment_cnn_v1/metadata.json";

let model;
let indexFrom;
let maxLen;
let wordIndex;
let prediction;

// Load a pre-trained model
const loadModel = async () => {
  model = await tf.loadLayersModel(urlModel);
  const sentimentMetadata = await loadMetadata();
  indexFrom = sentimentMetadata["index_from"];
  maxLen = sentimentMetadata["max_len"];
  wordIndex = sentimentMetadata["word_index"];
};

// Get metaData for the model so that we use it to predict later
const loadMetadata = async () => {
  const metadataJson = await fetch(urlMetaData);
  const metadata = await metadataJson.json();
  return metadata;
};

const predict = async (msg) => {
  await tf.tidy(() => {
    // Convert to lowercase and remove punctuations
    const inputText = msg
      .trim()
      .toLowerCase()
      .replace(/(\.|\,|\!)/g, "")
      .split(" "); // Split the text into words

    const inputBuffer = tf.buffer([1, maxLen], "float32");

    for (let i = 0; i < inputText.length; ++i) {
      const word = inputText[i];
      inputBuffer.set(wordIndex[word] + indexFrom, 0, i);
    }
    const input = inputBuffer.toTensor();
    const output = model.predict(input);
    prediction = Array.from(output.dataSync())[0];
    console.log(output.dataSync()[0]);
  });
};

const getPrediction = async (msg) => {
  await loadModel();

  await predict(msg);
  return prediction;
};

module.exports = getPrediction;
