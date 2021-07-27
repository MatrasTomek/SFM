import { AsideMenu } from "../../components";

import styles from "./start.module.scss";

const Start = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.info}>
        <p>Tu będą pojawiać się przypomnienia i sprawy</p>
      </div>

      <AsideMenu />
    </div>
  );
};

export default Start;
