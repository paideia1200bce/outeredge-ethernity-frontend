
import { Fragment, useState, useEffect } from 'react';
import './App.css';
//import axios from 'axios';
import {BrowserRouter as Router,
   Routes,
   Route,
   Navigate
} from "react-router-dom";

//components
import Login from "./components/Login";
import Register from "./components/Register";
import WaitingRoom from "./components/waitingRoom";
import Checkout from "./components/checkout";
import LoginForm from "./components/testlogin/Login.js";

function App() {

  const [isAuth,setIsAuth] = useState(false);
  const [isWaiting, setIsWaiting] = useState(true);
  const [concurrentUsers, setConcurrentUsers] = useState(26);
  const setAuth = boolean => {
    setIsAuth(boolean)
  }

  async function checkAuth() {
    try {
      const response = await fetch("https://flutter-app-api.onrender.com/auth", 
      //await fetch("http://localhost:5000/auth/is-verify",
        {
          method: "Get",
          headers: 
          {
            
            "Authorization": `Bearer ${localStorage.token}`
          }
           
        }
      );
      const parseResponse = await response.json();
      
      console.log("auth_bool:",parseResponse.message);
      console.log("localToken:",localStorage.token);
      parseResponse.message === true ? setAuth(true) : setAuth(false);
      
    } catch (error) {
      console.error(error.message);
    }
    
  }
  async function checkWaitingRoom() {
    try {
        const response = await fetch('https://flutter-app-api.onrender.com/waitlist',{
            method: "GET",
            headers: {
              "Authorization": `Bearer ${localStorage.token}`
            } 
          });
        const parseResponse = await response.json();
        console.log("waiting_bool", parseResponse.waiting); 
        setConcurrentUsers(parseResponse.waiting);
        parseResponse.waiting === true ? setIsWaiting(true) : setIsWaiting(false);
    } catch (error) {
        console.error(error.message);
    }
}  
async function getConcurrentUsers() {
  try {
      const response = await fetch('http://localhost:5000/dashboard',{
          method: "GET",
          headers: {token : localStorage.token}
      });
      const parseResponse = await response.json(); //returns a name
      setConcurrentUsers(parseResponse);
      
  } catch (error) {
      console.error(error.message);
  }
}  
  useEffect(() => {
    
    checkAuth();
});
  /*
  useEffect(() => {
    checkWaitingRoom();
  },[isAuth]);
*/
  return (
    <>
      <Router>
        <div className='container'>
          <Routes>
            <Route exact path="/login" element={!isAuth ? <Login setAuth ={setAuth}/> : concurrentUsers > 25 ? <Navigate to="/waitingroom"/> : <Navigate to="/checkout"/>  } />
            <Route exact path="/register"  element={!isAuth ? <Register setAuth ={setAuth} /> : <Navigate to = "/testlogin"/>} />
            <Route exact path="/waitingroom"  element={isAuth  ? isWaiting ? <WaitingRoom setAuth ={setAuth} concurrentUsers={concurrentUsers}/> : <Navigate to="/checkout"/> :  <Navigate to = "/testlogin"/>} />
            <Route exact path="/checkout"  element={ isAuth ? <Checkout setAuth = {setAuth} /> : <Navigate to = "/testlogin"/>} />
            <Route exact path="/testlogin" element={!isAuth ? <LoginForm setAuth ={setAuth}/> : concurrentUsers >25 ? <Navigate to="/waitingroom"/> : <Navigate to="/checkout"/>  } />
            <Route exact path="/testwait" element={<WaitingRoom concurrentUsers={concurrentUsers}/>} />
          
          </Routes>
        </div>
      </Router>
    </>
  );
}
/*
            <Route exact path="/login" element={!isAuth ? <Login setAuth ={setAuth}/> : isWaiting ? <Navigate to="/waitingroom"/> : <Navigate to="/checkout"/>  } />
            <Route exact path="/register"  element={!isAuth ? <Register setAuth ={setAuth} /> : <Navigate to = "/testlogin"/>} />
            <Route exact path="/waitingroom"  element={isAuth  ? isWaiting ? <WaitingRoom setAuth ={setAuth} concurrentUsers={setConcurrentUsers}/> : <Navigate to="/checkout"/> :  <Navigate to = "/testlogin"/>} />
            <Route exact path="/checkout"  element={ isAuth ? <Checkout setAuth = {setAuth} /> : <Navigate to = "/testlogin"/>} />
            <Route exact path="/testlogin" element={!isAuth ? <LoginForm setAuth ={setAuth}/> : isWaiting ? <Navigate to="/waitingroom"/> : <Navigate to="/checkout"/>  } />
          */
export default App;
