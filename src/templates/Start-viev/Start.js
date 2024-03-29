import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  clearSubcontarctor,
  getAllEvents,
  getEurRates,
  getUsdRates,
} from "../../data/actions";
import styles from "./start.module.scss";

const Start = () => {
  const events = useSelector((store) => store.event);
  const currency = useSelector((store) => store.currency);

  const history = useHistory();

  const euroRate =
    currency.length < 2
      ? ""
      : currency[0].mid > currency[1].mid
      ? currency[0].mid
      : currency[1].mid;

  const usdRate =
    currency.length < 2
      ? ""
      : currency[0].mid < currency[1].mid
      ? currency[0].mid
      : currency[1].mid;

  const dispatch = useDispatch();

  const now = new Date();
  const presentDay = now.toLocaleDateString();

  const [time, setTime] = useState("");

  useEffect(() => {
    const clock = setInterval(() => {
      const now = new Date();
      const time = now.toLocaleTimeString();
      setTime(time);
    });
    return () => clearInterval(clock);
  }, []);

  useEffect(() => {
    dispatch(getAllEvents());
    dispatch(getEurRates());
    dispatch(getUsdRates());
  }, []);

  const handleGoToEvents = () => {
    history.push("./calendar");
  };

  const handleClearState = () => {
    dispatch(clearSubcontarctor());
  };

  const closetsEventSelector = events.map((item) =>
    item.eventStart === presentDay && item.isImportant && !item.isDone ? (
      Number(item.hrsStart[0] + item.hrsStart[1]) > Number(time[0] + time[1]) &&
      Number(item.hrsStart[0] + item.hrsStart[1]) <=
        Number(time[0] + time[1]) + 4 ? (
        <div key={item._id} onClick={handleGoToEvents}>
          <p>{item.eventName}</p>
          <p>{item.hrsStart}</p>
        </div>
      ) : (
        ""
      )
    ) : (
      false
    )
  );

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <div className={styles.day}>
          <p>{presentDay}</p>
          <p>{time}</p>
        </div>
        <div className={styles.data}>
          <p>Kurs Euro: {euroRate}pln</p>
          <p>Kurs Dolara: {usdRate}pln</p>
        </div>
        <div className={styles.event}>
          <p>Najbliższe zdarzenia:</p>
          {closetsEventSelector}
        </div>
      </header>
      <div className={styles.boxes}>
        <Link to="/calendar">
          <div className={styles.box}>
            <p>terminarz</p>
          </div>
        </Link>
        <Link to="/add-subcontractor" onClick={handleClearState}>
          <div className={styles.box}>
            <p>dodaj klienta</p>
          </div>
        </Link>
        <Link to="/find-subcontractor" onClick={handleClearState}>
          <div className={styles.box}>
            <p>wyszukaj klienta</p>
          </div>
        </Link>
        <Link to="/statistics">
          <div className={styles.box}>
            <p>dopasuj klienta</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Start;
