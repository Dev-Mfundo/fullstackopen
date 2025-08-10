import axios from 'axios'

const baseUrl = '/api/persons'

const getAll=()=>axios.get(`${baseUrl}`).then(res=>res.data)

const create=(object)=>axios.post(`${baseUrl}`, object).then(res=>res.data)

const deleteContact=(id)=>axios.delete(`${baseUrl}/${id}`)

const updateContact=(id, object)=>axios.put(`${baseUrl}/${id}`, object).then(res=>res.data)
export default {
    getAll: getAll,
    create: create,
    deleteContact: deleteContact,
    updateContact: updateContact
}