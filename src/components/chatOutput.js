import React, { Fragment, useState } from "react";


const ChatOutput = ({setAuth}) => {

    const [message, setMessage] = useState('');
    
    const HandleMulChoiceBut = async (e, choice) => {
        e.preventDefault();
        
        try {
       
                await fetch(`http://localhost:5000/chat/choice`,{
                    method: "POST",
                    headers: {
                        'Content-Type' : 'application/json'
                    },
                    body: JSON.stringify( {message: choice} ), 
                })
                .then((res) => res.json())
                .then((data) => setMessage(data.message));
                
                console.log(message);
              
        } catch (error) {
            console.error(error.message);
        }
    }
     
    const handleStartButton = async (e) => {
        e.preventDefault();
        try {
      
                await fetch(`http://localhost:5000/chat/start`,{
                    method: "POST",
                    headers: {
                        'Content-Type' : 'application/json'
                    },
                    
                })
                .then((res) => res.json())
                .then((data) => setMessage(data.message));
                console.log(message);
              
        } catch (error) {
            console.error(error.message);
        }
      
    }
    return <Fragment>
    
    <form className="mt-5" onSubmit={HandleMulChoiceBut}>

        <button className="btn btn-success btn-block my-5" onClick={(e) => handleStartButton(e)}>START</button>
        <pre className="text-left mt-5" >{message}</pre> 
        <button className="btn btn-secondary btn-lg col-2 m-3" onClick={(e) => HandleMulChoiceBut(e, 'A')}>A</button>
        <button className="btn btn-secondary btn-lg col-2 m-3" onClick={(e) => HandleMulChoiceBut(e, 'B')}>B</button>
        <button className="btn btn-secondary btn-lg col-2 m-3" onClick={(e) => HandleMulChoiceBut(e, 'C')}>C</button>  

    </form>
    </Fragment>
}

export default ChatOutput