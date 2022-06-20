
// BMI = kg/m2
// height (in centimeters) and weight (in kilograms)
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

console.log(calculateBmi(180, 74))
