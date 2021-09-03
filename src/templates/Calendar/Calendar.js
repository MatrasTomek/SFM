import React, { useState, useEffect } from "react";
import { AsideMenu, Button, DayOfCalendar } from "../../components";
import { MONTH } from "../../helpers/dates";
import styles from "./calendar.module.scss";

const CalendarApp = () => {
  const [presentYear, setPresentYear] = useState("");
  const [presentMonth, setPresentMonth] = useState("");
  const [presentDay, setPresentDay] = useState("");

  const [isModalDayOpen, setIsModalDayOpen] = useState(false);

  const handleYearUp = () => {
    setPresentYear(presentYear + 1);
  };
  const handleYearDown = () => {
    setPresentYear(presentYear - 1);
  };
  const handleMonthUp = () => {
    setPresentMonth(presentMonth + 1);
  };
  const handleMonthDown = () => {
    setPresentMonth(presentMonth - 1);
  };

  const handleVievWeek = () => {};
  const handleVievMonth = () => {};

  useEffect(() => {
    const takeYear = new Date().getFullYear();
    const takeMonth = new Date().getMonth();
    const takeDay = new Date().getDate();
    setPresentYear(takeYear);
    setPresentMonth(takeMonth);
    setPresentDay(takeDay);
  }, []);

  const setDaysInMonth = (month = presentMonth + 1, year = presentYear) => {
    return new Date(year, month, 0).getDate();
  };
  const daysInMonth = setDaysInMonth();

  const monthlyDays = [];

  const setUpMonthlyDays = () => {
    for (let i = 1; i <= daysInMonth; i++) {
      const dateInfo = {
        day: i,
        month: presentMonth,
        year: presentYear,
        daysInMonth: daysInMonth,
      };
      monthlyDays.push(dateInfo);
    }
  };
  setUpMonthlyDays();

  const vievOfCalendarDays = monthlyDays.map((item) => (
    <div key={item.day} className={styles.day}>
      <DayOfCalendar
        isModalOpen={isModalDayOpen}
        setIsModalOpen={setIsModalDayOpen}
        infoAboutDay={item}
      />
    </div>
  ));

  function resetMonthAndYear() {
    if (presentMonth > 11) {
      setPresentMonth(0);
      setPresentYear(presentYear + 1);
    } else if (presentMonth < 0) {
      setPresentMonth(11);
      setPresentYear(presentYear - 1);
    }
  }
  resetMonthAndYear();

  const vievOfMonth = MONTH[presentMonth];

  return (
    <div className={styles.wrapper}>
      <div className={styles.inside}>
        <div className={styles.navigation}>
          <div className={styles.update}>
            <Button name="rok-" type="button" onClick={handleYearDown} />
            <Button name="miesiąc-" type="button" onClick={handleMonthDown} />
            <Button name="miesiąc+" type="button" onClick={handleMonthUp} />
            <Button name="rok+" type="button" onClick={handleYearUp} />
          </div>
          <div className={styles.vievs}>
            <Button
              name="widok tydzień"
              type="button"
              onClick={handleVievWeek}
            />
            <p> {vievOfMonth}</p>
            <p> {presentYear}</p>
            <Button
              name="widok miesiąc"
              type="button"
              onClick={handleVievMonth}
            />
          </div>
        </div>
        <div className={styles.calendarDays}>{vievOfCalendarDays}</div>
      </div>

      <AsideMenu />
    </div>
  );
};

export default CalendarApp;
