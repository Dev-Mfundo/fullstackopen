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
	}).catch(error=>res.status(404).send({error: 'Failed to retrieve phonebook'}))
})

const unknownEndPoints=(req, res)=>{
	res.status(404).send({error: 'unknown endpoint'})
}

app.use(unknownEndPoints)

const errorHandler=(error,req,res,next)=>{
	console.log(error.message)
	if(error.name === 'CastError'){
		return res.status(400).json({error: 'malformatted id'})
	}
	next(error)
}

app.use(errorHandler)

app.get('/api/persons/:id',(req,res, next)=>{
	const id = req.params.id
	Person.findById(id).then(person=>{
		if(!person)return res.status(404).json({error: "person not found"})
		else return res.json(person)
	}).catch(error=>next(error))
  
})

app.delete('/api/persons/:id',(req,res, next)=>{
	const id = req.params.id
	Person.findByIdAndDelete(id).then(person=>{
		if(!person)return res.status(404).json({error: "person not found"})
		else return res.status(204).json(person)
	}).catch(error=>next(error))

})

app.put('/api/persons/:id', (res,req, next)=>{
	const {name, number} = req.body
	const id = req.params.id
	Person.findByIdAndUpdate(id).then(person=>{
		if(!person)return res.status(404).end()
			person.name = name
		  person.number = number
		  person.save().then((updatedPerson)=>{
		  	res.json(updatedPerson)
		  })
	}).catch(error=>next(error))
})

app.post('/api/persons',(req,res)=>{
	const body = req.body
	if(!body.name || body.name.length < 3)return res.status(400).json({error: "name input required of minimum of three alphabets"})
	if(!body.number || body.number.length < 8)return res.status(400).json({error: "number input required of minimum of eight numbers"})
 
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
