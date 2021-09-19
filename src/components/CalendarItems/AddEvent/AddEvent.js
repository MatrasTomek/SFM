import { useDispatch } from "react-redux";
import { Form, Field } from "react-final-form";
import { Button, Modal } from "../../../components";
import { addEvent, editEvent } from "../../../data/actions";
import styles from "./addEvent.module.scss";

const AddEvent = ({
  isModalOpen,
  setIsModalOpen,
  isEdit,
  eventData,
  eventNameFromClientInfo = "",
}) => {
  const convertingEventStart = !isEdit
    ? null
    : String(eventData.eventStart).split(".");

  const convertedEventStart = !isEdit
    ? null
    : `${convertingEventStart[2]}-${convertingEventStart[1]}-${convertingEventStart[0]}`;

  const convertingEventEnd = !isEdit
    ? null
    : String(eventData.eventEnd).split(".");

  const convertedEventEnd = !isEdit
    ? null
    : `${convertingEventEnd[2]}-${convertingEventEnd[1]}-${convertingEventEnd[0]}`;

  const dispatch = useDispatch();
  const handleCloseAddEventModal = () => {
    setIsModalOpen(false);
  };

  const handleOnSubmit = (values) => {
    const presentDayForEvent = new Date().toLocaleDateString();
    const startEvent = new Date(values.eventStart).toLocaleDateString();
    const endEvent = new Date(values.eventEnd).toLocaleDateString();

    const startEventChange = !values.eventStart
      ? presentDayForEvent
      : startEvent;
    const endEventChange = !values.eventEnd ? startEventChange : endEvent;

    if (!isEdit) {
      const eventObj = {
        eventStart: startEventChange,
        hrsStart: !values.hrsStart ? "" : values.hrsStart,
        eventEnd: endEventChange,
        hrsEnd: !values.hrsEnd ? "" : values.hrsEnd,
        eventName: !values.eventName ? "" : values.eventName,
        isImportant: values.isImportant,
        isDone: null,
        eventContent: !values.eventContent ? "" : values.eventContent,
      };
      dispatch(addEvent(eventObj));
    } else {
      const eventObj = {
        _id: eventData._id,
        eventStart: !values.eventStart ? eventData.eventStart : startEvent,
        hrsStart: !values.hrsStart ? eventData.hrsStart : values.hrsStart,
        eventEnd: !values.eventEnd ? eventData.eventEnd : endEventChange,
        hrsEnd: !values.hrsEnd ? eventData.hrsEnd : values.hrsEnd,
        eventName: !values.eventName ? eventData.eventName : values.eventName,
        isImportant: !values.isImportant
          ? eventData.isImportant
          : values.isImportant,
        isDone: !values.isDone ? eventData.isDone : values.isDone,
        eventContent: !values.eventContent
          ? eventData.eventContent
          : values.eventContent,
      };
      dispatch(editEvent(eventObj));
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
              <div className={styles.element}>
                <Field
                  name="eventName"
                  initialValue={
                    eventData ? eventData.eventName : eventNameFromClientInfo
                  }
                >
                  {({ input, meta }) => (
                    <div>
                      <input type="text" placeholder="Tytuł" {...input} />
                      {meta.error && meta.touched && <span>{meta.error}</span>}
                    </div>
                  )}
                </Field>
              </div>
              <div className={styles.doubleElements}>
                <label htmlFor="eventStart">Start</label>
                <Field
                  name="eventStart"
                  initialValue={isEdit ? String(convertedEventStart) : null}
                >
                  {({ input, meta }) => (
                    <div>
                      <input type="date" {...input} id="eventStart" />
                      {meta.error && meta.touched && <span>{meta.error}</span>}
                    </div>
                  )}
                </Field>
                <Field
                  name="hrsStart"
                  initialValue={isEdit ? eventData.hrsStart : null}
                >
                  {({ input, meta }) => (
                    <div>
                      <input type="time" {...input} id="hrsStart" />
                      {meta.error && meta.touched && <span>{meta.error}</span>}
                    </div>
                  )}
                </Field>
              </div>
              <div className={styles.doubleElements}>
                <label htmlFor="eventEnd">Koniec</label>
                <Field
                  name="eventEnd"
                  initialValue={isEdit ? String(convertedEventEnd) : null}
                >
                  {({ input, meta }) => (
                    <div>
                      <input type="date" id="eventEnd" {...input} />
                      {meta.error && meta.touched && <span>{meta.error}</span>}
                    </div>
                  )}
                </Field>
                <Field
                  name="hrsEnd"
                  initialValue={isEdit ? eventData.hrsEnd : null}
                >
                  {({ input, meta }) => (
                    <div>
                      <input type="time" {...input} id="hrsEnd" />
                      {meta.error && meta.touched && <span>{meta.error}</span>}
                    </div>
                  )}
                </Field>
              </div>
              <div className={styles.selectedElements}>
                <div className={styles.warrning}>
                  <label>
                    <Field
                      name="isImportant"
                      component="input"
                      type="checkbox"
                      id="isImportant"
                      value="isImportant"
                      initialValue={isEdit ? eventData.isImportant : null}
                    />
                    <span>Ważne</span>
                  </label>
                </div>

                {!isEdit ? (
                  ""
                ) : (
                  <div className={styles.done}>
                    <label>
                      <Field
                        name="isDone"
                        component="input"
                        type="checkbox"
                        id="isDone"
                        value={new Date().toLocaleDateString()}
                        initialValue={isEdit ? eventData.isDone : null}
                      />
                      <span>Zakończone</span>
                    </label>
                  </div>
                )}
              </div>
              <div className={styles.contentElement}>
                <Field
                  name="eventContent"
                  initialValue={isEdit ? eventData.eventContent : null}
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
                <Button
                  name="wyjdź"
                  type="button"
                  onClick={handleCloseAddEventModal}
                />
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

export default AddEvent;
