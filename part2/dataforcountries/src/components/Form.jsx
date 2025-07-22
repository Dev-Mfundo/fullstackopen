const Form=({country,setCountry})=>{
	const handleChange=(e)=>{
    const {id, value} = e.target
    setCountry(value)
  }
	return(
	<>
	find countries {" "}<input type="text" id="select-country" value={country} onChange={handleChange}/>
	</>
	)
}

export default Form