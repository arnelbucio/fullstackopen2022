import { useDispatch } from 'react-redux'

import { Button, TextField } from '@mui/material'

import loginService from '../services/login'
import { setNotification } from '../reducers/notificationReducer'
import { setUser } from '../reducers/loginReducer'

const LoginForm = () => {
  const dispatch = useDispatch()
  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username: event.target.username.value,
        password: event.target.password.value,
      })

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      dispatch(setUser(user))

      event.target.username.value = ''
      event.target.password.value = ''
    } catch (exception) {
      dispatch(
        setNotification({
          text: 'wrong username or password',
          type: 'error',
        })
      )
    }
  }

  return (
    <div>
      <h2>log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          <TextField
            label="username"
            id="username"
            type="text"
            name="username"
          />
        </div>
        <div>
          <TextField
            label="password"
            id="password"
            type="password"
            name="password"
          />
        </div>
        <Button
          id="login-button"
          type="submit"
          variant="contained"
          color="success"
        >
          login
        </Button>
      </form>
    </div>
  )
}

export default LoginForm
