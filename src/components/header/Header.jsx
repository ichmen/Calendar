import React, { useState } from "react";

import "./header.scss";
import Modal from "../modal/Modal";

const Header = ({ month, setToday, weekChange, setModalVisibility }) => {
  // const [isModalVisible, setModalVisibility] = useState(false);
  const newTask = () => {
    setModalVisibility(true);
  };
  const closeModal = () => {
    setModalVisibility(false);
  };
  return (
    <header className="header">
      {/* <Modal onClose={closeModal} isModalVisible={isModalVisible} /> */}
      <button className="button create-event-btn" onClick={() => newTask()}>
        <i className="fas fa-plus create-event-btn__icon"></i>
        Create
      </button>
      <div className="navigation">
        <button
          className="navigation__today-btn button"
          onClick={() => setToday()}
        >
          Today
        </button>
        <button className="icon-button navigation__nav-icon">
          <i className="fas fa-chevron-left" onClick={() => weekChange(-7)}></i>
        </button>
        <button className="icon-button navigation__nav-icon">
          <i className="fas fa-chevron-right" onClick={() => weekChange(7)}></i>
        </button>
        <span className="navigation__displayed-month">{month}</span>
      </div>
    </header>
  );
};

export default Header;
