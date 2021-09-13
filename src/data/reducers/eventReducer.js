import {
  ADD_EVENT,
  GET_EVENTS,
  EDIT_EVENT,
  DEL_EVENT,
  CLEAR_EVENT,
} from "../actions";

const initialState = [];

export const eventReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_EVENTS:
      return (state = action.payload.data);
    case ADD_EVENT:
      return [...state, action.payload];
    case EDIT_EVENT:
      const index = state.findIndex((item) => item._id === action.payload._id);
      state.splice(index, 1, action.payload);
      return [...state];
    case DEL_EVENT:
      return state.filter((item) => item._id !== action.payload);

    case CLEAR_EVENT:
      return initialState;

    default:
      // console.warn(`Nie ma akcji typu ${action.type}`);
      return state;
  }
};
