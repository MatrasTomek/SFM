import { USER_ADD, USER_DEL, USER_LOGIN } from "../actions";

export const loginReducer = (state = [], action) => {
  switch (action.type) {
    case USER_ADD:
      return [];
    case USER_LOGIN:
      return [action.payload];
    case USER_DEL:
      return [];
    default:
      // console.warn(`Nie ma akcji typu ${action.type}`);
      return state;
  }
};
