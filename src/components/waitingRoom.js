import React, {Fragment, useState, useEffect} from "react";
import { Link } from "react-router-dom";

const WaitingRoom = ({setAuth, concurrentUsers}) => {

    
    const [waitTime, setWaitTime] = useState(30);
    

    
    async function getWaitTime() {
        try {
            const response = await fetch('http://localhost:5000/waitime',{
                method: "GET",
                headers: {token : localStorage.token}
            });
            const parseResponse = await response.json(); //returns a name
            setWaitTime(parseResponse);
            
        } catch (error) {
            console.error(error.message);
        }
    }
    const logout = (e) => {
        e.preventDefault()
        localStorage.removeItem("token");
        setAuth(false);
    }
    useEffect(() => {
        
    },[])
    return(
        <Fragment>
            <h1  className="text-center my-5">Waiting Room</h1>
            <h1>Place in line: {concurrentUsers}</h1>
            <h1>Time Remaining: {waitTime}</h1>
            <button className="btn btn-danger my-5" onClick={(e) => logout(e)}> Cancel </button>
        </Fragment>
    );
};

export default WaitingRoom;