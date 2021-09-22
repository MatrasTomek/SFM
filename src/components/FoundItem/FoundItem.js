import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { showFoundSubcontractor } from "../../data/actions";
import { Button } from "../../components";
import styles from "./foundItem.module.scss";

const FoundItem = ({ item }) => {
  const subcontractors = useSelector((store) => store.subcontractor.data);
  const dispatch = useDispatch();
  const history = useHistory();

  const [showDetails, setShowDetails] = useState(false);

  const handleOpenDetails = () => {
    setShowDetails(!showDetails);
  };

  const handleGoToCard = () => {
    const id = item._id;
    const itemToShow = subcontractors.find((item) => item._id === id);

    const selectedItem = {
      data: itemToShow,
    };
    dispatch(showFoundSubcontractor(selectedItem));
    history.push("/find-subcontractor");
  };

  return (
    <div className={styles.foundItem}>
      <h4>{item.carrierName}</h4>
      <div
        className={styles.itemDetails}
        style={{ display: `${!showDetails ? "none" : "block"}` }}
      >
        <p>{item.city}</p>
        <p>{item.zip}</p>
        <p>{item.mail}</p>
        <p>{item.phone}</p>
        <p>ilość pojazdów {item.fleetSize}</p>
        <p>
          główne kierunki: {item.topDir1}, {item.topDir2}, {item.topDir3}
        </p>
      </div>
      <div className={styles.buttons}>
        <div style={{ display: `${!showDetails ? "none" : "block"}` }}>
          <Button
            name="przejdź do karty"
            type="button"
            onClick={handleGoToCard}
          />
        </div>
        <Button
          id={item._id}
          name={!showDetails ? "szczegóły" : "ukryj"}
          type="button"
          onClick={handleOpenDetails}
        />
      </div>
    </div>
  );
};
export default FoundItem;
