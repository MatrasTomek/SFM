import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AsideMenu, BoxItem } from "../../components";
import {
  getAllSubcontractors,
  getOneSubcontractor,
  clearSubcontarctor,
  showFoundSubcontractor,
} from "../../data/actions";
import { Button } from "../../components";
import styles from "./find.module.scss";

const FindSubcontractor = () => {
  const subcontractors = useSelector((store) => store.subcontractor.data);
  const dispatch = useDispatch();

  const [itemToFind, setItemToFind] = useState(false);
  const [searchCriteria, setSearchCriteria] = useState("vatNo");

  const handleGetAllData = () => {
    dispatch(clearSubcontarctor());
    dispatch(getAllSubcontractors());
  };

  const handleSetSearchCriteria = (e) => {
    setSearchCriteria(e.target.value);
  };

  const handleSelectItem = (e) => {
    const index = e.target.id;
    const selectedItem = {
      data: subcontractors[index],
    };
    dispatch(showFoundSubcontractor(selectedItem));
  };

  const handleSetSubcontractorNo = (e) => {
    e.preventDefault();
    console.log();
    setItemToFind(e.target.value);
  };
  const handleSearchSubcontractor = (e) => {
    e.preventDefault();
    const searchingItem = {
      searchCriteria: searchCriteria,
      itemToFind: itemToFind,
    };
    dispatch(getOneSubcontractor(searchingItem));
  };

  const contentViev = !subcontractors ? (
    ""
  ) : subcontractors.length >= 1 ? (
    subcontractors.map((item, index) => (
      <div
        key={item._id}
        className={styles.infoItem}
        onClick={handleSelectItem}
        id={index}
      >
        <p onClick={handleSelectItem} id={index}>
          {item.carrierName}
        </p>
      </div>
    ))
  ) : (
    <BoxItem isFound={true} />
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.buttons}>
        <Button
          name="pobierz wszystko"
          type="button"
          onClick={handleGetAllData}
        />
        <div className={styles.search}>
          <form onSubmit={handleSearchSubcontractor}>
            <select name="findCriteria" onChange={handleSetSearchCriteria}>
              <option value="vatNo">wyszukaj po nr. Nip</option>
              <option value="carrierName">wyszukaj po nazwie</option>
            </select>
            <input
              type="text"
              placeholder="wpisz nip lub nazwę"
              onChange={handleSetSubcontractorNo}
            />
            <button type="submit" className={styles.icon}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                enableBackground="new 0 0 24 24"
                height="24px"
                viewBox="0 0 24 24"
                width="24px"
                fill="rgb(216, 145, 2)"
              >
                <g>
                  <rect fill="none" height="24" width="24" />
                </g>
                <g>
                  <g>
                    <circle cx="10" cy="8" r="4" />
                    <path d="M10.35,14.01C7.62,13.91,2,15.27,2,18v2h9.54C9.07,17.24,10.31,14.11,10.35,14.01z" />
                    <path d="M19.43,18.02C19.79,17.43,20,16.74,20,16c0-2.21-1.79-4-4-4s-4,1.79-4,4c0,2.21,1.79,4,4,4c0.74,0,1.43-0.22,2.02-0.57 L20.59,22L22,20.59L19.43,18.02z M16,18c-1.1,0-2-0.9-2-2c0-1.1,0.9-2,2-2s2,0.9,2,2C18,17.1,17.1,18,16,18z" />
                  </g>
                </g>
              </svg>
            </button>
          </form>
        </div>
      </div>
      <div className={styles.info}>{contentViev}</div>
      <AsideMenu />
    </div>
  );
};

export default FindSubcontractor;
