import { useState } from 'react'
import { useApolloClient } from '@apollo/client'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Recommendations from './components/Recommendations'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [notification, setNotification] = useState(null)

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
