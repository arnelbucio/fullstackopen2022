import Person from './Person'

const Persons = ({personsToShow, deleteName}) => {
  return (
    <ul>
      {personsToShow.map(person => <Person key={person.id} id={person.id} name={person.name} number={person.number} deleteName={deleteName} />)}
    </ul>
  )
}

export default Persons
