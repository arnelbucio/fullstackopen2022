import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logoutUser } from '../reducers/loginReducer'

const Navigation = ({ user }) => {
  const dispatch = useDispatch()

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogAppUser')
    dispatch(logoutUser())
  }

  return (
    <div>
      <Link to="/">blogs</Link> | <Link to="/users">users</Link>
      <span>
        | {user.name} logged in
        <button onClick={handleLogout}>log out</button>
      </span>
    </div>
  )
}

export default Navigation
