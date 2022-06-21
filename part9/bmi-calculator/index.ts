import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

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

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  const daily_exercises: Array<number> = req.body.daily_exercises;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  const target: number = req.body.target;

  if (!daily_exercises || !target) {
    return res.send({
      error: "parameters missing"
    });
  }

  if ([target, ...daily_exercises].some(hours => isNaN(Number(hours)))) {
    return res.send({
      error: "malformatted parameters"
    });
  }

  return res.send(calculateExercises([target, ...daily_exercises]));
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
