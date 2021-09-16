import { addSpinner, removeSpinner } from "./index";
import { currencyValueEUR } from "../../helpers/currencyValue";
export const GET_RATES = "GET_RATES";

export const getCurrencyRates = () => async (dispatch) => {
  dispatch(addSpinner());
  const { data } = await currencyValueEUR();
  if (data) {
    dispatch(removeSpinner());
    console.log(data);
    // dispatch({
    //   type: GET_RATES,
    //   payload: data,
    // });
  } else {
    dispatch(removeSpinner());

    console.log(data.message);
  }
};
