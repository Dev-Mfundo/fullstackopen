import { useState } from 'react'

const Button=({onClick,type})=><button onClick={onClick}>{type}</button>
const Content=({heading,anecdotes,selected,votes})=>{
	return(
	<>
	<h2>{heading}</h2>
	{anecdotes[selected]}
	<div>has {votes[selected]} votes</div>
	</>
	)
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
    const [selected, setSelected] = useState(0)
    const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

    const nextAnecdote=()=>{
		const next = Math.floor(Math.random() * anecdotes.length)
		setSelected(next)
	} 
    const voteAnecdotes=()=>{
		const copy = [...votes]
		copy[selected] +=1
		setVotes(copy)
	}
	
	const mostVoted =()=>{
		const maxNum = Math.max(...votes)
		return votes.indexOf(maxNum)
	}
	
  return (
    <div>
	  <Content heading='Anecdotes of the day' anecdotes={anecdotes} selected={selected} votes={votes}/>
	  <Button onClick={voteAnecdotes} type="vote"/>
      <Button onClick={nextAnecdote} type="next anecdotes"/>
      <Content heading='Anecdotes with the most votes' anecdotes={anecdotes} selected={mostVoted()} votes={votes}/>
    </div>
  )
}

export default App