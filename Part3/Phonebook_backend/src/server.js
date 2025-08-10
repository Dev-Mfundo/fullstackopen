const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const dotenv = require('dotenv')
const {persons} = require('./db/persons')


const app = express()
app.use(express.json())
dotenv.config()
app.use(dotenv)
const corsOrigin={
	origin: "https://phonebook-frontend-gvjh.onrender.com",
	methods: ["GET","POST","DELETE"],
	credentials: false
}

app.use(cors(corsOrigin))

app.use((req, res, next)=>{
  const originalSend = res.send
  res.send = function(body){
    res.locals.body = body
    return originalSend.call(this, body)
  }
  next()
})

morgan.token('res-body', (req, res)=>{
  return res.locals.body ? String(res.locals.body) : '';
})

app.use(morgan(
  ':method :url :status :res[content-length] - :response-time ms :res-body'
))

app.get('/api/persons',(req,res)=>{
	if(!persons || persons.length === 0){
		return res.status(404).json({error: "persons not found"})
	}
	res.status(200).json(persons)
})

app.get('/api/persons/:id',(req,res)=>{
	const id = req.params.id
	const person = persons.find(person=>person.id===id)
	if(!person)return res.status(404).json({error: "person not found"})
	res.status(200).json(person)
})

app.delete('/api/persons/:id',(req,res)=>{
	const id = req.params.id
	const index = persons.findIndex(person=>person.id===id)
	if(index === -1)return res.status(401).json({error: "failed to delete"})
	persons.splice(index,1)
	res.status(204).end()

})

app.post('/api/persons',(req,res)=>{
	const randomId = Math.floor(Math.random()*1000)
	const person = req.body
	if(!person.name)return res.status(400).json({error: "name input required"})
	if(!person.number)return res.status(400).json({error: "number input required"})

    const checkExist= persons.some(p=>p.name === person.name)
	if(checkExist)return res.status(409).json({ error: "name must be unique"})

	const newPerson = {
		id: String(randomId),
		name: person.name,
		number: person.number
	}

	persons.push(newPerson)
	res.status(201).json(newPerson)
})

app.get('/info',(req,res)=>{
	const numberOfPeople = persons.length
	const currentDate = new Date()
	const infoText=
`Phonebook has info for ${numberOfPeople} people
${currentDate}`;
	res.set('Content-Type', 'text/plain')
	res.send(infoText)
})



const PORT = process.env.PORT || 3001

app.listen(PORT,()=>{
	console.log(`Server running on port: ${PORT}`)
})
