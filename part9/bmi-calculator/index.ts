import express from 'express';
import { calculateBmi } from './bmiCalculator';

const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack');
});

app.get('/bmi/:height?:weight?', (req, res) => {
  const weight = Number(req.query.weight);
  const height = Number(req.query.height);

  if (isNaN(weight) || isNaN(height)) {
    res.send({
      error: "malformatted parameters"
    });
  }

  res.send({
    weight,
    height,
    bmi: calculateBmi(height, weight)
  });
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
