import React from "react";
import "./modal.css";

function Modal({ setOpenModal }) {

  const handleBuyAgain = () => {
    window.location.replace('/waitingroom');
  }
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            X
          </button>
        </div>
        <div className="title">
          <h1>Checkout Complete</h1>
        </div>
        <div className="body">
          <p>Hope to see you back soon!</p>
        </div>
        <div className="footer">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
            id="cancelBtn"
          >
            OK
          </button>
          <button
            onClick={handleBuyAgain}
          >
            Buy Again?
          </button>
          </div>
      </div>
    </div>
  );
}

export default Modal;