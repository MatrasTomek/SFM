import { useState } from "react";
import { AsideMenu, CalendarMenu, SectionSelector } from "../../components";
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
          <SectionSelector selectedCard={selectedCard} />
        </section>
      </div>

      <AsideMenu />
    </div>
  );
};

export default Calendar;
