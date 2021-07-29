import request from "../../helpers/request";
import { addSpinner, removeSpinner, timeoutShowTask } from "./index";

export const ADD_SUBC = "ADD_SUBC";
export const GET_SUBC = "GET_SUBC";
export const EDIT_SUBC = "EDIT_SUBC";
export const DEL_SUBC = "DEL_SUBC";
export const CLEAR_SUB = "CLEAR_SUB";
export const FLEET_ACTIONS = "FLEET_ACTIONS";

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
  } else {
    dispatch(removeSpinner());
    dispatch(timeoutShowTask(data.message));
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
  } else {
    dispatch(removeSpinner());
    dispatch(timeoutShowTask(data.message));
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
  } else {
    dispatch(removeSpinner());
    dispatch(timeoutShowTask(data.message));
  }
};

export const clearSubcontarctor = () => ({
  type: CLEAR_SUB,
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
  } else {
    dispatch(removeSpinner());
    dispatch(timeoutShowTask(data.message));
  }
};
