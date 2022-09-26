import { Form, Field } from "react-final-form";
import { Button, Modal } from "../../components";
import { QUESTIONS } from "../../helpers/questions";
import styles from "./questions.module.scss";

const required = (value) => (value ? undefined : "Pole wymagane");

const QuestionsForm = ({ isModalOpen, setIsModalOpen }) => {
  const handleCloseQuestionModal = () => {
    setIsModalOpen(false);
  };

  const selectQuestion = QUESTIONS.map((item) => (
    <option key={item.id}>{item.name}</option>
  ));

  const handleOnSubmit = () => {};
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
                <label htmlFor="questionName">Wybierz temat zapytania</label>
                <Field name="questionName" validate={required} initialValue="">
                  {({ input, meta }) => (
                    <div>
                      <select id="questionName" {...input}>
                        {selectQuestion}
                      </select>
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
                      initialValue=""
                    />
                    <span>Ważne</span>
                  </label>
                </div>
              </div>
              <div className={styles.contentElement}>
                <Field name="questionContent" initialValue="">
                  {({ input, meta }) => (
                    <div>
                      <textarea
                        placeholder="wpisz treść zapytania"
                        type="text"
                        rows="3"
                        cols="25"
                        {...input}
                      />
                      {meta.error && meta.touched && <span>{meta.error}</span>}
                    </div>
                  )}
                </Field>
              </div>

              <div className={styles.buttons}>
                <Button
                  name="wyjdź"
                  type="button"
                  onClick={handleCloseQuestionModal}
                />
                <Button name="wyślij" type="submit" />
              </div>
            </form>
          )}
        />
      </div>
    </Modal>
  );
};
export default QuestionsForm;
