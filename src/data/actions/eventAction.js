import request from "../../helpers/request";
import { addSpinner, removeSpinner, timeoutShowTask } from "./index";

export const ADD_EVENT = "ADD_EVENT";
export const GET_EVENTS = "GET_EVENTS";
export const EDIT_EVENT = "EDIT_EVENT";
export const DEL_EVENT = "DEL_EVENT";
export const CLEAR_EVENT = "CLEAR_EVENT";

export const getAllEvents = () => async (dispatch) => {
  dispatch(addSpinner());
  const { data, status } = await request.get("/events");
  if (status === 200) {
    dispatch(removeSpinner());

    dispatch({
      type: GET_EVENTS,
      payload: data,
    });
  } else {
    dispatch(removeSpinner());
    dispatch(
      timeoutShowTask(
        "Przepraszamy błąd po stronie serwera, spróbuj jeszcze raz"
      )
    );
    console.log(data.message);
  }
};

export const addEvent = (eventObj) => async (dispatch) => {
  dispatch(addSpinner());
  const { data, status } = await request.post("/events", eventObj);
  if (status === 201) {
    dispatch(removeSpinner());
    dispatch(timeoutShowTask(`Zdarzenie dodane`));
    dispatch({
      type: ADD_EVENT,
      payload: data.data,
    });
  } else {
    dispatch(removeSpinner());
    dispatch(
      timeoutShowTask(
        `Przepraszamy błąd po stronie serwera, spróbuj jeszcze raz`
      )
    );
    console.log(data.message);
  }
};
export const editEvent = (eventObj) => async (dispatch) => {
  dispatch(addSpinner());
  const { data, status } = await request.put("/events", eventObj);
  if (status === 202) {
    dispatch(removeSpinner());
    dispatch(timeoutShowTask(`Zdarzenie zaktualizowane`));
    dispatch({
      type: EDIT_EVENT,
      payload: data.data,
    });
  } else if (status === 404) {
    dispatch(removeSpinner());
    dispatch(
      timeoutShowTask("W tym momencie nie jest możliwe dodanie zasobów")
    );
  } else {
    dispatch(removeSpinner());
    dispatch(
      timeoutShowTask(
        `Przepraszamy błąd po stronie serwera, spróbuj jeszcze raz`
      )
    );
    console.log(data.message);
  }
};

export const deleteEvent = (_id) => async (dispatch) => {
  dispatch(addSpinner());
  const { data, status } = await request.delete(`events/${_id}`);
  if (status === 200) {
    dispatch(removeSpinner());
    dispatch(timeoutShowTask(`Zdarzenie usuniete`));
    dispatch({
      type: DEL_EVENT,
      payload: _id,
    });
  } else if (status === 404) {
    dispatch(removeSpinner());
    dispatch(timeoutShowTask("Nie ma zdarzenia do usunięcia"));
  } else {
    dispatch(removeSpinner());
    dispatch(
      timeoutShowTask(
        `Przepraszamy błąd po stronie serwera, spróbuj jeszcze raz`
      )
    );
    console.log(data.message);
  }
};

export const clearEvent = () => ({
  type: CLEAR_EVENT,
});
