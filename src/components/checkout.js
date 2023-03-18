import React, {Fragment, useState, useEffect} from "react";
import { Link } from "react-router-dom"

const Checkout = ({setAuth}) => {

    const [time, setTimer] = useState('');
    const [checkoutSuccess, setCheckoutSuccess] = useState(false);
    
    async function getTime() {
        try {
            const response = await fetch('http://localhost:5000/dashboard',{
                method: "GET",
                headers: {token : localStorage.token}
            });
            const parseResponse = await response.json(); //returns a name
            setTimer(parseResponse);
            
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
    const handleCheckout = () => {
        //verify info here before checkout
        console.log("modal")
        setCheckoutSuccess(true);
        };
    return(
        <Fragment>
            <h1>Checkout</h1>
            <button className="btn btn-success btn-block my-5" onClick={handleCheckout}> Checkout </button>
            <button className="btn btn-primary my-5" onClick={(e) => logout(e)}> Logout </button>
            { (
                    <div className="modal">
                    <div className="modal-content">
                        <p>Congratulations! Your checkout was successful.</p>
                    </div>
                    </div>
                )
            }
        </Fragment>
    );
};

export default Checkout;