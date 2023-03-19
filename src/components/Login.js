import React, {Fragment, useState} from "react";
import { Link } from "react-router-dom"

const Login = ({setAuth}) => {

    const [inputs, setInputs] = useState({
        username: " ",
        password: ""
    
    });

    const {username, password} = inputs;

    const onChange = (e) => {
        setInputs({...inputs, [e.target.name] : e.target.value})
    };

    const onSubmitForm = async (e) => {
        e.preventDefault()
        const token = localStorage.token;
        try {
            const body = {username, password, token}

            const response = await fetch("https://flutter-app-api.onrender.com/signin",
                {
                    method: "POST",
                    headers: {"Content-Type" : "application/json"},
                    body: JSON.stringify(body)
                }
            );

            const parseResponse = await response.json();
            console.log("login",parseResponse.token);
            //if (!localStorage.token){
                localStorage.setItem("token", parseResponse.token);    
            //}
            
            setAuth(true);
            
        } catch (error) {
            console.error(error.message)
            
        }
    }

    return(
        <Fragment>
            <h1 className="text-center my-5">Login</h1>
            <form onSubmit={onSubmitForm}>
                <input
                type="email" 
                name="username" 
                placeholder="email" 
                className="form-control my-3" 
                value={username}
                onChange = {e => onChange(e)}
                />
                <input 
                type="password"
                name="password"
                placeholder="password"
                className="form-control my-3"
                value={password}
                onChange = {e => onChange(e)}
                />
                <button className="btn btn-success btn-block" > Login </button>
            </form>
            <Link to="../register"> Register </Link> 
        </Fragment>
    );
};

export default Login;