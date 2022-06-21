import express = require('express');
import cors = require('cors');


const PORT = 3001;
const app = express();

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());
app.use(express.json());

app.get('/api/ping', (_req, res) => {
  console.log('pong');
  res.send('pong');
});


app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
