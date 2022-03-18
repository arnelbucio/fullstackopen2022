import { useState } from 'react'

const Anecdote = ({anecdote, points}) => {
  return (
    <div>
      <p>{anecdote}</p>
      <p>has {points} votes</p>
    </div>
  )
}

const Button = ({text, onClick}) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]

  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0))

  function getRandomAnecdote() {
    return Math.floor(Math.random() * anecdotes.length);
  }

  function handleVote() {
    const points_copy = [...points]
    points_copy[selected] += 1
    setPoints(points_copy)
  }

  function getTopAnecdoteIndex() {
    return points.indexOf(Math.max(...points))
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote anecdote={anecdotes[selected]} points={points[selected]} />

      <Button text='vote' onClick={handleVote} />
      <Button text='next anecdote' onClick={() => setSelected(getRandomAnecdote())} />
      <h1>Anecdote with most votes</h1>
      <Anecdote anecdote={anecdotes[getTopAnecdoteIndex()]} points={points[getTopAnecdoteIndex()]} />
    </div>
  )
}

export default App