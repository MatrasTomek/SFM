import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allFleetActions } from "../../../data/actions";
import { FLEETS } from "../../../helpers/fleets";
import { Button } from "../../../components";
import styles from "./fleet.module.scss";

const Fleet = () => {
  const subcontractor = useSelector((store) => store.subcontractor.data);

  const savedFleet = !subcontractor ? [] : subcontractor.fleet;

  const dispatch = useDispatch();

  const [isEdit, setIsEdit] = useState(false);
  const [index, setIndex] = useState(false);
  const [editedData, setEditedData] = useState(false);

  const [kindOfFleetV, setKindOfFleetV] = useState("");
  const [noOfTrucksV, setNoOfTrucksV] = useState(
    !isEdit ? "" : editedData.noOfTrucks
  );
  const [weightV, setWeightV] = useState(!isEdit ? "" : editedData.weight);
  const [palletsV, setPalletsV] = useState(!isEdit ? "" : editedData.pallets);
  const [adrV, setAdrV] = useState(!isEdit ? false : editedData.adr);
  const [frigoV, setFrigoV] = useState(!isEdit ? false : editedData.frigo);
  const [additionalV, setAdditionalV] = useState(
    !isEdit ? "" : editedData.additional
  );

  const handleSetKindOf = (e) => {
    e.preventDefault();
    setKindOfFleetV(e.target.value);
  };
  const handleSetNoOfTrucks = (e) => {
    e.preventDefault();
    setNoOfTrucksV(e.target.value);
  };
  const handleSetWeight = (e) => {
    e.preventDefault();
    setWeightV(e.target.value);
  };
  const handleSetPallets = (e) => {
    e.preventDefault();
    setPalletsV(e.target.value);
  };
  const handleSetAdr = (e) => {
    e.preventDefault();
    setAdrV(e.target.value);
  };
  const handleSetFrigo = (e) => {
    e.preventDefault();
    setFrigoV(e.target.value);
  };
  const handleSetAdditional = (e) => {
    e.preventDefault();
    setAdditionalV(e.target.value);
  };

  const handleEditFleetItem = (e) => {
    setIsEdit(true);
    const index = Number(e.target.id);
    setIndex(index);
    setEditedData(savedFleet[index]);
  };

  const handleDeleteFleetItem = (e) => {
    setIsEdit(false);
    setEditedData(false);
    const index = e.target.id;
    savedFleet.splice(index, 1);
    const allData = {
      id: subcontractor._id,
      fleet: savedFleet,
    };
    dispatch(allFleetActions(allData));
  };

  const fleetItemsViev = !savedFleet.length
    ? ""
    : savedFleet.map((item, index) => (
        <div key={Math.random() * 0.01245}>
          <p>{item.kindOfFleet}</p>
          <p>ilość: {item.noOfTucks}</p>
          <p>ładowność kg:{item.weight}</p>
          <p>miejsca paletowe:{item.pallets}</p>
          <p>kontrola temperatury: {item.frigo ? "tak" : "brak"}</p>
          <p>adr: {item.adr ? "tak" : "brak"}</p>
          <p>dodatkowe: {item.additional}</p>
          <div className={styles.itemButtons}>
            <Button
              name="usuń"
              type="button"
              id={index}
              onClick={handleDeleteFleetItem}
            />
            <Button
              name={"edytuj"}
              type="button"
              id={index}
              onClick={handleEditFleetItem}
            />
          </div>
        </div>
      ));

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const fleetValue = {
      kindOfFleet: kindOfFleetV,
      noOfTrucks: noOfTrucksV,
      pallets: palletsV,
      weight: weightV,
      adr: adrV,
      frigo: frigoV,
      additional: additionalV,
    };
    const allData = {
      id: subcontractor._id,
      subcontractor: subcontractor.subcontractor,
      fleet: [...savedFleet, fleetValue],
    };
    dispatch(allFleetActions(allData));
    if (isEdit) {
      savedFleet.splice(index, 1);
      setIsEdit(false);
      setEditedData(false);
    }
  };

  const fleetOption = FLEETS.map((item) => (
    <option key={item.id}>{item.name}</option>
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
          <div className={styles.addItemForm}>
            <form onSubmit={handleOnSubmit}>
              <label htmlFor="kindOfFleet">Rodzaj pojazdu</label>
              <select
                name="kindOfFleet"
                onChange={handleSetKindOf}
                value={!isEdit ? kindOfFleetV : editedData.kindOfFleet}
              >
                {fleetOption}
              </select>

              <div>
                <label htmlFor="noOfTucks">Ilość pojazdów</label>
                <input
                  name="noOfTucks"
                  type="text"
                  onChange={handleSetNoOfTrucks}
                  value={noOfTrucksV}
                />
              </div>

              <div>
                <label>Ładowność</label>
                <input
                  name="weight"
                  type="text"
                  onChange={handleSetWeight}
                  value={weightV}
                />
              </div>

              <div>
                <label>Ilość palet</label>
                <input
                  name="pallets"
                  type="text"
                  onChange={handleSetPallets}
                  value={palletsV}
                />
              </div>

              <div>
                <label>Adr</label>
                <input
                  name="adr"
                  type="checkbox"
                  onChange={handleSetAdr}
                  value={adrV}
                />
              </div>

              <div>
                <label>Kontrola temp</label>
                <input
                  name="frigo"
                  type="checkbox"
                  onChange={handleSetFrigo}
                  value={frigoV}
                />
              </div>

              <div>
                <label>Dodatkowe informacje</label>
                <input
                  name="additional "
                  type="text"
                  placeholder="wpisz"
                  onChange={handleSetAdditional}
                  value={additionalV}
                />
              </div>

              <div className={styles.buttons}>
                <Button type="submit" name={!isEdit ? "dodaj" : "aktualizuj"} />
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default Fleet;
