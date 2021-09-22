import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSubcontractors } from "../../data/actions";
import { Form, Field } from "react-final-form";
import { AsideMenu, Button, FoundItem } from "../../components";
import { COUNTRIES } from "../../helpers/countires";
import { FLEETS } from "../../helpers/fleets";
import styles from "./statistics.module.scss";

const Statistics = () => {
  const subcontractors = useSelector((store) => store.subcontractor.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllSubcontractors());
  }, []);

  const [foundItems, setFoundItems] = useState("");

  const serchingItemsFromSelectedParams = (values) => {
    const foundByZip = [];
    const foundByCity = [];
    const foundByFleetSize = [];
    const foundByKindOf = [];
    const foundByTopDir = [];
    const foundByKindOfFleet = [];
    const foundByAdrOrFrigo = [];

    subcontractors.map((item) => {
      if (!values.zip) {
        foundByZip.push(item);
      } else if (values.zip.length === 1) {
        if (item.zip.slice(0, 1) === values.zip) {
          foundByZip.push(item);
        }
      } else if (values.zip.length === 2) {
        if (item.zip.slice(0, 2) === values.zip) {
          foundByZip.push(item);
        }
      } else {
        if (item.zip === values.zip) {
          foundByZip.push(item);
        }
      }
      return foundByZip;
    });
    foundByZip.map((item) => {
      if (item.city === values.city || !values.city) {
        foundByCity.push(item);
      }
      return foundByCity;
    });

    foundByCity.map((item) => {
      if (item.fleetSize === Number(values.fleetSize) || !values.fleetSize) {
        foundByFleetSize.push(item);
      }
      return foundByFleetSize;
    });
    foundByFleetSize.map((item) => {
      if (item.kindOf === values.kindOf || !values.kindOf) {
        foundByKindOf.push(item);
      }
      return foundByKindOf;
    });
    foundByKindOf.map((item) => {
      if (
        item.topDir1 === values.topDir ||
        item.topDir2 === values.topDir ||
        item.topDir3 === values.topDir ||
        !values.topDir
      ) {
        foundByTopDir.push(item);
      }
      return foundByTopDir;
    });
    foundByTopDir.map((item) => {
      if (!values.kindOfFleet) {
        foundByKindOfFleet.push(item);
      } else {
        const kindOfFleetResult = item.fleet.find(
          ({ kindOfFleet }) => kindOfFleet === values.kindOfFleet
        );
        if (kindOfFleetResult) {
          foundByKindOfFleet.push(item);
        }
      }
      return foundByKindOfFleet;
    });
    foundByKindOfFleet.map((item) => {
      if (values.adr && !values.frigo) {
        const adrResult = item.fleet.find(({ adr }) => adr === true);
        if (adrResult) {
          foundByAdrOrFrigo.push(item);
          setFoundItems(foundByAdrOrFrigo);
        }
      } else if (!values.adr && values.frigo) {
        const frigoResult = item.fleet.find(({ frigo }) => frigo === true);
        if (frigoResult) {
          foundByAdrOrFrigo.push(item);
          setFoundItems(foundByAdrOrFrigo);
        }
      } else {
        foundByAdrOrFrigo.push(item);
        setFoundItems(foundByAdrOrFrigo);
      }
      return foundByAdrOrFrigo;
    });
  };

  const foundItemsViev = !foundItems.length ? (
    <h3>Nie znaleziono danych do zapytania</h3>
  ) : (
    foundItems.map((item, index) => <FoundItem key={item._id} item={item} />)
  );

  const handleOnSubmit = (values) => {
    setFoundItems("");
    serchingItemsFromSelectedParams(values);
  };
  const countiresSelector = COUNTRIES.map((country) => (
    <option key={country.id}>{country.id}</option>
  ));
  const fleetOption = FLEETS.map((item) => (
    <option key={item.id}>{item.name}</option>
  ));
  return (
    <div className={styles.wrapper}>
      <div className={styles.selectors}>
        <Form
          onSubmit={handleOnSubmit}
          render={({ handleSubmit, form, submitting, pristine, values }) => (
            <form
              className={styles.form}
              onSubmit={(event) => {
                const promise = handleSubmit(event);
                promise &&
                  promise.then(() => {
                    form.reset();
                  });
                return promise;
              }}
            >
              <div className={styles.cityAndZip}>
                <div>
                  <Field
                    name="zip"
                    component="input"
                    type="zip-code"
                    placeholder="kod 1,2 cyfry lub pełny"
                  />
                </div>
                <div>
                  <Field
                    name="city"
                    component="input"
                    type="text"
                    placeholder="miasto"
                  />
                </div>
                <div>
                  <Field
                    name="fleetSize"
                    component="input"
                    type="number"
                    placeholder="Wielkość floty"
                  />
                </div>
              </div>
              <div className={styles.kindOfTransport}>
                <p>Rodzaj transportu</p>
                <div>
                  <Field
                    id="upTo"
                    name="kindOf"
                    component="input"
                    type="radio"
                    value="upTo3.5T"
                  />{" "}
                  <label htmlFor="upTo">do 3.5T</label>
                  <Field
                    id="over"
                    name="kindOf"
                    component="input"
                    type="radio"
                    value="over3.5T"
                  />{" "}
                  <label htmlFor="over"> powyżej 3.5T</label>
                  <Field
                    id="all"
                    name="kindOf"
                    component="input"
                    type="radio"
                    value=""
                  />{" "}
                  <label htmlFor="all">wszystko</label>
                </div>
              </div>
              <div className={styles.dirAndKind}>
                <div>
                  <label htmlFor="dir">Kierunek</label>
                  <Field name="topDir" component="select" id="dir">
                    {countiresSelector}
                  </Field>
                </div>
                <div>
                  <label htmlFor="kindVech">Rodzaj pojazdu</label>
                  <Field name="kindOfFleet" component="select" id="kindVech">
                    {fleetOption}
                  </Field>
                </div>
              </div>
              <div className={styles.specialEq}>
                <label>
                  <Field
                    id="adr"
                    name="adr"
                    component="input"
                    type="checkbox"
                  />
                  <span>ADR</span>
                </label>

                <label>
                  <Field
                    id="frigo"
                    name="frigo"
                    component="input"
                    type="checkbox"
                  />
                  <span>Kontrola temp.</span>
                </label>
              </div>
              <div className={styles.buttons}>
                {!subcontractors || !subcontractors.length ? (
                  ""
                ) : (
                  <Button type="submit" name="pokaż" />
                )}
              </div>
            </form>
          )}
        />
      </div>
      <div className={styles.informations}>{foundItemsViev}</div>
      <AsideMenu />
    </div>
  );
};
export default Statistics;
