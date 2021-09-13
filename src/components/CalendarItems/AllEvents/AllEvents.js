import { useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddEvent, EventItem, Button } from "../../../components";
import { DAYS, MONTHS } from "../../../helpers/dates";
import FoundItem from "../../FoundItem";
import styles from "./allEvents.module.scss";

const AllEvents = () => {
  const events = useSelector((store) => store.event);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenAddEventModal = () => {
    setIsModalOpen(true);
  };

  const allTasksViev = events.map((item) => (
    <EventItem key={item._id} eventData={item} />
  ));

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <div className={styles.date}>Wszystkie zadania</div>
        <div className={styles.tasksInfo}></div>
      </header>

      <section className={styles.content}>{allTasksViev}</section>
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

export default AllEvents;
