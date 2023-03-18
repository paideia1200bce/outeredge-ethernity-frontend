import React, {Fragment, useState} from "react";
import { Link } from "react-router-dom"

const Login = ({setAuth}) => {

    const [inputs, setInputs] = useState({
        user_email: " ",
        user_password: ""
    
    });

    const {user_email, user_password} = inputs;

    const onChange = (e) => {
        setInputs({...inputs, [e.target.name] : e.target.value})
    };

    const onSubmitForm = async (e) => {
        e.preventDefault()
        try {
            const body = {user_email, user_password}

            const response = await fetch("http://localhost:5000/auth/login",
                {
                    method: "POST",
                    headers: {"Content-Type" : "application/json"},
                    body: JSON.stringify(body)
                }
            );

            const parseResponse = await response.json();
            console.log(parseResponse);
            localStorage.setItem("token", parseResponse.token);
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
                name="user_email" 
                placeholder="email" 
                className="form-control my-3" 
                value={user_email}
                onChange = {e => onChange(e)}
                />
                <input 
                type="password"
                name="user_password"
                placeholder="password"
                className="form-control my-3"
                value={user_password}
                onChange = {e => onChange(e)}
                />
                <button className="btn btn-success btn-block" > Login </button>
            </form>
            <Link to="../register"> Register </Link> 
        </Fragment>
    );
};

export default Login;