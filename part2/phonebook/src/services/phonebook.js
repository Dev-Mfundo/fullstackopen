import axios from 'axios'

const baseUrl = '/api/persons'

const handleRequest=async(request)=>{
  try {
    const res = await request
    return { success: true, data: res.data }
  } catch (err) {
    const errorMsg = err.response?.data?.error
    return { success: false, error: errorMsg }
  }
}

const getAll = () => handleRequest(axios.get(baseUrl))
const create = object => handleRequest(axios.post(baseUrl, object))
const deleteContact = id => handleRequest(axios.delete(`${baseUrl}/${id}`))
const updateContact = (id, object) => handleRequest(axios.put(`${baseUrl}/${id}`, object))

export default {
  getAll,
  create,
  deleteContact,
  updateContact
}
