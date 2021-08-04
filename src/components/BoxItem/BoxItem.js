import { useState } from "react";

import { Fleet, Info } from "../DataItems";
import styles from "./boxItem.module.scss";

const BoxItem = ({ isFound = false }) => {
  const [positionB1, setPositionB1] = useState(true);
  const [positionB2, setPositionB2] = useState(false);
  const [positionB3, setPositionB3] = useState(false);
  const [positionB4, setPositionB4] = useState(false);

  const menuItems = [
    { id: 1, name: "Dane", style: positionB1 },
    { id: 2, name: "Flota", style: positionB2 },
    { id: 3, name: "Ceny", style: positionB3 },
    { id: 4, name: "Umowy", style: positionB4 },
  ];

  const handleChangePosition = (e) => {
    const selectedId = e.target.id;
    menuItems.forEach((item) => {
      item.style = false;
      if (item.id === Number(selectedId)) {
        item.style = true;
      }
    });

    if (selectedId === "1") {
      setPositionB1(true);
      setPositionB2(false);
      setPositionB3(false);
      setPositionB4(false);
    } else if (selectedId === "2") {
      setPositionB1(false);
      setPositionB2(true);
      setPositionB3(false);
      setPositionB4(false);
    } else if (selectedId === "3") {
      setPositionB1(false);
      setPositionB2(false);
      setPositionB3(true);
      setPositionB4(false);
    } else if (selectedId === "4") {
      setPositionB1(false);
      setPositionB2(false);
      setPositionB3(false);
      setPositionB4(true);
    }
  };

  const menuItemsViev = menuItems.map((item) => {
    const { id, style, name } = item;
    return (
      <div
        key={id}
        id={id}
        onClick={handleChangePosition}
        className={`${style ? styles.selected : styles.item}`}
      >
        {name}
      </div>
    );
  });

  return (
    <div className={styles.wrapper}>
      <div className={styles.menu}>{menuItemsViev}</div>
      <div
        className={styles.box}
        style={{ left: `${positionB1 ? "50%" : "150%"}` }}
      >
        <Info found={isFound} />
      </div>
      <div
        className={styles.box}
        style={{ left: `${positionB2 ? "50%" : "150%"}` }}
      >
        <Fleet />
      </div>
      <div
        className={styles.box}
        style={{ left: `${positionB3 ? "50%" : "150%"}` }}
      ></div>
      <div
        className={styles.box}
        style={{ left: `${positionB4 ? "50%" : "150%"}` }}
      ></div>
    </div>
  );
};

export default BoxItem;
