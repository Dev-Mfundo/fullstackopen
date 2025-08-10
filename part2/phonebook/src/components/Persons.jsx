const Persons=({filtered, handleDelete})=>{
	if (!Array.isArray(filtered)) return null
	return(
	<>
	{filtered.map((person)=>(
		<div key={person.id}>
		{person.name} {person.number} <button onClick={()=>handleDelete(person.id)}>delete</button>
		</div>
		))}
	</>
	)
}

export default Persons