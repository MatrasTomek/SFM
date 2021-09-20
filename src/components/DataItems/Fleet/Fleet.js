import { useState } from "react";
import { useSelector } from "react-redux";
import AddFleetModal from "./AddFleetModal";
import FleetItem from "./FleetItem";
import { Button } from "../../../components";
import styles from "./fleet.module.scss";

const Fleet = () => {
  const subcontractor = useSelector((store) => store.subcontractor.data);

  const savedFleet = !subcontractor ? [] : subcontractor.fleet;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenAddFleetModal = () => {
    setIsModalOpen(true);
  };

  const fleetItemsViev = !savedFleet.length
    ? ""
    : savedFleet.map((item, index) => (
        <FleetItem
          key={Math.random() * 0.1235}
          fleetData={item}
          index={index}
        />
      ));

  return (
    <div className={styles.wrapper}>
      {!subcontractor ? (
        <p className={styles.noSubInfo}>
          Najpierw dodaj przewoźnika lub znajdź i edytuj zapisanego.
        </p>
      ) : (
        <>
          <div className={styles.itemsOfVechicles}>{fleetItemsViev}</div>
          <div className={styles.buttons}>
            <Button
              type="button"
              name="dodaj"
              onClick={handleOpenAddFleetModal}
            />
          </div>
        </>
      )}
      <AddFleetModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        isEdit={false}
        fleetData={false}
        index={false}
      />
    </div>
  );
};

export default Fleet;
