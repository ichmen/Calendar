import React from "react";
import PropTypes from "prop-types";
import { useState } from "react";
import { deleteData } from "../../gateway/gateWay";

import "./event.scss";

const Event = ({
  height,
  marginTop,
  title,
  time,
  id,
  loadEvents,
  dateFrom,
}) => {
  const [isDelBtnVisible, setDelVisibility] = useState(false);
  const fifteenMins = 1000 * 60 * 15;
  const eventStyle = {
    height,
    marginTop,
  };

  const delButtonStyle = {
    top: height - 5,
    marginLeft: "auto",
  };
  const onClick = () => {
    if (isDeletable()) {
      setDelVisibility(!isDelBtnVisible);
    }
  };
  const deleteHandler = () => {
    deleteData(id).then(loadEvents);
  };
  const isDeletable = () => {
    return dateFrom - new Date() <= fifteenMins;
  };

  return (
    <div style={eventStyle} className="event" onClick={onClick}>
      <div className="event__title">{title}</div>
      <div className="event__time">{time}</div>
      {isDelBtnVisible && (
        <button
          style={delButtonStyle}
          className="delete-event-btn"
          onClick={deleteHandler}
        >
          <i className="fa fa-trash" aria-hidden="true"></i>DELETE
        </button>
      )}
    </div>
  );
};

Event.propTypes = {
  height: PropTypes.number,
  marginTop: PropTypes.number,
  title: PropTypes.string,
  time: PropTypes.string,
  id: PropTypes.string,
  loadEvents: PropTypes.func,
  dateFrom: PropTypes.object,
};

export default Event;
