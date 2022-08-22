import React from "react";
import PropTypes from "prop-types";
import "./header.scss";

const Header = ({ month, setToday, weekChange, setModalVisibility }) => {
  const newTask = () => {
    setModalVisibility(true);
  };

  return (
    <header className="header">
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

Header.propTypes = {
  month: PropTypes.string,
  setToday: PropTypes.func,
  weekChange: PropTypes.func,
  setModalVisibility: PropTypes.func,
};

export default Header;
