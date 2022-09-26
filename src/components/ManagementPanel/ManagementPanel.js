import { useState } from "react";
import { AddEvent, Button, QuestionsForm } from "../../components";
import styles from "./managementPanel.module.scss";

const ManagementPanel = ({ eventNameFromClientInfo }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isQModalOpen, setIsQModalOpen] = useState(false);

  const handleOpenQestionForm = () => {
    setIsQModalOpen(true);
  };
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
      <QuestionsForm
        isModalOpen={isQModalOpen}
        setIsModalOpen={setIsQModalOpen}
      />
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
