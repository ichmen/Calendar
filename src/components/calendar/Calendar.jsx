import React, { useState, useEffect } from "react";

import Navigation from "./../navigation/Navigation";
import Week from "../week/Week";
import Sidebar from "../sidebar/Sidebar";
import events from "../../gateway/events";
import { isTodayDisplayed } from "../../utils/dateUtils";
import { getData } from "../../gateway/gateWay";

import "./calendar.scss";

function Calendar({ setModalVisibility, weekDates, eventList, loadEvents }) {
  // const [eventList, setEventList] = useState([]);
  // const loadEvents = async () => {
  //   await getData().then((data) => setState(data));
  // };

  // useEffect(async () => {
  //   loadEvents();
  // }, []);
  // console.log("calendar", eventList);

  useEffect(() => {
    if (isTodayDisplayed(weekDates)) {
      drawLine();
      const drawInterval = setInterval(() => {
        drawLine();
      }, 60000);
      return function () {
        clearInterval(drawInterval);
      };
    }
  });

  function drawLine() {
    const todayDay = new Date();
    const todayElement = document.querySelector(
      `div[data-day='${String(todayDay.getDate())}']`
    );
    const lineToRemove = document.querySelector(".red-line");
    if (lineToRemove) {
      lineToRemove.remove();
    }
    const line = document.createElement("hr");
    const offset = todayDay.getHours() * 60 + todayDay.getMinutes() - 1440;
    line.classList.add("red-line");
    line.style.top = `${offset}px`;
    todayElement.append(line);
  }
  if (!eventList) {
    return null;
  }

  return (
    <section className="calendar">
      <Navigation weekDates={weekDates} />
      <div className="calendar__body">
        <div className="calendar__week-container">
          <Sidebar />
          <Week
            weekDates={weekDates}
            events={eventList}
            setModalVisibility={setModalVisibility}
            loadEvents={loadEvents}
          />
        </div>
      </div>
    </section>
  );
}

export default Calendar;
