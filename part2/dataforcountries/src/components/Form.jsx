const Form=({country,setCountry})=>{
	const handleChange=(e)=>{
    setCountry(e.target.value)
  }
	return(
	<>
	find countries {" "}<input type="text" id="select-country" value={country} onChange={handleChange}/>
	</>
	)
}

export default Form