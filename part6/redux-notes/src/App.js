import NewNote from './components/NewNote'
import Notes from './components/Notes'
import VisibilityFilter from './components/Visibilityfilter'

const App = () => {
  return(
    <div>
      <NewNote />
      <VisibilityFilter />
      <Notes />
    </div>
  )
}

export default App
