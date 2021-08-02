import request from "../../helpers/request";
import { addSpinner, removeSpinner, timeoutShowTask } from "./index";

export const ADD_SUBC = "ADD_SUBC";
export const GET_SUBC = "GET_SUBC";
export const EDIT_SUBC = "EDIT_SUBC";
export const DEL_SUBC = "DEL_SUBC";
export const CLEAR_SUB = "CLEAR_SUB";
export const SHOW_FOUND_SUB = "SHOW_FOUND_SUB";
export const FLEET_ACTIONS = "FLEET_ACTIONS";

export const getAllSubcontractors = () => async (dispatch) => {
  dispatch(addSpinner());
  const { data, status } = await request.get("/subcontractor");
  if (status === 200) {
    dispatch(removeSpinner());

    dispatch({
      type: GET_SUBC,
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

export const getOneSubcontractor = (dataToFind) => async (dispatch) => {
  dispatch(addSpinner());
  const { searchCriteria, itemToFind } = dataToFind;
  const { data, status } = await request.get(
    `/subcontractor/${searchCriteria}.${itemToFind}`
  );
  if (status === 200) {
    dispatch(removeSpinner());
    console.log(data);
    dispatch({
      type: GET_SUBC,
      payload: data,
    });
  } else if (status === 404) {
    dispatch(removeSpinner());
    if (searchCriteria === "vatNo") {
      dispatch(
        timeoutShowTask(`Nie ma przewoźnika z numerem nip: ${itemToFind}`)
      );
    } else {
      dispatch(
        timeoutShowTask(`Nie ma przewoźnika zawierającego nazwę: ${itemToFind}`)
      );
    }
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

export const addSubcontractor = (subcontractorData) => async (dispatch) => {
  dispatch(addSpinner());
  const { data, status } = await request.post(
    "/subcontractor",
    subcontractorData
  );
  if (status === 201) {
    dispatch(removeSpinner());
    dispatch(timeoutShowTask(`Przewoźnik dodany`));
    dispatch({
      type: ADD_SUBC,
      payload: data,
    });
  } else if (status === 409) {
    dispatch(removeSpinner());
    dispatch(
      timeoutShowTask(
        `Przewoźnik o numerze Nip: ${data.message} istnieje w bazie`
      )
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
export const editSubcontractor = (subcontractorData) => async (dispatch) => {
  dispatch(addSpinner());
  const { data, status } = await request.put(
    "/subcontractor",
    subcontractorData
  );
  if (status === 202) {
    dispatch(removeSpinner());
    dispatch(timeoutShowTask(`Dane przewoźnika zmienione`));
    dispatch({
      type: EDIT_SUBC,
      payload: data,
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

export const deleteSubcontractor = (id) => async (dispatch) => {
  dispatch(addSpinner());
  const { data, status } = await request.delete(`subcontractor/${id}`);
  if (status === 200) {
    dispatch(removeSpinner());
    dispatch(timeoutShowTask(`Przewoźnik usunięty`));
    dispatch({
      type: DEL_SUBC,
    });
  } else if (status === 404) {
    dispatch(removeSpinner());
    dispatch(timeoutShowTask("Nie ma przewoźnika do usunięcia"));
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

export const clearSubcontarctor = () => ({
  type: CLEAR_SUB,
});

export const showFoundSubcontractor = (subcontractorData) => ({
  type: SHOW_FOUND_SUB,
  payload: subcontractorData,
});

export const allFleetActions = (fleetData) => async (dispatch) => {
  dispatch(addSpinner());
  const { data, status } = await request.put("/fleet", fleetData);
  if (status === 202) {
    dispatch(removeSpinner());
    dispatch({
      type: FLEET_ACTIONS,
      payload: data,
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
