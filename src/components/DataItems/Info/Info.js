import { useEffect, useState } from "react";
import { Form, Field } from "react-final-form";
import { useDispatch, useSelector } from "react-redux";
import {
  addSubcontractor,
  clearSubcontarctor,
  editSubcontractor,
} from "../../../data/actions";
import { COUNTRIES } from "../../../helpers/countires";
import {
  Button,
  DeleteConfirmation,
  ManagementPanel,
} from "../../../components";
import styles from "./info.module.scss";

// const required = (value) => (value ? undefined : "Pole wymagane");
const required = () => {};

const Info = ({ found }) => {
  const dispatch = useDispatch();
  const subcontractor = useSelector((store) => store.subcontractor.data);

  const {
    carrierName,
    adress,
    zip,
    city,
    vatNo,
    phone,
    mail,
    contactP,
    www,
    additional,
    fleetSize,
    kindOf,
    topDir1,
    topDir2,
    topDir3,
  } = !subcontractor ? "" : subcontractor;

  const [isEdit, setIsEdit] = useState(false);
  // const [isFound, setIsFound] = useState(found);
  const [isSave, setIsSave] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteItem, setDeleteItem] = useState(false);

  const eventNameFromClientInfo = `Spotkanie z ${carrierName}`;

  useEffect(() => {
    setIsSave(!subcontractor ? false : true);
  }, [subcontractor]);

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
      carrierName: value.carrierName,
      adress: value.adress,
      zip: value.zip,
      city: value.city,
      vatNo: value.vatNo,
      phone: value.phone,
      mail: value.mail,
      contactP: value.contactP,
      www: value.www,
      additional: value.additional,
      fleetSize: value.fleetSize,
      kindOf: value.kindOf,
      topDir1: value.topDir1,
      topDir2: value.topDir2,
      topDir3: value.topDir3,
      isSaved: true,
      fleet: [],
    };

    if (!isEdit) {
      dispatch(addSubcontractor(allData));
    } else {
      const _id = subcontractor._id;
      const newData = {
        _id,
        carrierName: value.carrierName,
        adress: value.adress,
        zip: value.zip,
        city: value.city,
        vatNo: value.vatNo,
        phone: value.phone,
        mail: value.mail,
        contactP: value.contactP,
        www: value.www,
        additional: value.additional,
        fleetSize: value.fleetSize,
        kindOf: value.kindOf,
        topDir1: value.topDir1,
        topDir2: value.topDir2,
        topDir3: value.topDir3,
        isSaved: true,
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
        {!found ? (
          <Button
            type="button"
            name="dodaj kolejnego przewoźnika"
            onClick={handleClearState}
          />
        ) : (
          ""
        )}
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
                initialValue={isEdit ? carrierName : null}
              >
                {({ input, meta }) => (
                  <div>
                    <input type="text" placeholder="Nazwa Firmy" {...input} />
                    {meta.error && meta.touched && <span>{meta.error}</span>}
                  </div>
                )}
              </Field>

              <Field
                name="adress"
                validate={required}
                initialValue={isEdit ? adress : null}
              >
                {({ input, meta }) => (
                  <div>
                    <input type="text" placeholder="adres" {...input} />
                    {meta.error && meta.touched && <span>{meta.error}</span>}
                  </div>
                )}
              </Field>
              <Field
                name="zip"
                validate={required}
                initialValue={isEdit ? zip : null}
              >
                {({ input, meta }) => (
                  <div>
                    <input
                      type="zip-code"
                      placeholder="Kod pocztowy"
                      {...input}
                    />
                    {meta.error && meta.touched && <span>{meta.error}</span>}
                  </div>
                )}
              </Field>
              <Field
                name="city"
                validate={required}
                initialValue={isEdit ? city : null}
              >
                {({ input, meta }) => (
                  <div>
                    <input type="text" placeholder="miasto" {...input} />
                    {meta.error && meta.touched && <span>{meta.error}</span>}
                  </div>
                )}
              </Field>

              <Field
                name="vatNo"
                validate={required}
                initialValue={isEdit ? vatNo : null}
              >
                {({ input, meta }) => (
                  <div>
                    <input type="text" placeholder="nip" {...input} />
                    {meta.error && meta.touched && <span>{meta.error}</span>}
                  </div>
                )}
              </Field>
              <Field
                name="phone"
                validate={required}
                initialValue={isEdit ? phone : null}
                parse={normalizePhone}
              >
                {({ input, meta }) => (
                  <div>
                    <input
                      type="text"
                      placeholder="telefon 48 111 222 333"
                      {...input}
                    />
                    {meta.error && meta.touched && <span>{meta.error}</span>}
                  </div>
                )}
              </Field>
              <Field
                name="mail"
                validate={required}
                initialValue={isEdit ? mail : null}
              >
                {({ input, meta }) => (
                  <div>
                    <input type="mail" placeholder="Email" {...input} />
                    {meta.error && meta.touched && <span>{meta.error}</span>}
                  </div>
                )}
              </Field>
              <Field name="contactP" initialValue={isEdit ? contactP : null}>
                {({ input, meta }) => (
                  <div>
                    <input
                      type="text"
                      placeholder="osoba kontaktowa"
                      {...input}
                    />
                    {meta.error && meta.touched && <span>{meta.error}</span>}
                  </div>
                )}
              </Field>
              <Field name="www" initialValue={isEdit ? www : null}>
                {({ input, meta }) => (
                  <div>
                    <input type="text" placeholder="www" {...input} />
                    {meta.error && meta.touched && <span>{meta.error}</span>}
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
                    {meta.error && meta.touched && <span>{meta.error}</span>}
                  </div>
                )}
              </Field>
              <Field
                name="fleetSize"
                kindOf
                initialValue={isEdit ? fleetSize : null}
              >
                {({ input, meta }) => (
                  <div>
                    <p>Ilosć pojazdów</p>
                    <input type="number" placeholder="wpisz" {...input} />
                    {meta.error && meta.touched && <span>{meta.error}</span>}
                  </div>
                )}
              </Field>
              <div className={styles.kindOfTransport}>
                <p>Rodzaj transportu</p>
                <div>
                  <Field
                    id="upTo"
                    name="kindOf"
                    component="input"
                    type="radio"
                    value="do 3.5T"
                    initialValue={isEdit ? kindOf : null}
                  />{" "}
                  <label htmlFor="upTo">do 3.5T</label>
                  <Field
                    id="over"
                    name="kindOf"
                    component="input"
                    type="radio"
                    value="powyżej 3.5T"
                    initialValue={isEdit ? kindOf : null}
                  />{" "}
                  <label htmlFor="over"> powyżej 3.5T</label>
                </div>
              </div>

              <div className={styles.topDirections}>
                <p>Główne kierunki</p>
                <Field
                  name="topDir1"
                  validate={required}
                  initialValue={isEdit ? topDir1 : null}
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
                  initialValue={isEdit ? topDir2 : null}
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
                  initialValue={isEdit ? topDir3 : null}
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
        <div className={styles.saveForm}>
          <div>
            <p>Nazwa Firmy:</p>
            <p>{carrierName}</p>
          </div>
          <div>
            <p>Adres:</p>
            <p>{adress}</p>
          </div>
          <div>
            <p>Kod pocztowy:</p>
            <p>{zip}</p>
          </div>
          <div>
            <p>Miasto:</p>
            <p>{city}</p>
          </div>
          <div>
            <p>Nip:</p>
            <p>{vatNo}</p>
          </div>
          <div>
            <p>Telefon:</p>
            <p>{phone}</p>
          </div>
          <div>
            <p>Mail:</p>
            <p>{mail}</p>
          </div>
          <div>
            <p>Osoba kontaktowa:</p>
            <p>{contactP}</p>
          </div>
          <div>
            <p>www:</p>
            <p>{www}</p>
          </div>
          <div>
            <p>Informacje dodatkowe:</p>
            <p>{additional}</p>
          </div>
          <div>
            <p>Ilosć pojazdów:</p>
            <p>{fleetSize}</p>
          </div>
          <div className={styles.kinfOfTransport}>
            <p>Rodzaj transportu:</p>
            <p>{kindOf}</p>
          </div>
          <div className={styles.topDirections}>
            <p>Główne kierunki:</p>
            <div>
              <p>{topDir1}</p>
              <p>{topDir2}</p>
              <p>{topDir3}</p>
            </div>
          </div>
          <div className={styles.buttons}>{buttonsViev}</div>
        </div>
      )}
      {delConfirmationViev}
      <ManagementPanel eventNameFromClientInfo={eventNameFromClientInfo} />
    </div>
  );
};

export default Info;
