const Header=({title})=>{

  return(
    <h1>{title}</h1>
  )
}
const Part=({parts})=>{
  return(
    <>
      <p>{parts[0].name} {parts[0].exercises}</p>
      <p>{parts[1].name} {parts[1].exercises}</p>
      <p>{parts[2].name} {parts[2].exercises}</p>
    </>
  )
}

const Total=({exercises})=>{
  return(
    <>
    <p>Number of exercises {exercises[0].exercises + exercises[1].exercises + exercises[2].exercises}</p>
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
      }
    ]
  }

  return (
    <div>
      <Header title={course.name}/>
      <Part parts={course.parts}/>
      <Total exercises={course.parts}/>
    </div>
  )
}

export default App
