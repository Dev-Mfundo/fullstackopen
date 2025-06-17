import { useState } from 'react'

const Heading=({title})=><h1>{title}</h1>

const Button=({text, onClick})=><button onClick={onClick}>{text}</button>

const Results=({type,text})=><h5>{text} {type}</h5>

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  const handleGood=()=>{
	  const update = good+1
	  setGood(update)
  }
  const handleNeutral=()=>{
	  const update = neutral+1
	  setNeutral(update)
  }
  const handleBad=()=>{
	  const update = bad+1
	  setBad(update)
  }
  return (
    <div>
      <Heading title='give feedback'/>
	  <Button text='good' onClick={handleGood}/>
	  <Button text='neutral' onClick={handleNeutral}/>
	  <Button text='bad' onClick={handleBad}/>
	  <Heading title='statistics'/>
	  <Results type={good} text='good'/>
	  <Results type={neutral} text='neutral'/>
	  <Results type={bad} text='bad'/>
    </div>
  )
}

export default App
