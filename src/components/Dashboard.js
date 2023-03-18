import React, {Fragment, useState, useEffect} from "react";
import { Link } from "react-router-dom"
import ChatOutput from './chatOutput';
const Dashboard = ({setAuth}) => {

    const [name, setName] = useState('');
    
    async function getName() {
        try {
            const response = await fetch('http://localhost:5000/dashboard',{
                method: "GET",
                headers: {token : localStorage.token}
            });
            const parseResponse = await response.json(); //returns a name
            setName(parseResponse);
            
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
        getName()
    },[])
    return(
        <Fragment>
            <h1>{name}'s Cart</h1>
            <Link className="btn btn-success btn-block my-5" to="../waitingroom"> Purchase </Link>
            <button className="btn btn-primary my-5" onClick={(e) => logout(e)}> Logout </button>
        </Fragment>
    );
};

export default Dashboard;