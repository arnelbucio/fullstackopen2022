interface Result {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: number
  ratingDescription: string
  target: number
  average: number
}

const calculateExercises = (dailyExerciseHours: Array<number>): Result => {
  const average = dailyExerciseHours.reduce((a, b) => a + b) / dailyExerciseHours.length
  const target = 2
  const diff = target - average

  let rating
  let ratingDescription

  switch(true) {
    case(diff <= 0):
      rating = 1
      ratingDescription = 'you\'ve hit the target! keep it up!'
      break
    case(diff < 0.5):
      rating = 2
      ratingDescription = 'not too bad but could be better'
      break
    default:
      rating = 3
      ratingDescription = 'you\'ve got to exercise more'
  }

  return {
    periodLength: dailyExerciseHours.length,
    trainingDays: dailyExerciseHours.filter(day => day !== 0).length,
    success: average >= target,
    rating,
    ratingDescription,
    target,
    average
  }
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1]))
