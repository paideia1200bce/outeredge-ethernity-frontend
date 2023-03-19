import React, {Fragment, useState} from "react";
import { Link } from "react-router-dom"
import ReactDOM from "react-dom";
import './Login.css'; 



const LoginForm = ({setAuth}) => {
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
        console.log("login res",parseResponse);
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
      <div id="loginform">
        <FormHeader title="Login" />
        <Form onSubmit={onSubmitForm} onChange = {onChange} value={username}>
          
        </Form>
        
      </div>
    </Fragment>
  )

}

const FormHeader = props => (
  <h2 id="headerTitle">{props.title}</h2>
);
const handleRegister = () => {
 return window.location.replace('/register'); 
}

const Form = props => (
 <form onSubmit={props.onSubmit}>
   <FormInput description="Username" placeholder="Enter your username" type="email" name="username" onChange={props.onChange} />
   <FormInput description="Password" placeholder="Enter your password" type="password" name = "password" onChange={props.onChange} />
   <FormButton title="Log in"/>
   <FormRegButton title="Register" to="/register" />

   
   
 </form>
);
/*
<div style={{ textAlign: "center" }}>
    <Link to="../register"> Register </Link>
</div>
*/
const FormButton = props => (
<div id="button" class="row">
  <button>{props.title}</button>
</div>
);
const FormRegButton = props => (
  <div id="button" class="row">
    <Link to={props.to}>{props.title}</Link>
  </div>
);
const FormInput = props => (
<div class="row">
  <label>{props.description}</label>
  <input type={props.type} name={props.name} placeholder={props.placeholder} onChange={e => props.onChange(e)}/>
</div>  
);

/*
const OtherMethods = props => (
<div id="alternativeLogin">
  <label>Or sign in with:</label>
  <div id="iconGroup">
    <Facebook />
    <Twitter />
    <Google />
  </div>
</div>
);

const Facebook = props => (
<a href="#" id="facebookIcon"></a>
);

const Twitter = props => (
<a href="#" id="twitterIcon"></a>
);

const Google = props => (
<a href="#" id="googleIcon"></a>
);
*/


export default LoginForm;