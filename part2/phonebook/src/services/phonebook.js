import axios from 'axios'

const baseUrl = 'https://phonebook-backend-p60v.onrender.com'

const getAll=()=>axios.get(`${baseUrl}/api/persons`).then(res=>res.data)

const create=(object)=>axios.post(`${baseUrl}/api/persons`, object).then(res=>res.data)

const deleteContact=(id)=>axios.delete(`${baseUrl}/api/persons/${id}`)

const updateContact=(id, object)=>axios.put(`${baseUrl}/api/persons/${id}`, object).then(res=>res.data)
export default {
    getAll: getAll,
    create: create,
    deleteContact: deleteContact,
    updateContact: updateContact
}