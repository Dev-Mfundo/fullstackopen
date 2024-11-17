const Course=({courses})=>{
    const title = <h1>Web Development Curriculum</h1>;
    const course = courses.map((content)=>{
        return(
        <div key={content.id}>
            <h2 key={content.id}>{content.name}</h2>
            {content.parts.map((part)=><p key={part.id}>{part.name} {part.exercises}</p>)}
            <h3>total of{" "}{content.parts.reduce((sum,curr)=>sum + curr.exercises,0)} exercises
            </h3>
        </div>
        )
    })
    return(
        <div>
        {title}
        {course}
        </div>
    )
}
export default Course;