const express = require('express')
const dotenv = require('dotenv')
const {persons} = require('./persons')

dotenv.config()
const app = express()
app.use(express.json())


app.get('/api/persons', (req,res)=>{
	if(!persons || persons.length === 0){
		return res.status(404).json({error: "Persons not found"})
	}
	res.status(200).json(persons)
})

app.get('/api/persons/:id',(req,res)=>{
	const id = req.params.id
	const person = persons.find(person=>person.id===id)
	if(!person)res.status(404).json({error: "Person not found"})
	res.status(200).json(person)
})

app.get('/info',(req,res)=>{
	const numberOfPeople = persons.length
	const currentDate = new Date()
	const infoText= `
Phonebook has info for ${numberOfPeople} people
${currentDate}`;
	res.set('Content-Type', 'text/plain')
	res.send(infoText)
})



const PORT = process.env.PORT || 3001

app.listen(PORT,()=>{
	console.log(`Server running on port: ${PORT}`)
})