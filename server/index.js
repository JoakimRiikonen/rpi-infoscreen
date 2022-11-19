const axios = require('axios');
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

app.use('/spotprices', async (req, res) => {
  console.log('fetching spot prices...');
  const url = 'https://api.spot-hinta.fi/TodayAndDayForward'
  const response = await axios.get(url);

  res.send(response.data);
})

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Starting server at port ${PORT}`);
});