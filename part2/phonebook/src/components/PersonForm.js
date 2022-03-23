const PersonForm = ({newName, handleNameChange, newNumber, handleNumberChange, addName}) => {
  return (
    <form>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button onClick={addName} type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm
