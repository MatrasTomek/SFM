import { useState } from "react";
import { useSelector } from "react-redux";
import { AddEvent, EventItem, Button } from "../../../components";
import { DAYS, MONTHS } from "../../../helpers/dates";
import styles from "./section.module.scss";

const SectionSelector = ({ selectedCard }) => {
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

  const tasksVievForPresentDay =
    selectedCard === "myday"
      ? events.map((item) =>
          item.eventStart === presentDayForEvent && !item.isDone ? (
            <EventItem key={item._id} eventData={item} />
          ) : (
            ""
          )
        )
      : null;
  const allTasksViev =
    selectedCard === "events"
      ? events.map((item) => <EventItem key={item._id} eventData={item} />)
      : null;
  const importantTasksViev =
    selectedCard === "important"
      ? events.map((item) =>
          item.isImportant && !item.isDone ? (
            <EventItem key={item._id} eventData={item} />
          ) : (
            ""
          )
        )
      : null;

  const doneTasksViev =
    selectedCard === "done"
      ? events.map((item) =>
          item.isDone ? <EventItem key={item._id} eventData={item} /> : ""
        )
      : null;

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <div className={styles.date}>
          <p
            style={{
              display: ` ${selectedCard === "myday" ? "block" : "none"}`,
            }}
          >
            Dzisiaj jest {DAYS[presentDayName - 1]}, {presentDay}{" "}
            {MONTHS[presentMonth]} {presentYear}
          </p>
          <p
            style={{
              display: ` ${selectedCard === "events" ? "block" : "none"}`,
            }}
          >
            Wszystkie zadania
          </p>
          <p
            style={{
              display: ` ${selectedCard === "important" ? "block" : "none"}`,
            }}
          >
            Ważne
          </p>
          <p
            style={{
              display: ` ${selectedCard === "done" ? "block" : "none"}`,
            }}
          >
            Wykonane
          </p>
        </div>
        <div className={styles.tasksInfo}></div>
      </header>

      <section className={styles.content}>
        {tasksVievForPresentDay}
        {allTasksViev}
        {importantTasksViev}
        {doneTasksViev}
      </section>
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

export default SectionSelector;
