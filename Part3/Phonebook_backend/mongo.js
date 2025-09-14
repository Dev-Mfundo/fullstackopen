const mongoose = require('mongoose')

if(process.argv.length<3){
  throw new Error('Missing password argument')
}

const password = process.argv[2]

const url = `mongodb+srv://new_user:${password}@cluster0.zoyfqlk.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)

mongoose.connect(url)
.catch(()=>throw new Error('Failed to connect to db'))

const personSchema = new mongoose.Schema({
  name:{
    type: String,
    minlength: 3,
    required: true,
    unique: true
  },
  number: {
    type: String,
    minlength: 8,
    required: true
  }

})

const Person = mongoose.model("Person", personSchema)

const personName= process.argv[3]
const personNumber=process.argv[4]

const person = new Person({
  name: personName,
  number: personNumber
})

person.save().then(res=>{
	console.log(`added ${personName} number ${personNumber} to phonebook`)
})

Person.find({}).then((persons)=>{
	console.log('phonebook:')
	persons.forEach(person=>console.log(`${person.name} ${person.number}`))
	mongoose.connection.close()
})