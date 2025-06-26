import axios from 'axios'

const getAll=()=>axios.get('http://localhost:3001/persons').then(res=>res.data)

const create=(object)=>axios.post('http://localhost:3001/persons', object).then(res=>res.data)

const deleteContact=(id)=>axios.delete(`http://localhost:3001/persons/${id}`)

const updateContact=(id, object)=>axios.put(`http://localhost:3001/persons/${id}`, object).then(res=>res.data)
export default {
    getAll: getAll,
    create: create,
    deleteContact: deleteContact,
    updateContact: updateContact
}