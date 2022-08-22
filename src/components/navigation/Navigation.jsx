import React from "react";
import classNames from "classnames";

import { days, isToday, isFutureDate } from "../../utils/dateUtils.js";

const Navigation = ({ weekDates }) => {
  return (
    <header className="calendar__header">
      {weekDates.map((dayDate) => {
        return (
          <div
            className={classNames("calendar__day-label", "day-label", {
              "day-label_future": isFutureDate(dayDate),
            })}
            key={dayDate}
          >
            <span
              className={classNames("day-label__day-name", {
                "day-label__day-name_today": isToday(dayDate),
              })}
            >
              {days[dayDate.getDay()]}
            </span>
            <span
              className={classNames("day-label__day-number", {
                "day-label__day-number_today": isToday(dayDate),
              })}
            >
              {dayDate.getDate()}
            </span>
          </div>
        );
      })}
    </header>
  );
};

export default Navigation;
