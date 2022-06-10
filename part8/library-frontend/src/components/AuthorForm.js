import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { SET_BIRTHYEAR } from '../queries'

const AuthorForm = ({ setError }) => {
  const [name, setName] = useState('')
  const [birthYear, setBirthYear] = useState('')

  const [changeNumber] = useMutation(SET_BIRTHYEAR)

  const submit = event => {
    event.preventDefault()

    changeNumber({ variables: { name, setBornTo: Number(birthYear) } })

    setName('')
    setBirthYear('')
  }

  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          name
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          born
          <input
            type='number'
            value={birthYear}
            onChange={({ target }) => setBirthYear(target.value)}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default AuthorForm
