import {
  ADD_SUBC,
  GET_SUBC,
  EDIT_SUBC,
  DEL_SUBC,
  CLEAR_SUB,
  SHOW_FOUND_SUB,
  FLEET_ACTIONS,
} from "../actions";

const initialState = false;

export const subcontractorReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SUBC:
      return (state = action.payload);
    case ADD_SUBC:
      return (state = action.payload);
    case EDIT_SUBC:
      return (state = action.payload);
    case DEL_SUBC:
      return initialState;
    case CLEAR_SUB:
      return initialState;
    case SHOW_FOUND_SUB:
      return (state = action.payload);
    case FLEET_ACTIONS:
      return (state = action.payload);

    default:
      // console.warn(`Nie ma akcji typu ${action.type}`);
      return state;
  }
};
