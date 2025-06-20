const Header=({course})=>{
	return(
	<>
	<h1>{course}</h1>
	</>
	)
}
const Part=({content})=>{
	return(
	<>
	{content.map(part=>{
		return <p key={part.name}>{part.name} {part.exercises}</p>
	})}
	</>
	)
}
const Content=({parts})=>{
	return(
	<>
	 <Part content={parts}/>
	</>
	)
}
const Total=({parts})=>{
    const total = parts.reduce((sum, part)=>sum + part.exercises,0)
	return(
	<>
	<h4>total of exercises {total}</h4>
	</>
	)
}

const Course =({course})=>{
	return(
	<>
      <Header course={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </>
	)	
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      },
	  {
		name: 'Redux',
        exercises: 11 
	  }
    ]
  }

  return (
    <div>
	<Course course={course}/>
    </div>
  )
}

export default App
