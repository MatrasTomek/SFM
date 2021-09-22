import { AsideMenu, BoxItem } from "../../components";
import styles from "./addSubcontractor.module.scss";

const AddSubcontractor = () => {
  return (
    <div className={styles.wrapper}>
      <div>
        <BoxItem isSave={false} isFound={false} />
      </div>
      <AsideMenu />
    </div>
  );
};
export default AddSubcontractor;
