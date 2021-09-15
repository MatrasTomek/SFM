import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  clearSubcontarctor,
  getAllSubcontractors,
  getAllEvents,
} from "../../data/actions";
import { Link } from "react-router-dom";
import styles from "./asideMenu.module.scss";

const AsideMenu = () => {
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);

  const handleClearState = () => {
    dispatch(clearSubcontarctor());
  };

  const handleGetEvents = () => {
    dispatch(getAllEvents());
  };

  const handleOpenCloseMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div
      className={styles.wrapper}
      style={{ left: `${isOpen ? "0" : "-180px"}` }}
    >
      <div className={styles.tap} onClick={handleOpenCloseMenu}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          enableBackground="new 0 0 24 24"
          height="24px"
          viewBox="0 0 24 24"
          width="24px"
          fill="rgb(216, 145, 2)"
          style={{
            transform: `${isOpen ? "rotate(-180deg)" : "rotate(0deg)"}`,
          }}
        >
          <g>
            <rect fill="none" height="24" width="24" />
          </g>
          <g>
            <g>
              <polygon points="15.5,5 11,5 16,12 11,19 15.5,19 20.5,12" />
              <polygon points="8.5,5 4,5 9,12 4,19 8.5,19 13.5,12" />
            </g>
          </g>
        </svg>
      </div>
      <aside className={styles.asideMenu}>
        <nav>
          <ul>
            <Link to="/">Start</Link>
            <Link to="/add-subcontractor" onClick={handleClearState}>
              Dodaj przewoźnika
            </Link>
            <Link to="/find-subcontractor" onClick={handleClearState}>
              Znajdź przewoźnika
            </Link>
            <Link to="/statistics">Statystyki</Link>
            <Link to="/calendar">Terminarz</Link>
          </ul>
        </nav>
      </aside>
    </div>
  );
};

export default AsideMenu;
