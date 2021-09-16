import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllEvents } from "../../data/actions";
import {
  currencyValueEUR,
  currencyValueUSD,
} from "../../helpers/currencyValue";

import styles from "./start.module.scss";

const Start = () => {
  const events = useSelector((store) => store.events);

  const dispatch = useDispatch();

  const [time, setTime] = useState({});

  const [loadedEvents, setLoadedEvents] = useState([]);

  const [currEUR, setCurrEUR] = useState(false);

  const takeCurrencyRates = async () => {
    const currEUR = currencyValueEUR();
    await setCurrEUR(currEUR);
  };
  console.log(currEUR);

  const now = new Date();
  const presentDay = now.toLocaleDateString();

  const showTime = () => {
    const now = new Date();
    setTime({ hrs: now.getHours(), min: now.getMinutes() });
  };
  useEffect(() => {
    dispatch(getAllEvents());
    showTime();
    takeCurrencyRates();
  }, []);

  useEffect(() => {
    setLoadedEvents(events);
  }, [events]);

  // setInterval(() => {
  //   showTime();
  // }, 60000);
  // clearInterval();

  console.log(!loadedEvents ? "" : loadedEvents.event);
  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <div className={styles.day}>
          <p>{presentDay}</p>
          <p>
            {time.hrs}:{time.min}
          </p>
        </div>
        <div className={styles.data}>
          <p>{!currEUR ? "" : currEUR[0].mid}</p>
        </div>
        <div className={styles.event}></div>
      </header>
      <div className={styles.boxes}>
        <Link to="/calendar">
          <div className={styles.box}>
            <p>terminarz</p>
          </div>
        </Link>
        <Link to="/add-subcontractor">
          <div className={styles.box}>
            <p>dodaj klienta</p>
          </div>
        </Link>
        <Link to="/find-subcontractor">
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
