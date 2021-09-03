import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllEvents } from "../../data/actions";
import { AsideMenu } from "../../components";

import styles from "./start.module.scss";

const Start = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllEvents());
  }, [dispatch]);

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
