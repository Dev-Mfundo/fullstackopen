import axios from 'axios'

const getAll=()=>axios.get('/api/persons').then(res=>res.data)

const create=(object)=>axios.post('/api/persons', object).then(res=>res.data)

const deleteContact=(id)=>axios.delete(`/api/persons/${id}`)

const updateContact=(id, object)=>axios.put(`/api/persons/${id}`, object).then(res=>res.data)
export default {
    getAll: getAll,
    create: create,
    deleteContact: deleteContact,
    updateContact: updateContact
}