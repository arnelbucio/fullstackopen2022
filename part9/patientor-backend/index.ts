import express = require('express');

const app = express();
app.use(express.json());

app.get('/api/ping', (_req, res) => {
  console.log('pong');
  res.send('pong');
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
