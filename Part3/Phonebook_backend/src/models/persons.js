require('dotenv').config()
const mongoose = require('mongoose')

const url = process.env.MONGODB_URL

mongoose.set('strictQuery', false)

mongoose.connect(url)
.then(()=>console.log('MONGODB is connected'))
.catch(()=>console.error('MONGODB connection failed'))

const personSchema = new mongoose.Schema({
  name:{
    type: String,
    minlength: 3,
    required: true,
    unique: true,
    validator: function(v){}
  },
  number: {
    type: String,
    minlength: 8,
    required: true,
    validator: function(v){}
  }

})

personSchema.set('toJSON',{
  transform:(document,returnedObject)=>{
  returnedObject.id=returnedObject._id.toString()
  delete returnedObject._id
  delete returnedObject.__v
  }
})

const Person = mongoose.model("Person", personSchema)

module.exports={Person}
