import { GET_EUR_RATES, GET_USD_RATES } from "../actions";

export const currencyReducer = (state = [], action) => {
  switch (action.type) {
    case GET_EUR_RATES:
      return [...state, action.payload[0]];
    case GET_USD_RATES:
      return [...state, action.payload[0]];
    default:
      // console.warn(`Nie ma akcji typu ${action.type}`);
      return state;
  }
};
