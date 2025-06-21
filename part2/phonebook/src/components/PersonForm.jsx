const PersonForm=({onSubmit,onChange,nameValue,numberValue})=>{
	return(
	<>
	<form  onSubmit={onSubmit}>
        <div>
          name: <input name="name" type="text" placeholder="name" onChange={onChange} value={nameValue}/><br/>
          number: <input name="phone-number" type="tel" placeholder="phone number" onChange={onChange} value={numberValue}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
    </form>
	</>
	)
}

export default PersonForm