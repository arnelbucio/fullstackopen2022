import { useState } from 'react'
import { useApolloClient, useSubscription } from '@apollo/client'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Recommendations from './components/Recommendations'

import { AUTHOR_ADDED, BOOK_ADDED, ALL_BOOKS, ALL_AUTHORS } from './queries'
import { updateBookCache, updateAuthorCache } from './utils'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [notification, setNotification] = useState(null)

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded

      notify(`${addedBook.title} added`)
      updateBookCache(client.cache, { query: ALL_BOOKS }, addedBook)
    },
  })

  useSubscription(AUTHOR_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedAuthor = subscriptionData.data.authorAdded
      updateAuthorCache(client.cache, { query: ALL_AUTHORS }, addedAuthor)
    },
  })

  const client = useApolloClient()

  const notify = message => {
    setNotification(message)
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('authors')
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>

        {token ? (
          <>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => setPage('recommend')}>recommend</button>
            <button onClick={logout}>logout</button>
          </>
        ) : (
          <button onClick={() => setPage('login')}>login</button>
        )}
      </div>
      <Notification notification={notification} />

      <Authors show={page === 'authors'} />
      <Books show={page === 'books'} />
      <NewBook show={page === 'add'} setPage={setPage} notify={notify} />
      <Recommendations show={page === 'recommend'} />
      <LoginForm
        show={page === 'login'}
        setToken={setToken}
        setPage={setPage}
        notify={notify}
      />
    </div>
  )
}

export default App
