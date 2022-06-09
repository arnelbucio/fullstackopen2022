import { Divider, List, ListItem } from '@mui/material'

const CommentList = ({ comments }) => {
  return (
    <div>
      <h3>Comments</h3>
      <List>
        {comments &&
          comments.map((comment) => (
            <>
              <ListItem alignItems="flex-start" key={comment.id}>
                {comment.text}
              </ListItem>
              <Divider />
            </>
          ))}
      </List>
    </div>
  )
}

export default CommentList
