import axios from 'axios'

const getAll=()=>axios.get('https://phonebook-backend-p60v.onrender.com/api/persons').then(res=>res.data)

const create=(object)=>axios.post('https://phonebook-backend-p60v.onrender.com/api/persons', object).then(res=>res.data)

const deleteContact=(id)=>axios.delete(`https://phonebook-backend-p60v.onrender.com/api/persons/${id}`)

const updateContact=(id, object)=>axios.put(`https://phonebook-backend-p60v.onrender.com/api/persons/${id}`, object).then(res=>res.data)
export default {
    getAll: getAll,
    create: create,
    deleteContact: deleteContact,
    updateContact: updateContact
}