import { useSelector } from 'react-redux'
import { Alert } from '@mui/material'

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  return (
    <div>
      {notification.text && (
        <Alert severity={notification.type}>{notification.text}</Alert>
      )}
    </div>
  )
}

export default Notification
