import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allFleetActions } from "../../../data/actions";
import { Button } from "../../../components";
import AddFleetModal from "./AddFleetModal";
import styles from "./fleetItem.module.scss";

const FleetItem = ({ fleetData, index }) => {
  const { kindOfFleet, noOfTrucks, weight, pallets, adr, frigo, additional } =
    fleetData;

  console.log(noOfTrucks);
  const subcontractor = useSelector((store) => store.subcontractor.data);
  const savedFleet = subcontractor.fleet;

  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEditFleetItem = () => {
    setIsModalOpen(true);
  };

  const handleDeleteFleetItem = () => {
    console.log(savedFleet, index);
    savedFleet.splice(index, 1);
    const allData = {
      id: subcontractor._id,
      subcontractor: subcontractor.subcontractor,
      fleet: savedFleet,
    };
    dispatch(allFleetActions(allData));
  };

  return (
    <div className={styles.fleetItem}>
      <div>
        <p>
          <span>{kindOfFleet}</span>
        </p>
        <p>
          ilość: <span>{noOfTrucks}</span>
        </p>
      </div>
      <p>
        ładowność: <span>{weight}</span> kg
      </p>
      <p>
        miejsca paletowe: <span>{pallets}</span>
      </p>
      <p>
        kontrola temperatury: <span>{frigo ? "tak" : "brak"}</span>
      </p>
      <p>
        adr: <span>{adr ? "tak" : "brak"}</span>
      </p>
      <p>
        dodatkowe: <span>{additional}</span>
      </p>
      <div className={styles.itemButtons}>
        <Button name="usuń" type="button" onClick={handleDeleteFleetItem} />
        <Button name={"edytuj"} type="button" onClick={handleEditFleetItem} />
      </div>
      <AddFleetModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        isEdit={true}
        fleetData={fleetData}
        index={index}
      />
    </div>
  );
};

export default FleetItem;
