import styles from "./contsct.module.scss";

const Contact = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.inside}>
        <header>
          <div className={styles.menu}></div>
          <div className={styles.info}></div>
          <div className={styles.media}></div>
        </header>
        <section>
          <div className={styles.projects}></div>
          <div className={styles.contactForm}></div>
        </section>
        <footer>
          <div className={styles.info}></div>
        </footer>
      </div>
    </div>
  );
};

export default Contact;
