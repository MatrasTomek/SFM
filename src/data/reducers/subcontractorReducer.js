import { ADD_SUBC, GET_SUBC, EDIT_SUBC, DEL_SUBC, CLEAR_SUB } from "../actions";

const initialState = false;

export const subcontractorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_SUBC:
      return (state = action.payload);
    case EDIT_SUBC:
      return (state = action.payload);
    case DEL_SUBC:
      return initialState;
    case CLEAR_SUB:
      return initialState;

    default:
      // console.warn(`Nie ma akcji typu ${action.type}`);
      return state;
  }
};
