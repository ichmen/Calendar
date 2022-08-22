import React, { useState } from "react";
import PropTypes from "prop-types";
import { postData } from "../../gateway/gateWay";
import { getDateTime } from "../../utils/dateUtils";
import "./modal.scss";

function Modal({ setModalVisibility, modalData, loadEvents, eventList }) {
  const [formData, setState] = useState(modalData);
  const { title, date, startTime, endTime, description } = formData;
  const eventStartDate = getDateTime(date, startTime);
  const eventEndDate = getDateTime(date, endTime);
  const sixHours = 1000 * 60 * 60 * 6;

  const handleChange = (event) => {
    setState({ ...formData, [event.target.name]: event.target.value });
  };

  function eventCrossing() {
    let timeCrossed = false;

    eventList.forEach(({ dateFrom, dateTo }) => {
      if (
        (eventStartDate <= dateFrom && eventStartDate > dateTo) ||
        (eventEndDate >= dateFrom && eventEndDate < dateTo) ||
        (dateFrom >= eventStartDate && dateTo <= eventEndDate)
      ) {
        timeCrossed = true;
      }
    });
    return timeCrossed;
  }

  function formValidityCheck() {
    const isDataEntered = title && date && startTime && endTime;
    debugger;
    if (!isDataEntered) {
      return false;
    }
    const isTimeQuarter = !(
      startTime.split(":")[1] % 15 && endTime.split(":")[1] % 15
    );

    const timeDirection =
      startTime.split(":").join("") < endTime.split(":").join("");
    const isDuration = eventEndDate - eventStartDate <= sixHours;
    return !eventCrossing() && isTimeQuarter && timeDirection && isDuration;
  }

  const onSubmit = (event) => {
    event.preventDefault();
    if (formValidityCheck()) {
      const dataToPut = {
        title,
        description,
        dateFrom: getDateTime(date, startTime),
        dateTo: getDateTime(date, endTime),
      };

      postData(dataToPut)
        .then(() => loadEvents())
        .then(onClose());
    } else {
      alert("Not all data entered");
    }
  };

  const onClose = () => {
    setModalVisibility(false);
  };

  return (
    <div className="modal overlay">
      <div className="modal__content">
        <div className="create-event">
          <button className="create-event__close-btn" onClick={() => onClose()}>
            +
          </button>
          <form className="event-form">
            <input
              type="text"
              name="title"
              placeholder="Title"
              className="event-form__field"
              onChange={handleChange}
              value={formData.title}
            />
            <div className="event-form__time">
              <input
                type="date"
                name="date"
                className="event-form__field"
                onChange={handleChange}
                value={formData.date}
              />
              <input
                type="time"
                name="startTime"
                className="event-form__field"
                onChange={handleChange}
                value={formData.startTime}
              />
              <span>-</span>
              <input
                type="time"
                name="endTime"
                className="event-form__field"
                onChange={handleChange}
                value={formData.endTime}
              />
            </div>
            <textarea
              name="description"
              placeholder="Description"
              className="event-form__field"
              onChange={handleChange}
            ></textarea>
            <button
              type="submit"
              className="event-form__submit-btn"
              onClick={onSubmit}
            >
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

Modal.propTypes = {
  setModalVisibility: PropTypes.func,
  modalData: PropTypes.object,
  loadEvents: PropTypes.func,
  eventList: PropTypes.array,
};

export default Modal;
