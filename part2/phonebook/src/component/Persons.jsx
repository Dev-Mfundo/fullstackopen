const Person=({person:{name,number}, handleRemove,person})=>{
  name = person.name.trim();
  number = person.number.trim().replace(/\D/g, "").replace(/(\d{3})(\d+)/, "$1-$2");
  return (
    <div>
      <h5>
        {name} {number} <button onClick={()=>handleRemove(person.id)}>delete</button>
      </h5>
    </div>
  );
}
const Persons=({persons, handleRemove})=>{
    return(
      <div>
        {persons.map((person)=>{
        return(
          <Person key={person.id} person={person} handleRemove={handleRemove}/>
        )
        })}
      </div>
    )
}

export default Persons;
  