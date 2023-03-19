import React, {Fragment, useState} from "react";
import { Link } from "react-router-dom"

const Register = ({setAuth}) => {
    const [inputs, setInputs] = useState({
        username: " ",
        password: "",
        queue_id: '1'
    })
     
    const {username, password, queue_id} = inputs;
    const onChange = (e) => {
        setInputs({...inputs, [e.target.name] : e.target.value})
    }

    const onSubmitForm = async (e) => {
        e.preventDefault()
        try {
            const body = {username, password, queue_id}
 
            const response = //await fetch("https://localhost:5000/auth/register", 
            await fetch("https://flutter-app-api.onrender.com/signup",
                {
                    method: "POST",
                    headers: {"Content-Type" : "application/json"},
                    body: JSON.stringify(body)
                }
            );

            const parseResponse = await response.json();
            console.log(parseResponse);
            //localStorage.setItem("token", parseResponse.token);
            setAuth(true);

        } catch (error) {
            console.error(error.message)
        }
    }
    return(
        <Fragment>
            <h1 className="text-center my-5">Register</h1>
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
                
                <button className="btn btn-success btn-block"> Submit </button>
            </form>
            <Link to="../login"> Login </Link>
        </Fragment>
    );
};

export default Register;