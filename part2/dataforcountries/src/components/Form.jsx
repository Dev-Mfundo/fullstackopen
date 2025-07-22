const Form=({country,handleChange})=>{
	return(
	<>
	find countries {" "}<input type="text" id="select-country" value={country} onChange={handleChange}/>
	</>
	)
}

export default Form