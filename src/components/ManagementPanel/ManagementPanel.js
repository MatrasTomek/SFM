import { useState } from "react";
import { AddEvent, Button } from "../../components";
import styles from "./managementPanel.module.scss";

const ManagementPanel = ({ eventNameFromClientInfo }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenQestionForm = () => {};
  const handleOpenCalendar = () => {
    setIsModalOpen(true);
  };

  return (
    <div className={styles.panel}>
      <div className={styles.buttons}>
        <Button
          name="wyślij zapytanie"
          type="button"
          onClick={handleOpenQestionForm}
        />
        <Button
          name="zaplanuj spotkanie"
          type="button"
          onClick={handleOpenCalendar}
        />
      </div>
      <AddEvent
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        isEdit={false}
        eventNameFromClientInfo={eventNameFromClientInfo}
      />
    </div>
  );
};

export default ManagementPanel;
