import { useDispatch } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'
// import { setNotification } from '../reducers/notificationReducer'

const Filter = () => {
  const dispatch = useDispatch()

  const handleChange = async (event) => {
    const filter = event.target.value
    dispatch(setFilter(filter))
  }

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter<input onChange={handleChange}/>
    </div>
  )
}

export default Filter