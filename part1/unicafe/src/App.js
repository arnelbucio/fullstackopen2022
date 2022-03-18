import { useState } from 'react'


const Statistics = ({good, neutral, bad}) => {
  const all = good + neutral + bad
  const average = (good - bad)/all*100 || 0
  const positive = ((good / all)*100 || 0) + '%'

  if (all === 0) {
    return <p>No feedback given</p>
  }

  return (
    <table>
      <tbody>
        <StatisticLine text='good' value={good} />
        <StatisticLine text='neutral' value={neutral} />
        <StatisticLine text='bad' value={bad} />
        <StatisticLine text='all' value={all} />
        <StatisticLine text='average' value={average} />
        <StatisticLine text='positive' value={positive} />
      </tbody>
    </table>
  )
}

const StatisticLine = ({text, value}) => {
  return (
    <tr>
      <td>{text} {value}</td>
    </tr>
  )
}

const Button = ({text, handleClick}) => {
  return <button onClick={handleClick}>
    {text}
  </button>
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button text='good' handleClick={() => setGood(good + 1)} />
      <Button text='neutral' handleClick={() => setNeutral(neutral + 1)} />
      <Button text='bad' handleClick={() => setBad(bad + 1)} />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App