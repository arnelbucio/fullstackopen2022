import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { SET_BIRTHYEAR } from '../queries'

const AuthorForm = ({ authors }) => {
  const [name, setName] = useState('')
  const [birthYear, setBirthYear] = useState('')

  const [changeNumber] = useMutation(SET_BIRTHYEAR)

  const submit = event => {
    event.preventDefault()

    if (!birthYear) {
      return
    }

    changeNumber({
      variables: {
        name: name || event.target.name.value,
        setBornTo: Number(birthYear),
      },
    })

    setName('')
    setBirthYear('')
  }

  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          <label>
            name
            <select
              name='name'
              value={name}
              onChange={({ target }) => setName(target.value)}
            >
              {authors.map(author => (
                <option key={author.id} value={author.name}>
                  {author.name}
                </option>
              ))}
            </select>
          </label>
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
