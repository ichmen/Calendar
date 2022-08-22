import React from "react";
import { useState } from "react";
import { deleteData } from "../../gateway/gateWay";

import "./event.scss";

const Event = ({ height, marginTop, title, time, id, loadEvents }) => {
  const [isDelBtnVisible, setDelVisibility] = useState(false);

  const eventStyle = {
    height,
    marginTop,
  };

  const deButtonStyle = {
    top: height - 5,
    marginLeft: "auto",
  };
  const onClick = () => {
    setDelVisibility(!isDelBtnVisible);
  };
  const deleteHandler = () => {
    deleteData(id).then(loadEvents());
  };

  return (
    <div style={eventStyle} className="event" onClick={onClick}>
      <div className="event__title">{title}</div>
      <div className="event__time">{time}</div>
      {isDelBtnVisible && (
        <button
          style={deButtonStyle}
          className="delete-event-btn"
          onClick={deleteHandler}
        >
          <i className="fa fa-trash" aria-hidden="true"></i>DELETE
        </button>
      )}
    </div>
  );
};

export default Event;
