import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Field } from "react-final-form";
import { allFleetActions } from "../../../data/actions";
import { FLEETS } from "../../../helpers/fleets";
import { Button } from "../../../components";
import styles from "./fleet.module.scss";

const Fleet = () => {
  const subcontractor = useSelector((store) => store.subcontractor.data);

  const savedFleet = !subcontractor ? [] : subcontractor.fleet;

  const dispatch = useDispatch();

  const [isEdit, setIsEdit] = useState(false);
  const [editedData, setEditedData] = useState(false);

  const handleEditFleetItem = (e) => {
    setIsEdit(true);
    const index = e.target.id;
    setEditedData(savedFleet[Number(index)]);
    savedFleet.splice(index, 1);
    const allData = {
      id: subcontractor._id,
      subcontractor: subcontractor.subcontractor,
      fleet: savedFleet,
    };
    dispatch(allFleetActions(allData));
  };
  const { kindOfFleet, noOfTucks, weight, pallets, frigo, adr, additional } =
    !isEdit ? "" : editedData;

  const handleDeleteFleetItem = (e) => {
    setIsEdit(false);
    const index = e.target.id;
    savedFleet.splice(index, 1);
    const allData = {
      id: subcontractor._id,
      subcontractor: subcontractor.subcontractor,
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
            {!isEdit ? (
              <Button
                name={"edytuj"}
                type="button"
                id={index}
                onClick={handleEditFleetItem}
              />
            ) : (
              ""
            )}
          </div>
        </div>
      ));

  const handleOnSubmit = (value, form) => {
    setIsEdit(false);
    setEditedData(false);
    const allData = {
      id: subcontractor._id,
      subcontractor: subcontractor.subcontractor,
      fleet: [...savedFleet, value],
    };
    dispatch(allFleetActions(allData));
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
            <Form
              onSubmit={handleOnSubmit}
              render={({
                handleSubmit,
                form,
                reset,
                submitting,
                pristine,
                values,
              }) => (
                <form
                  className={styles.form}
                  onSubmit={async (event) => {
                    await handleSubmit(event);
                    form.reset();
                  }}
                >
                  <Field
                    name="kindOfFleet"
                    initialValue={isEdit ? kindOfFleet : null}
                  >
                    {({ input, meta }) => (
                      <div>
                        <p>Rodzaj pojazdu</p>
                        <select {...input}>{fleetOption}</select>
                        {meta.error && meta.touched && (
                          <span>{meta.error}</span>
                        )}
                      </div>
                    )}
                  </Field>

                  <Field name="noOfTucks" initialValue={isEdit ? "11" : "20"}>
                    {({ input }) => (
                      <div>
                        <label>ilość pojazdów</label>
                        <input type="number" {...input} />
                      </div>
                    )}
                  </Field>
                  <Field name="weight" initialValue={isEdit ? weight : null}>
                    {({ input }) => (
                      <div>
                        <label>ładowność</label>
                        <input type="number" {...input} />
                      </div>
                    )}
                  </Field>
                  <Field name="pallets" initialValue={isEdit ? pallets : null}>
                    {({ input }) => (
                      <div>
                        <label>ilość palet:{pallets}</label>
                        <input type="number" {...input} />
                      </div>
                    )}
                  </Field>
                  <Field
                    name="frigo"
                    type="checkbox"
                    initialValue={isEdit ? frigo : null}
                  >
                    {({ input }) => (
                      <div>
                        <label>kontrola temperatury</label>
                        <input {...input} />
                      </div>
                    )}
                  </Field>
                  <Field
                    name="adr"
                    type="checkbox"
                    initialValue={isEdit ? adr : null}
                  >
                    {({ input }) => (
                      <div>
                        <label>adr</label>
                        <input {...input} />
                      </div>
                    )}
                  </Field>

                  <Field
                    name="additional"
                    initialValue={isEdit ? additional : null}
                  >
                    {({ input, meta }) => (
                      <div>
                        <textarea
                          rows="3"
                          cols="40"
                          type="text"
                          placeholder="informacje dodatkowe"
                          {...input}
                        />
                        {meta.error && meta.touched && (
                          <span>{meta.error}</span>
                        )}
                      </div>
                    )}
                  </Field>

                  <div className={styles.buttons}>
                    <Button
                      type="submit"
                      name={!isEdit ? "dodaj" : "aktualizuj"}
                    />
                  </div>
                </form>
              )}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Fleet;
