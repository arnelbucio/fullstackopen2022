import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  return (
    <div>
      {notification.text && (
        <div className={`notification ${notification.type}`}>
          {notification.text}
        </div>
      )}
    </div>
  )
}

export default Notification
