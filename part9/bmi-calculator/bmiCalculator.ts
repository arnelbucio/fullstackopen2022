// BMI = kg/m2
// height (in centimeters) and weight (in kilograms)

interface BMIValues {
  height: number;
  weight: number;
}

const parseArguments = (args: Array<string>): BMIValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}

const calculateBmi = (height: number, weight: number): string => {
  const bmi = Math.round((weight/Math.pow(height/100, 2)) * 10) / 10

  switch (true) {
    case(bmi < 18):
      return 'Underweight'
    case(bmi < 24.9):
      return 'Normal (healthy weight)'
    case(bmi < 29.9):
      return 'Overweight'
    default:
      return 'Obese'
  }
}

try {
  const { height, weight } = parseArguments(process.argv);
  console.log(calculateBmi(height, weight))
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
