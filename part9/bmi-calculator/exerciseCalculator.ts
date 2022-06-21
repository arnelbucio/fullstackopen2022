interface Result {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: number
  ratingDescription: string
  target: number
  average: number
}


const parseExerciseArguments = (args: Array<string>): Array<number> => {
  args.slice(2).forEach((hours) => {
    if (isNaN(Number(hours))) {
      throw new Error('Provided values were not numbers!');
    }
  });

  return args.slice(2).map(hours => Number(hours));
};

const calculateExercises = (args: Array<number>): Result => {
  const target = args[0];
  const dailyExerciseHours = args.slice(1);
  const periodLength = dailyExerciseHours.length;
  const trainingDays =  dailyExerciseHours.filter(day => day !== 0).length;
  const average = dailyExerciseHours.reduce((a, b) => a + b) / dailyExerciseHours.length;
  const success = average >= target;
  const diff = target - average;

  let rating;
  let ratingDescription;

  switch(true) {
    case(diff <= 0):
      rating = 3;
      ratingDescription = 'you\'ve hit the target! keep it up!';
      break;
    case(diff < 0.5):
      rating = 2;
      ratingDescription = 'not too bad but could be better';
      break;
    default:
      rating = 1;
      ratingDescription = 'bad';
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  };
};


try {
  const dailyExerciseHours = parseExerciseArguments(process.argv);
  console.log(calculateExercises(dailyExerciseHours));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}

export { calculateExercises };
