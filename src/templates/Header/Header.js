import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addLogout, cookieCheck } from "../../data/actions";
import { Button, HelpViev } from "../../components";

import styles from "./header.module.scss";

const Header = () => {
  const cookie = useSelector((store) => store.cookie[0]);
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const [openHelpPannel, setOpenHelpPannel] = useState(false);

  const handleOpenHelpPannel = () => {
    setOpenHelpPannel(true);
  };

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
      <div className={styles.logo}>
        <img src="/images/logo.png" alt="Logo SFM" />
      </div>
      <div className={styles.info}>
        <p onClick={handleOpenHelpPannel}>Pomoc</p>
        <Link to="/contact">Kontakt</Link>
      </div>
      {LogOutButtonViev}
      <HelpViev
        openHelpPannel={openHelpPannel}
        setOpenHelpPannel={setOpenHelpPannel}
      />
    </div>
  );
};

export default Header;
