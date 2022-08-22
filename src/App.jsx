import React, { useState, useEffect } from "react";
import moment from "moment";
import Header from "./components/header/Header.jsx";
import Calendar from "./components/calendar/Calendar.jsx";
import Modal from "./components/modal/Modal.jsx";
import { getData } from "./gateway/gateWay.js";
import {
  getWeekStartDate,
  generateWeekRange,
  months,
} from "../src/utils/dateUtils.js";

import "./common.scss";

function App() {
  const emptyModalData = {
    description: "",
    date: "",
    startTime: "",
    endTime: "",
    title: "",
  };

  const [weekStartDate, changeState] = useState(new Date());
  const [isModalVisible, setModalVisibility] = useState(false);
  const weekDates = generateWeekRange(getWeekStartDate(weekStartDate));
  const [modalData, setModalData] = useState(emptyModalData);

  const [eventList, setEventList] = useState([]);

  const loadEvents = () => {
    getData().then((data) => setEventList(data));
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const month = [
    ...new Set(weekDates.map((date) => months[date.getMonth()])),
  ].join("-");

  const modalHandle = (modalVisability, data = emptyModalData) => {
    setModalVisibility(modalVisability);
    setModalData(data);
  };

  const setToday = () => {
    changeState(new Date());
  };

  const weekChange = (days) => {
    let newDate = new Date(weekStartDate);
    changeState(new Date(newDate.setDate(newDate.getDate() + days)));
  };

  return (
    <>
      <Header
        month={month}
        setToday={setToday}
        weekChange={weekChange}
        setModalVisibility={modalHandle}
      />
      <Calendar
        weekDates={weekDates}
        setModalVisibility={modalHandle}
        eventList={eventList}
        loadEvents={loadEvents}
      />
      {isModalVisible && (
        <Modal
          setModalVisibility={modalHandle}
          modalData={modalData}
          loadEvents={loadEvents}
        />
      )}
    </>
  );
}

export default App;
