import { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = props => {
  const [filter, setFilter] = useState(null)
  const [books, setBooks] = useState([])
  const allBooks = useQuery(ALL_BOOKS)

  useEffect(() => {
    if (filter) {
      const filteredBooks = books.filter(book => {
        return book.genres.includes(filter)
      })
      setBooks(filteredBooks)
    } else {
      setBooks(allBooks.data?.allBooks)
    }
  }, [filter, allBooks.data]) // eslint-disable-line

  if (!props.show) return null
  if (allBooks.loading) return <p>Loading ...</p>
  if (allBooks.error) return `Error! ${allBooks.error}`

  const genres = [
    ...new Set(allBooks.data.allBooks.map(book => book.genres).flat()),
  ]

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map(book => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {genres.map(genre => (
        <button key={genre} onClick={() => setFilter(genre)}>
          {genre}
        </button>
      ))}
      <button onClick={() => setFilter(null)}>all genres</button>
    </div>
  )
}

export default Books
