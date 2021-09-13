import { useState } from "react";
import { useSelector } from "react-redux";
import { AddEvent, EventItem, Button } from "../..";
import styles from "./important.module.scss";

const Important = () => {
  const events = useSelector((store) => store.event);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenAddEventModal = () => {
    setIsModalOpen(true);
  };

  const importantTasksViev = events.map((item) =>
    item.isImportant ? <EventItem key={item._id} eventData={item} /> : ""
  );

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <div className={styles.date}>Ważne</div>
        <div className={styles.tasksInfo}></div>
      </header>

      <section className={styles.content}>{importantTasksViev}</section>
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

export default Important;
