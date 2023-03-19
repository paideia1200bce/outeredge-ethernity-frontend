import React, {Fragment, useState, useEffect} from "react";
import { Link } from "react-router-dom"
import Modal from "./modal/modal.js";
const Checkout = ({setAuth}) => {

    const [time, setTimer] = useState('');
    const [checkoutSuccess, setCheckoutSuccess] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

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

    return(
        <Fragment>
            <h1>Checkout</h1>
            <button
                className="openModalBtn"
                onClick={() => {
                    setModalOpen(true);
                }}
                >
                Open
                </button>

                <button onClick={logout}>Logout</button>

      {modalOpen && <Modal setOpenModal={setModalOpen} />}
        </Fragment>
    );
};

export default Checkout;