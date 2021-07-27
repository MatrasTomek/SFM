import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addLogout, cookieCheck } from "../../data/actions";
import { Button } from "../../components";

import styles from "./header.module.scss";

const Header = () => {
  const cookie = useSelector((store) => store.cookie[0]);
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(cookieCheck());
  }, []);

  const handleOnLogOut = () => {
    dispatch(addLogout());
  };

  const LogOutButtonViev =
    user.length || cookie.isCookie ? (
      <Button type="button" name="wyloguj" onClick={handleOnLogOut} />
    ) : (
      ""
    );

  return (
    <div className={styles.wrapper}>
      <div className={styles.logo}>SFM</div>
      <div className={styles.info}>
        <p>help</p>
        <p>mail</p>
        <p>lang?</p>
      </div>
      {LogOutButtonViev}
    </div>
  );
};

export default Header;
