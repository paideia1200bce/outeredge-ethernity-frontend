
import { Fragment, useState, useEffect } from 'react';
import './App.css';
import {BrowserRouter as Router,
   Routes,
   Route,
   Navigate
} from "react-router-dom";

//components
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Register from "./components/Register";
import WaitingRoom from "./components/waitingRoom";
import Checkout from "./components/checkout";


function App() {

  const [isAuth,setIsAuth] = useState(false);
  const [concurrentUsers, setConcurrentUsers] = useState(24);
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
            {Authorization: { token: localStorage.token } }
        }
      );
      const parseResponse = await response.json();
      
      console.log("auth:",parseResponse);
      parseResponse === true ? setAuth(true) : setAuth(false);
    } catch (error) {
      console.error(error.message);
    }
  }
  useEffect(() => {
    checkAuth();
  });
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

  return (
    <>
      <Router>
        <div className='container'>
          <Routes>
            <Route exact path="/login" element={!isAuth ? <Login setAuth ={setAuth}/>  : <Navigate to="/checkout"/>  } />
            <Route exact path="/register"  element={!isAuth ? <Register setAuth ={setAuth} /> : <Navigate to = "/login"/>} />
            <Route exact path="/dashboard"  element={isAuth ? <Dashboard setAuth ={setAuth}/> : <Navigate to = "/login"/>} />
            <Route exact path="/waitingroom"  element={isAuth ? <WaitingRoom setAuth ={setAuth} concurrentUsers= {concurrentUsers} /> : <Navigate to = "/login"/>} />
            <Route exact path="/checkout"  element={ isAuth ? <Checkout setAuth = {setAuth} /> : <Navigate to = "/login"/>} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
