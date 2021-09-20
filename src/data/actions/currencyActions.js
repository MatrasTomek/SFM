import { addSpinner, removeSpinner } from "./index";
export const GET_EUR_RATES = "GET_EUR_RATES";
export const GET_USD_RATES = "GET_USD_RATES";
const urlEur = `http://api.nbp.pl/api/exchangerates/rates/A/EUR/last/`;
const urlUsd = `http://api.nbp.pl/api/exchangerates/rates/A/USD/last/`;

export const getEurRates = () => (dispatch) => {
  dispatch(addSpinner());
  fetch(urlEur)
    .then((res) => {
      if (res.status !== 200) {
        dispatch(removeSpinner());
        return { status: "404" };
      } else {
        dispatch(removeSpinner());
        return res.json();
      }
    })
    .then((json) => {
      if (json.status === "404") {
        dispatch(removeSpinner());
        return console.log(`Nie ma kursu waluty w podanej dacie`);
      } else {
        dispatch(removeSpinner());
        dispatch({
          type: GET_EUR_RATES,
          payload: json.rates,
        });
      }
    })

    .catch(function (e) {
      console.log(e);
      dispatch(removeSpinner());
      return console.log("podaj datę");
    });
};

export const getUsdRates = () => (dispatch) => {
  dispatch(addSpinner());
  fetch(urlUsd)
    .then((res) => {
      if (res.status !== 200) {
        dispatch(removeSpinner());
        return { status: "404" };
      } else {
        dispatch(removeSpinner());
        return res.json();
      }
    })
    .then((json) => {
      if (json.status === "404") {
        dispatch(removeSpinner());
        return console.log(`Nie ma kursu waluty w podanej dacie`);
      } else {
        dispatch(removeSpinner());
        dispatch({
          type: GET_USD_RATES,
          payload: json.rates,
        });
      }
    })

    .catch(function (e) {
      console.log(e);
      dispatch(removeSpinner());
      return console.log("podaj datę");
    });
};
