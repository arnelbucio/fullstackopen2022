import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { initializeUsers } from '../reducers/userReducer'

const User = () => {
  const dispatch = useDispatch()
  const id = useParams().userid
  const user = useSelector((state) => state.users.find((u) => u.id === id))

  useEffect(() => {
    dispatch(initializeUsers())
  }, [])

  return (
    user && (
      <div>
        <h2>{user.name}</h2>
        <h3>added blogs</h3>
        <ul>
          {user.blogs.map((blog) => (
            <li key={blog.id}>{blog.title}</li>
          ))}
        </ul>
      </div>
    )
  )
}

export default User
