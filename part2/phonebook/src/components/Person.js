const Person = ({id, name, number, deleteName}) => {
  return (
    <li>{name} {number} <button id={id} onClick={deleteName}>delete</button></li>

  )
}

export default Person