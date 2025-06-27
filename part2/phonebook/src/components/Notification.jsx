const Notification=({message})=>{
	if(message===null)return
	return(
		<>
		<div class="success-message">{message}</div>
		</>
		)
}

export default Notification