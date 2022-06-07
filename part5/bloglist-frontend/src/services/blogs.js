import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const remove = async (blogId) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.delete(`${baseUrl}/${blogId}`, config)
  return response.data
}

const like = async (blogObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const blogUrl = `${baseUrl}/${blogObject.id}`

  const response = await axios.put(
    blogUrl,
    {
      likes: blogObject.likes + 1,
      author: blogObject.author,
      title: blogObject.title,
      url: blogObject.url,
    },
    config
  )

  return response.data
}

const blogService = {
  setToken,
  getAll,
  create,
  like,
  remove,
}

export default blogService
