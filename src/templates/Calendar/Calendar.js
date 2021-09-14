import { useState } from "react";
import {
  AllEvents,
  AsideMenu,
  CalendarMenu,
  DoneEvents,
  Important,
  MyDay,
} from "../../components";
import styles from "./calendar.module.scss";

const Calendar = () => {
  const [selectedCard, setSelectedCard] = useState("myday");

  return (
    <div className={styles.wrapper}>
      <div className={styles.inside}>
        <aside className={styles.aside}>
          <CalendarMenu
            setSelectedCard={setSelectedCard}
            selectedCard={selectedCard}
          />
        </aside>
        <section className={styles.content}>
          {selectedCard === "myday" ? <MyDay /> : null}
          {selectedCard === "events" ? <AllEvents /> : null}
          {selectedCard === "important" ? <Important /> : null}
          {selectedCard === "done" ? <DoneEvents /> : null}
        </section>
      </div>

      <AsideMenu />
    </div>
  );
};

export default Calendar;
