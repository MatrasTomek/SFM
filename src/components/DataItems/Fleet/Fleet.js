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

  // const [isEdit, setIsEdit] = useState(false);
  // const [index, setIndex] = useState(false);
  // const [editedData, setEditedData] = useState(false);

  const [kindOfFleetV, setKindOfFleetV] = useState("");
  const [noOfTrucksV, setNoOfTrucksV] = useState("");
  const [weightV, setWeightV] = useState("");
  const [palletsV, setPalletsV] = useState("");
  const [adrV, setAdrV] = useState(false);
  const [frigoV, setFrigoV] = useState(false);
  const [additionalV, setAdditionalV] = useState("");

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
    setAdrV(!adrV);
  };
  const handleSetFrigo = (e) => {
    e.preventDefault();
    setFrigoV(!frigoV);
  };
  const handleSetAdditional = (e) => {
    e.preventDefault();
    setAdditionalV(e.target.value);
  };

  // const handleEditFleetItem = (e) => {
  //   setIsEdit(true);
  //   const index = Number(e.target.id);
  //   setIndex(index);
  //   setEditedData(savedFleet[index]);
  // };

  const handleDeleteFleetItem = (e) => {
    // setIsEdit(false);
    // setEditedData(false);
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
        <div className={styles.fleetItem} key={Math.random() * 0.01245}>
          <div>
            <p>
              <span>{item.kindOfFleet}</span>
            </p>
            <p>
              ilość: <span>{item.noOfTrucks}</span>
            </p>
          </div>
          <p>
            ładowność: <span>{item.weight}</span> kg
          </p>
          <p>
            miejsca paletowe: <span>{item.pallets}</span>
          </p>
          <p>
            kontrola temperatury: <span>{item.frigo ? "tak" : "brak"}</span>
          </p>
          <p>
            adr: <span>{item.adr ? "tak" : "brak"}</span>
          </p>
          <p>
            dodatkowe: <span>{item.additional}</span>
          </p>
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
              // onClick={handleEditFleetItem}
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
    // if (isEdit) {
    //   savedFleet.splice(index, 1);
    //   setIsEdit(false);
    //   setEditedData(false);
    // }
    setKindOfFleetV("");
    setNoOfTrucksV("");
    setWeightV("");
    setPalletsV("");
    setAdrV(false);
    setFrigoV(false);
    setAdditionalV("");
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
              <div className={styles.kindOf}>
                <label htmlFor="kindOfFleet">Rodzaj pojazdu</label>
                <select
                  name="kindOfFleet"
                  onChange={handleSetKindOf}
                  value={kindOfFleetV}
                >
                  {fleetOption}
                </select>
              </div>
              <div className={styles.quantity}>
                <input
                  name="noOfTucks"
                  type="text"
                  placeholder="wpisz ilość"
                  onChange={handleSetNoOfTrucks}
                  value={noOfTrucksV}
                />
                <input
                  name="weight"
                  type="text"
                  placeholder="wpisz ładowność"
                  onChange={handleSetWeight}
                  value={weightV}
                />
                <input
                  name="pallets"
                  type="text"
                  placeholder="ilość palet"
                  onChange={handleSetPallets}
                  value={palletsV}
                />
              </div>
              <div className={styles.specialEq}>
                <label>
                  <input
                    id="adr"
                    name="adr"
                    type="checkbox"
                    onChange={handleSetAdr}
                    value={adrV}
                  />
                  <span>ADR</span>
                </label>

                <label>
                  <input
                    id="frigo"
                    name="frigo"
                    type="checkbox"
                    onChange={handleSetFrigo}
                    value={frigoV}
                  />
                  <span>Kontrola temp.</span>
                </label>
              </div>
              <div className={styles.additional}>
                <textarea
                  name="additional"
                  placeholder="Informacje dodatkowe"
                  onChange={handleSetAdditional}
                  value={additionalV}
                />
              </div>

              <div className={styles.buttons}>
                <Button type="submit" name="dodaj" />
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default Fleet;
