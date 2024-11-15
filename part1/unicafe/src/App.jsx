import { useState } from 'react'
import Heading from './Component/Heading'
import Button from './Component/Button'
import Statistics from './Component/Statistics'

const App =()=>{
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [totalFeedback, setTotalFeedback]=useState(0)

  const handleGoodFeedback=()=>{
    setGood(good + 1)
    setTotalFeedback(totalFeedback+1)
  }
  const handleNeutralFeedback=()=>{
    setNeutral(neutral + 1)
    setTotalFeedback(totalFeedback+1)
  }
  const handleBadFeedback=()=>{
    setBad(bad + 1)
    setTotalFeedback(totalFeedback+1)
  }

  return ( 
    <div>
      <Heading heading={"give feedback"}/>
      <Button text={"good"} handle={handleGoodFeedback}/>
      <Button text={"neutral"} handle={handleNeutralFeedback}/>
      <Button text={"bad"} handle={handleBadFeedback}/>
      <Heading heading={"statistics"}/>
      <Statistics good={good} bad={bad} neutral={neutral} totalFeedback={totalFeedback}/>
    </div>
  )
}

export default App