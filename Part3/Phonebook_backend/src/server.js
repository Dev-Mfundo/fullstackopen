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

const PORT = process.env.PORT || 3001

app.listen(PORT,()=>{
	console.log(`Server running on port: ${PORT}`)
})