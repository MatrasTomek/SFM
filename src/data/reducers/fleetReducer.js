import {
  ADD_FLEET,
  GET_FLEET,
  EDIT_FLEET,
  DEL_FLEET,
  CLEAR_FLEET,
} from "../actions";

const initialState = {};

export const fleetReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_FLEET:
      return state;
    // case EDIT_SUBC:
    //   return (state = action.payload);
    // case DEL_SUBC:
    //   return initialState;
    // case CLEAR_SUB:
    //   return initialState;

    default:
      // console.warn(`Nie ma akcji typu ${action.type}`);
      return state;
  }
};
