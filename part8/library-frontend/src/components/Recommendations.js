import { useEffect } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import { ALL_BOOKS, CURRENT_USER } from '../queries'

const Recommendations = props => {
  const userQuery = useQuery(CURRENT_USER)
  const [recommendedBooksQuery, { loading, error, data }] =
    useLazyQuery(ALL_BOOKS)

  useEffect(() => {
    if (userQuery.data) {
      recommendedBooksQuery({
        variables: {
          genre: userQuery.data.me.favouriteGenre,
        },
      })
    }
  }, [userQuery.data]) // eslint-disable-line

  if (!props.show) return null
  if (loading) return <p>Loading ...</p>
  if (error) return `Error! ${error}`

  const user = userQuery.data.me
  const recommendedBooks = data.allBooks

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
