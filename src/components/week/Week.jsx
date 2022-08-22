import React from "react";
import Day from "../day/Day";
import { formatMins } from "../../utils/dateUtils";
import { useEffect } from "react";
import { getData } from "../../gateway/gateWay";
import "./week.scss";

const Week = ({ weekDates, events, setModalVisibility, loadEvents }) => {
  // console.log("week", events);

  const onClick = (event) => {
    // console.log(event);
    if (event.target.className !== "calendar__time-slot") {
      return;
    }
    const startTime = Number(event.target.dataset.time) - 1;
    const day = Number(event.target.parentElement.dataset.day);
    const [date] = weekDates.filter((date) => date.getDate() === day);
    const dateFormated = [
      date.getFullYear(),
      formatMins(date.getMonth() + 1),
      formatMins(date.getDate()),
    ].join("-");

    const dataForEvent = {
      description: "",
      date: dateFormated,
      startTime: `${formatMins(startTime)}:00`,
      endTime: `${formatMins(startTime + 1)}:00`,
      title: "",
    };
    setModalVisibility(true, dataForEvent);
  };

  return (
    <div className="calendar__week" onClick={onClick}>
      {weekDates.map((dayStart) => {
        const dayEnd = new Date(dayStart.getTime()).setHours(
          dayStart.getHours() + 24
        );

        //getting all events from the day we will render
        const dayEvents = events.filter(
          (event) => event.dateFrom > dayStart && event.dateTo < dayEnd
        );

        return (
          <Day
            key={dayStart.getDate()}
            dataDay={dayStart.getDate()}
            dayEvents={dayEvents}
            loadEvents={loadEvents}
          />
        );
      })}
    </div>
  );
};

export default Week;
