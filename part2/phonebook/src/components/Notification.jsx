const Notification=({message})=>{
	let notification;
	if(message===null)return
	if(message.success){
		notification=message.success
		return <div className="success-message">{notification}</div>
	}
	if(message.error){
		notification=message.error
		return<div className="error-message">{notification}</div>
	}
	return null
}

export default Notification