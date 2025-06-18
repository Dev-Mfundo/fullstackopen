import { useState } from 'react'

const Heading=({title})=><h1>{title}</h1>

const Button=({text, onClick})=><button onClick={onClick}>{text}</button>

const StatisticLine =({value,text})=><h5>{text} {value}</h5>

const Statistics =({bad,good,neutral})=>{
    
	const total = bad + good + neutral
	const average= total? (good-bad)/total: 0;
	const positive= total ? (good / total) * 100 : 0
	if(total ===0){
		return <p>No feedback given</p>
	}
	return(
	<>
	<StatisticLine value={good} text='good'/>
	<StatisticLine value={neutral} text='neutral'/>
	<StatisticLine value={bad} text='bad'/>
	<StatisticLine value={total} text='all'/>
	<StatisticLine value={average.toFixed(1)} text='average'/>
	<StatisticLine value={positive.toFixed(1)} text='positive'/>
    </>
	)
}

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
	  <Statistics bad={bad} good={good} neutral={neutral}/>
    </div>
  )
}

export default App
