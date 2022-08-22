import React, { useState } from "react";
import { postData } from "../../gateway/gateWay";
import { getDateTime } from "../../utils/dateUtils";
import "./modal.scss";

function Modal({ setModalVisibility, modalData, loadEvents }) {
  const [formData, setState] = useState(modalData);
  const { title, date, startTime, endTime, description } = formData;
  // console.log(formData);

  const handleChange = (event) => {
    setState({ ...formData, [event.target.name]: event.target.value });
  };

  function formValidityCheck() {
    if (
      title &&
      date &&
      startTime &&
      endTime &&
      startTime.split(":").join("") < endTime.split(":").join("")
    ) {
      return true;
    }
    return false;
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

      postData(dataToPut).then(loadEvents()).then(onClose());
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
              required="required"
            />
            <div className="event-form__time">
              <input
                type="date"
                name="date"
                className="event-form__field"
                onChange={handleChange}
                value={formData.date}
                required="required"
              />
              <input
                type="time"
                name="startTime"
                className="event-form__field"
                onChange={handleChange}
                required="required"
                value={formData.startTime}
              />
              <span>-</span>
              <input
                type="time"
                name="endTime"
                className="event-form__field"
                onChange={handleChange}
                value={formData.endTime}
                required="required"
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

export default Modal;
