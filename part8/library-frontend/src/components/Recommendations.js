import { useQuery } from '@apollo/client'
import { ALL_BOOKS, CURRENT_USER } from '../queries'

const Recommendations = props => {
  const userQuery = useQuery(CURRENT_USER)
  const allBooks = useQuery(ALL_BOOKS)

  if (!props.show) return null
  if (userQuery.loading || allBooks.loading) return <p>Loading ...</p>
  if (allBooks.error) return `Error! ${allBooks}`

  const user = userQuery.data.me
  const recommendedBooks = allBooks.data.allBooks.filter(book => {
    return book.genres.includes(user.favouriteGenre)
  })

  return (
    <div>
      <h2>recommendations</h2>
      <p>
        books in your favorite genre <strong>{user.favouriteGenre}</strong>
      </p>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {recommendedBooks.map(b => (
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommendations
