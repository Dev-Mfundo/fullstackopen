const Header=()=>{
  return(
  <>
  <h1>Web development curriculum</h1>
  </>
  )
}
const SubHeader=({course})=>{
	return(
	<>
	<h2>{course}</h2>
	</>
	)
}
const Part=({content})=>{
	return(
	<>
	{content.map(part=>{
		return <p key={part.id}>{part.name} {part.exercises}</p>
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

const Course =({courses})=>{
	return(
	<>
  <Header/>
    {courses.map((course)=>
    <div key={course.id}>
      <SubHeader course={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
    )}
    </>
	)	
}

export default Course