const PersonForm=({handleChange,handleSubmit,newName,})=>{
    return(
    <div>
    <form onSubmit={handleSubmit}>
        <div>
          name: <input type='text' onChange={handleChange} name='name' value={newName.name}/>
        </div>
        <div>
        <div>
          number: <input type='number' onChange={handleChange} name='number' value={newName.number} />
        </div>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
    </form>
    </div>
    )
}
export default PersonForm;