import { connect } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

const Filter = (props) => {
  const handleChange = async (event) => {
    const filter = event.target.value
    props.setFilter(filter)
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

const mapStateToProps = (state) => ({ filter: state.filter })

export default connect(
  mapStateToProps,
  { setFilter }
)(Filter)
