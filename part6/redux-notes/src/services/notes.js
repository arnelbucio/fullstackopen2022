import axios from 'axios'

const baseUrl = 'http://localhost:3001/notes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const object = { content, important: false }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const toggleImportance = async (note) => {
  const data = { ...note, important: !note.important }
  const response = await axios.patch(`${baseUrl}/${note.id}`, data)
  return response.data
}

const actions = { getAll, createNew, toggleImportance }

export default actions