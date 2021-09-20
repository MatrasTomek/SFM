import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Field } from "react-final-form";
import { allFleetActions } from "../../../data/actions";
import { FLEETS } from "../../../helpers/fleets";
import { Button, Modal } from "../../../components";
import styles from "./addFleetModal.module.scss";

const AddFleetModal = ({
  isModalOpen,
  setIsModalOpen,
  isEdit,
  fleetData,
  index,
}) => {
  const subcontractor = useSelector((store) => store.subcontractor.data);
  const dispatch = useDispatch();

  const { kindOfFleet, noOfTrucks, weight, pallets, adr, frigo, additional } =
    fleetData;

  const savedFleet = !subcontractor ? [] : subcontractor.fleet;

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const fleetOption = FLEETS.map((item) => (
    <option key={item.id}>{item.name}</option>
  ));

  const handleOnSubmit = (values) => {
    const fleetValue = {
      kindOfFleet: values.kindOfFleet,
      noOfTucks: values.noOfTucks,
      weight: values.weight,
      pallets: values.pallets,
      adr: values.adr,
      frigo: values.frigo,
      additional: values.additional,
    };

    if (!isEdit) {
      const allData = {
        id: subcontractor._id,
        subcontractor: subcontractor.subcontractor,
        fleet: [...savedFleet, fleetValue],
      };
      dispatch(allFleetActions(allData));
    } else {
      savedFleet.splice(index, 1, fleetValue);

      const allData = {
        id: subcontractor._id,
        subcontractor: subcontractor.subcontractor,
        fleet: savedFleet,
      };
      dispatch(allFleetActions(allData));
    }

    setIsModalOpen(false);
  };
  return (
    <Modal isModalOpen={isModalOpen}>
      <div className={styles.wrapper}>
        <Form
          onSubmit={handleOnSubmit}
          render={({ handleSubmit, form, submitting, pristine, values }) => (
            <form
              className={styles.form}
              onSubmit={(event) => {
                const promise = handleSubmit(event);
                promise &&
                  promise.then(() => {
                    form.reset();
                  });
                return promise;
              }}
            >
              <div className={styles.doubleElements}>
                <label htmlFor="kindOfFleet">rodzaj</label>
                <Field
                  name="kindOfFleet"
                  initialValue={isEdit ? kindOfFleet : null}
                >
                  {({ input, meta }) => (
                    <div>
                      <select {...input} id="kindOfFleet">
                        {fleetOption}
                      </select>
                      {meta.error && meta.touched && <span>{meta.error}</span>}
                    </div>
                  )}
                </Field>
                <label htmlFor="noOfTucks">ilość</label>
                <Field
                  name="noOfTucks"
                  initialValue={isEdit ? noOfTrucks : null}
                >
                  {({ input, meta }) => (
                    <div>
                      <input type="number" {...input} id="noOfTucks" min="0" />
                      {meta.error && meta.touched && <span>{meta.error}</span>}
                    </div>
                  )}
                </Field>
              </div>
              <div className={styles.doubleElements}>
                <label htmlFor="weight">ładowność (kg)</label>
                <Field name="weight" initialValue={isEdit ? weight : null}>
                  {({ input, meta }) => (
                    <div>
                      <input
                        type="number"
                        {...input}
                        id="weight"
                        min="0"
                        max="24000"
                      />
                      {meta.error && meta.touched && <span>{meta.error}</span>}
                    </div>
                  )}
                </Field>
                <label htmlFor="pallets">ilość palet</label>
                <Field name="pallets" initialValue={isEdit ? pallets : null}>
                  {({ input, meta }) => (
                    <div>
                      <input
                        type="number"
                        id="pallets"
                        min="0"
                        max="34"
                        {...input}
                      />
                      {meta.error && meta.touched && <span>{meta.error}</span>}
                    </div>
                  )}
                </Field>
              </div>
              <div className={styles.selectedElements}>
                <div className={styles.adr}>
                  <label>
                    <Field
                      name="adr"
                      component="input"
                      type="checkbox"
                      id="adr"
                      value="adr"
                      initialValue={isEdit ? adr : null}
                    />
                    <span>Adr</span>
                  </label>
                </div>

                <div className={styles.frigo}>
                  <label>
                    <Field
                      name="frigo"
                      component="input"
                      type="checkbox"
                      id="frigo"
                      value="frigo"
                      initialValue={isEdit ? frigo : null}
                    />
                    <span>Kontrola Temp.</span>
                  </label>
                </div>
              </div>
              <div className={styles.contentElement}>
                <Field
                  name="additional"
                  initialValue={isEdit ? additional : null}
                >
                  {({ input, meta }) => (
                    <div>
                      <textarea type="text" rows="3" cols="25" {...input} />
                      {meta.error && meta.touched && <span>{meta.error}</span>}
                    </div>
                  )}
                </Field>
              </div>

              <div className={styles.buttons}>
                <Button name="wyjdź" type="button" onClick={handleCloseModal} />
                <Button
                  name={!isEdit ? "zapisz" : "aktualizuj"}
                  type="submit"
                />
              </div>
            </form>
          )}
        />
      </div>
    </Modal>
  );
};

export default AddFleetModal;
