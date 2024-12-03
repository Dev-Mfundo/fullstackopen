const Feedback=({message})=>{
    let stmt = null;
        if(message.success === true){
            stmt = <h3 className="feedback">{message.content} </h3>
        }
        if(message.success === false){
            stmt = <h3 className="error">{message.content} </h3>
        }
        return(
            <>
                {stmt}
            </>
        )
}

export default Feedback;