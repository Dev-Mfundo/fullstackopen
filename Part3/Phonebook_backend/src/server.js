const express = require('express')
const morgan = require('morgan')
const dotenv = require('dotenv')
const {Person} = require('./models/persons')

dotenv.config()

const app = express()
app.use(express.json())

app.use(express.static('dist'))


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
	Person.find({}).then(persons=>{
		return res.status(200).json(persons)
	}).catch(error=>res.status(404).json({error: 'Failed to retrieve phonebook'}))
})

app.get('/api/persons/:id',(req,res)=>{
	const id = req.params.id
	Person.findById(id).then(person=>{
		return res.json(person)
	}).catch(error=>res.status(404).json({error: "person not found"}))

})

app.delete('/api/persons/:id',(req,res)=>{
	const id = req.params.id
	Person.findByIdAndDelete(id).then(person=>{
		return res.status(204).json(person)
	}).catch(error=>res.status(401).json({error: "failed to delete"}))

})

app.post('/api/persons',(req,res)=>{
	const body = req.body
	if(!body.name)return res.status(400).json({error: "name input required"})
	if(!body.number)return res.status(400).json({error: "number input required"})
 
  Person.findOne({name: body.name}).then(checkExist=>{
	if(checkExist)return res.status(409).json({ error: "name must be unique"})
	const person = new Person({
		name: body.name,
		number: body.number
	})

  person.save().then((result)=>{
  	return res.status(201).json(result)
  }).catch(error=>res.status(401).json({error: 'Failed to add new note'}))
})
})

app.get('/info',(req,res)=>{
  Person.find({}).then(persons=>{
	const numberOfPeople = persons.length
	const currentDate = new Date()
	const infoText=
`Phonebook has info for ${numberOfPeople} people
${currentDate}`;
	res.set('Content-Type', 'text/plain')
	res.send(infoText)
  })
})



const PORT = process.env.PORT || 3001

app.listen(PORT,()=>{
	console.log(`Server running on port: ${PORT}`)
})
