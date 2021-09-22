import { useState } from "react";
import { Button } from "..";
import styles from "./helpViev.module.scss";

const required = (value) => (value ? undefined : "Pole wymagane");

const HelpViev = ({ openHelpPannel, setOpenHelpPannel }) => {
  const [status, setStatus] = useState(false);

  const handleCloseHelpPannel = () => {
    setOpenHelpPannel(false);
  };

  const showStatus = () => {
    setTimeout(() => {
      setStatus("");
    }, 4000);
  };

  const handleOnSubmit = (ev) => {
    ev.preventDefault();
    const form = ev.target;
    const data = new FormData(form);
    const xhr = new XMLHttpRequest();
    xhr.open(form.method, form.action);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onreadystatechange = () => {
      if (xhr.readyState !== XMLHttpRequest.DONE) return;
      if (xhr.status === 200) {
        form.reset();
        setStatus("SUCCESS");
        showStatus();
      } else {
        setStatus("ERROR");
        showStatus();
      }
    };
    xhr.send(data);
  };

  return (
    <div
      className={styles.wrapper}
      style={{
        right: `${!openHelpPannel ? "-100%" : "2%"}`,
        bottom: `${!openHelpPannel ? "-100%" : "2%"}`,
      }}
    >
      <div className={styles.tap} onClick={handleCloseHelpPannel}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 0 24 24"
          width="24px"
          fill="none"
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M10.09 15.59L11.5 17l5-5-5-5-1.41 1.41L12.67 11H3v2h9.67l-2.58 2.59zM19 3H5c-1.11 0-2 .9-2 2v4h2V5h14v14H5v-4H3v4c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />
        </svg>
      </div>
      <div className={styles.inside}>
        <form
          onSubmit={handleOnSubmit}
          action="https://formspree.io/f/xoqprbeg"
          method="POST"
        >
          <div className={styles.formItem}>
            <label htmlFor="problemItem">Wybierz rodzaj problemu</label>
            <select required id="problemItem" name="problemItem">
              <option value="instruction">instrukcja obsługi</option>
              <option value="dataAccess">dostęp do danych</option>
              <option value="application">działanie programu</option>
              <option value="permissions">brak uprawnień</option>
            </select>
          </div>
          <div className={styles.formItem}>
            <input type="text" placeholder="Twoje Imię" name="Name" required />
          </div>
          <div className={styles.formItem}>
            <input type="email" placeholder="Email" name="eMail" required />
          </div>
          <div className={styles.formItem}>
            <textarea
              name="textarea"
              rows="4"
              cols="100"
              placeholder="opisz problem"
            />
          </div>

          <div className={styles.formButton}>
            <Button type="submit" name="wyślij" />
          </div>
          {status === "SUCCESS" ? (
            <div className={styles.confirmation}>
              <p>
                Twoje zapytanie zostało wysłane - odpowiemy na nie jak
                najszybciej.
              </p>
            </div>
          ) : (
            ""
          )}
          {status === "ERROR" ? (
            <div className={styles.confirmation}>
              <p>Ooops! Pola formularza nie są wypełnione poprawnie.</p>
            </div>
          ) : (
            ""
          )}
        </form>
      </div>
    </div>
  );
};
export default HelpViev;
