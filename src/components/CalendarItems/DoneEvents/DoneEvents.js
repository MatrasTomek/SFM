import { useState } from "react";
import { useSelector } from "react-redux";
import { AddEvent, EventItem, Button } from "../../../components";
import styles from "./doneEvents.module.scss";

const DoneEvents = () => {
  const events = useSelector((store) => store.event);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenAddEventModal = () => {
    setIsModalOpen(true);
  };

  const doneTasksViev = events.map((item) =>
    item.isDone ? <EventItem key={item._id} eventData={item} /> : ""
  );

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <div className={styles.date}>Zadania wykonane</div>
        <div className={styles.tasksInfo}></div>
      </header>

      <section className={styles.content}>{doneTasksViev}</section>
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
        editData={false}
        isEdit={false}
      />
    </div>
  );
};

export default DoneEvents;
