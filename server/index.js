const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const HTTP_PORT = process.env.PORT || 8080;

if (process.env.NODE_ENV !== 'production') {
  const dotenv = require('dotenv');
  dotenv.config();
}

app.use(express.json());
app.use(cors());

function normalizeData({ text }) {
  return {
    documents: [{ id: '1', text }],
  };
}

app.post('/translate', (req, res) => {
  const { text } = req.body;
  const dataToTranslate = [{ text }];

  axios
    .post(process.env.AZURE_TRANSLATOR_URL, dataToTranslate, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key':
          process.env.AZURE_TRANSLATOR_SUBSCRIPTION_KEY,
      },
    })
    .then(({ data }) => {
      res.send(data);
    })
    .catch((err) => {
      console.error(err);
    });
});

app.post('/sentiment', (req, res) => {
  const normalizedData = normalizeData(req.body);

  axios
    .post(process.env.AZURE_SENTIMENT_URL, normalizedData, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key':
          process.env.AZURE_SENTIMENT_SUBSCRIPTION_KEY,
      },
    })
    .then(({ data }) => {
      res.send(data.documents);
    })
    .catch((err) => {
      console.error(err);
    });
});

app.listen(HTTP_PORT, () => console.log('Server listening on port 8080!'));
