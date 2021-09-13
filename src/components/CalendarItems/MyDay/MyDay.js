import { useState } from "react";
import { useSelector } from "react-redux";
import { AddEvent, EventItem, Button } from "../../../components";
import { DAYS, MONTHS } from "../../../helpers/dates";
import styles from "./myDay.module.scss";

const MyDay = () => {
  const events = useSelector((store) => store.event);
  const presentDayName = new Date().getDay();
  const presentDay = new Date().getDate();
  const presentMonth = new Date().getMonth();
  const presentYear = new Date().getFullYear();

  const presentDayForEvent = new Date().toLocaleDateString();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenAddEventModal = () => {
    setIsModalOpen(true);
  };

  const tasksVievForPresentDay = events.map((item) =>
    item.eventStart === presentDayForEvent ? (
      <EventItem key={item._id} eventData={item} />
    ) : (
      ""
    )
  );

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <div className={styles.date}>
          Dzisiaj jest {DAYS[presentDayName - 1]}, {presentDay}{" "}
          {MONTHS[presentMonth]} {presentYear}
        </div>
        <div className={styles.tasksInfo}></div>
      </header>

      <section className={styles.content}>{tasksVievForPresentDay}</section>
      <div className={styles.buttons}>
        <Button
          name="dodaj zadanie"
          type="button"
          onClick={handleOpenAddEventModal}
        />
      </div>
      <AddEvent
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        isEdit={false}
        editData={false}
      />
    </div>
  );
};

export default MyDay;
