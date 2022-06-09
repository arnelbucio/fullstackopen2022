import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { createComment } from '../reducers/blogReducer'

const CommentForm = ({ blog }) => {
  const dispatch = useDispatch()

  const addComment = (event) => {
    event.preventDefault()
    const comment = event.target.text.value

    if (comment === '') {
      return
    }

    event.target.text.value = ''
    dispatch(createComment(blog.id, comment))
    dispatch(
      setNotification({
        text: 'new comment added',
        type: 'success',
      })
    )
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addComment}>
        <div>
          <input type="text" name="text" />
          <button type="submit">add comment</button>
        </div>
      </form>
    </div>
  )
}

export default CommentForm
