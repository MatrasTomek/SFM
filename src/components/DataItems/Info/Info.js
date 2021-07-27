import { useState } from "react";
import { Form, Field } from "react-final-form";
import { useDispatch, useSelector } from "react-redux";
import {
  addSubcontractor,
  clearSubcontarctor,
  editSubcontractor,
} from "../../../data/actions";
import { COUNTRIES } from "../../../helpers/countires";
import { Button, DeleteConfirmation } from "../../../components";
import styles from "./info.module.scss";

// const required = (value) => (value ? undefined : "Pole wymagane");

const required = (value) => console.log("ok");

const Info = () => {
  const dispatch = useDispatch();
  const subcontractor = useSelector((store) => store.subcontractor.data);
  console.log(subcontractor);

  const [isEdit, setIsEdit] = useState(false);
  const [isSave, setIsSave] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteItem, setDeleteItem] = useState(false);

  const countiresSelector = COUNTRIES.map((country) => (
    <option key={country.id}>{country.id}</option>
  ));

  const normalizePhone = (value) => {
    if (!value) return value;
    const onlyNums = value.replace(/[^\d]/g, "");
    if (onlyNums.length <= 2) return onlyNums;
    if (onlyNums.length <= 9)
      return `(${onlyNums.slice(0, 2)}) ${onlyNums.slice(2, 9)}`;
    return `(${onlyNums.slice(0, 2)}) ${onlyNums.slice(2, 5)}-${onlyNums.slice(
      5,
      8
    )}-${onlyNums.slice(8, 11)}`;
  };

  const handleShowEditButtons = () => {
    setIsEdit(true);
    setIsSave(false);
  };
  const handleOutOfEdit = () => {
    setIsEdit(false);
    setIsSave(true);
  };

  const handleOpendDleteConfirmation = () => {
    setDeleteItem("subcontractor");
    setIsModalOpen(true);
  };

  const handleClearState = () => {
    dispatch(clearSubcontarctor());
    setIsSave(false);
    setIsEdit(false);
  };

  const handleOnSubmit = (value) => {
    const allData = {
      subcontractor: value,
      fleet: [{}],
    };

    if (!isEdit) {
      dispatch(addSubcontractor(allData));
      setIsSave(true);
    } else {
      const _id = subcontractor._id;
      const newData = {
        _id,
        subcontractor: value,
        fleet: subcontractor.fleet,
      };
      dispatch(editSubcontractor(newData));
      setIsEdit(false);
      setIsSave(true);
    }
  };

  const buttonsViev =
    !isSave && !isEdit ? (
      <Button type="submit" name="zapisz" />
    ) : !isEdit ? (
      <>
        <Button
          type="button"
          name="edytuj przewoźnika"
          onClick={handleShowEditButtons}
        />
        <Button
          type="button"
          name="dodaj kolejnego przewoźnika"
          onClick={handleClearState}
        />
        <Button
          type="button"
          name="usuń przewoźnika"
          onClick={handleOpendDleteConfirmation}
        />
      </>
    ) : (
      <div>
        <Button type="button" name="wyjdź" onClick={handleOutOfEdit} />
        <Button type="submit" name="zapisz" />
      </div>
    );

  const delConfirmationViev = !subcontractor ? (
    ""
  ) : (
    <DeleteConfirmation
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
      setIsEdit={setIsEdit}
      setIsSave={setIsSave}
      id={subcontractor._id}
      deleteItem={deleteItem}
    />
  );

  return (
    <div className={styles.wrapper}>
      {!isSave ? (
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
              <Field
                name="carrierName"
                validate={required}
                //   initialValue={isEdit ? editData.invoice.dateOfIssue : null}
              >
                {({ input, meta }) => (
                  <div>
                    <label>Nazwa Firmy</label>
                    <input type="text" placeholder="wpisz" {...input} />
                    {meta.error && meta.touched && <span>{meta.error}</span>}
                  </div>
                )}
              </Field>

              <Field
                name="adress"
                validate={required}
                //   initialValue={isEdit ? editData.invoice.dateOfIssue : null}
              >
                {({ input, meta }) => (
                  <div>
                    <label htmlFor="adress">Adres</label>
                    <input type="text" placeholder="wpisz" {...input} />
                    {meta.error && meta.touched && <span>{meta.error}</span>}
                  </div>
                )}
              </Field>
              <Field
                name="zip"
                validate={required}
                //   initialValue={isEdit ? editData.invoice.dateOfIssue : null}
              >
                {({ input, meta }) => (
                  <div>
                    <label>Kod pocztowy</label>
                    <input type="zip-code" placeholder="wpisz" {...input} />
                    {meta.error && meta.touched && <span>{meta.error}</span>}
                  </div>
                )}
              </Field>
              <Field
                name="city"
                validate={required}
                //   initialValue={isEdit ? editData.invoice.dateOfIssue : null}
              >
                {({ input, meta }) => (
                  <div>
                    <label>Miasto</label>
                    <input type="text" placeholder="wpisz" {...input} />
                    {meta.error && meta.touched && <span>{meta.error}</span>}
                  </div>
                )}
              </Field>

              <Field
                name="vatNo"
                validate={required}
                //   initialValue={isEdit ? editData.invoice.dateOfIssue : null}
              >
                {({ input, meta }) => (
                  <div>
                    <label>Nip</label>
                    <input type="text" placeholder="wpisz" {...input} />
                    {meta.error && meta.touched && <span>{meta.error}</span>}
                  </div>
                )}
              </Field>
              <Field
                name="phone"
                validate={required}
                //   initialValue={isEdit ? editData.invoice.dateOfIssue : null}
                parse={normalizePhone}
              >
                {({ input, meta }) => (
                  <div>
                    <label>Telefon</label>
                    <input type="text" placeholder="wpisz" {...input} />
                    {meta.error && meta.touched && <span>{meta.error}</span>}
                  </div>
                )}
              </Field>
              <Field
                name="mail"
                validate={required}
                //   initialValue={isEdit ? editData.invoice.dateOfIssue : null}
              >
                {({ input, meta }) => (
                  <div>
                    <label>Mail</label>
                    <input type="mail" placeholder="wpisz" {...input} />
                    {meta.error && meta.touched && <span>{meta.error}</span>}
                  </div>
                )}
              </Field>
              <Field
                name="contactP"

                //   initialValue={isEdit ? editData.invoice.dateOfIssue : null}
              >
                {({ input, meta }) => (
                  <div>
                    <label>Osoba kontaktowa</label>
                    <input type="text" placeholder="wpisz" {...input} />
                    {meta.error && meta.touched && <span>{meta.error}</span>}
                  </div>
                )}
              </Field>
              <Field
                name="www"

                //   initialValue={isEdit ? editData.invoice.dateOfIssue : null}
              >
                {({ input, meta }) => (
                  <div>
                    <label>www</label>
                    <input type="text" placeholder="wpisz" {...input} />
                    {meta.error && meta.touched && <span>{meta.error}</span>}
                  </div>
                )}
              </Field>
              <Field
                name="additional"
                //   initialValue={isEdit ? editData.invoice.dateOfIssue : null}
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
                    {meta.error && meta.touched && <span>{meta.error}</span>}
                  </div>
                )}
              </Field>
              <Field
                name="fleetSize"
                validate={required}
                //   initialValue={isEdit ? editData.invoice.dateOfIssue : null}
              >
                {({ input, meta }) => (
                  <div>
                    <p>Ilosć pojazdów</p>
                    <input type="number" placeholder="wpisz" {...input} />
                    {meta.error && meta.touched && <span>{meta.error}</span>}
                  </div>
                )}
              </Field>
              <div className={styles.kinfOfTransport}>
                <p>Rodzaj transportu</p>
                <Field
                  name="kindOf"
                  component="input"
                  type="radio"
                  value="upTo3.5T"
                />{" "}
                do 3.5T
                <Field
                  name="kindOf"
                  component="input"
                  type="radio"
                  value="over3.5T"
                />{" "}
                powyżej 3.5T
              </div>

              <div className={styles.topDirections}>
                <p>Główne kierunki</p>
                <Field
                  name="topDir1"
                  validate={required}
                  //   initialValue={isEdit ? editData.invoice.dateOfIssue : null}
                >
                  {({ input, meta }) => (
                    <div>
                      <select {...input}>{countiresSelector}</select>
                      {meta.error && meta.touched && <span>{meta.error}</span>}
                    </div>
                  )}
                </Field>
                <Field
                  name="topDir2"
                  validate={required}
                  //   initialValue={isEdit ? editData.invoice.dateOfIssue : null}
                >
                  {({ input, meta }) => (
                    <div>
                      <select {...input}>{countiresSelector}</select>
                      {meta.error && meta.touched && <span>{meta.error}</span>}
                    </div>
                  )}
                </Field>
                <Field
                  name="topDir3"
                  validate={required}
                  //   initialValue={isEdit ? editData.invoice.dateOfIssue : null}
                >
                  {({ input, meta }) => (
                    <div>
                      <select {...input}>{countiresSelector}</select>
                      {meta.error && meta.touched && <span>{meta.error}</span>}
                    </div>
                  )}
                </Field>
              </div>
              <div className={styles.buttons}>{buttonsViev}</div>
            </form>
          )}
        />
      ) : (
        <div className={styles.form}>
          <div>
            <p>Nazwa Firmy</p>
            <p></p>
          </div>
          <div>
            <p>Adres</p>
            <p></p>
          </div>
          <div>
            <p>Kod pocztowy</p>
            <p></p>
          </div>
          <div>
            <p>Miasto</p>
            <p></p>
          </div>
          <div>
            <p>Nip</p>
            <p></p>
          </div>
          <div>
            <p>Telefon</p>
            <p></p>
          </div>
          <div>
            <p>Mail</p>
            <p></p>
          </div>
          <div>
            <p>Osoba kontaktowa</p>
            <p></p>
          </div>
          <div>
            <p>www</p>
            <p></p>
          </div>
          <div>
            <p>Informacje dodatkowe</p>
            <p></p>
          </div>
          <div>
            <p>Ilosć pojazdów</p>
            <p></p>
          </div>
          <div className={styles.kinfOfTransport}>
            <p>Rodzaj transportu</p>
            <p></p>
          </div>
          <div className={styles.topDirections}>
            <p>Główne kierunki</p>
            <div>
              <p></p>
              <p></p>
              <p></p>
            </div>
          </div>
          <div className={styles.buttons}>{buttonsViev}</div>
        </div>
      )}
      {delConfirmationViev}
    </div>
  );
};

export default Info;
