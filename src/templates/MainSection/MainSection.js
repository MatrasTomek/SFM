import { useSelector } from "react-redux";
import LogIn from "../LogIn-viev";
import Start from "../Start-viev";
import styles from "./mainSection.module.scss";

function MainSection() {
  const user = useSelector((store) => store.user);
  const cookie = useSelector((store) => store.cookie[0]);

  const mainViev = user.length || cookie.isCookie ? <Start /> : <LogIn />;

  return <div className={styles.wrapper}>{mainViev}</div>;
}

export default MainSection;
