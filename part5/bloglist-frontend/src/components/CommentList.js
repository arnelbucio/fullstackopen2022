const CommentList = ({ comments }) => {
  return (
    <div>
      <h3>comments</h3>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>{comment.text}</li>
        ))}
      </ul>
    </div>
  )
}

export default CommentList
