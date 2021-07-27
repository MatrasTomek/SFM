import request from "../../helpers/request";
import { addSpinner, removeSpinner, timeoutShowTask } from "./index";

export const ADD_FLEET = "ADD_FLEET";
export const GET_FLEET = "GET_FLEET";
export const EDIT_FLEET = "EDIT_FLEET";
export const DEL_FLEET = "DEL_FLEET";
export const CLEAR_FLEET = "CLEAR_FLEET";

export const allFleetActions = (fleetData) => async (dispatch) => {
  dispatch(addSpinner());
  const { data, status } = await request.put("/fleet", fleetData);
  if (status === 202) {
    dispatch(removeSpinner());
    dispatch(timeoutShowTask("Flota zaktualizowana"));
    dispatch({
      type: ADD_FLEET,
    });
  } else {
    dispatch(removeSpinner());
    dispatch(timeoutShowTask(data.message));
  }
};
// export const editSubcontractor = (subcontractorData) => async (dispatch) => {
//   dispatch(addSpinner());
//   const { data, status } = await request.put(
//     "/subcontractor",
//     subcontractorData
//   );
//   if (status === 202) {
//     dispatch(removeSpinner());
//     dispatch(timeoutShowTask(`Dane przewoźnika zmienione`));
//     dispatch({
//       type: EDIT_SUBC,
//       payload: data,
//     });
//   } else {
//     dispatch(removeSpinner());
//     dispatch(timeoutShowTask(data.message));
//   }
// };

// export const deleteSubcontractor = (id) => async (dispatch) => {
//   dispatch(addSpinner());
//   const { data, status } = await request.delete(`subcontractor/${id}`);
//   if (status === 200) {
//     dispatch(removeSpinner());
//     dispatch(timeoutShowTask(`Przewoźnik usunięty`));
//     dispatch({
//       type: DEL_SUBC,
//     });
//   } else {
//     dispatch(removeSpinner());
//     dispatch(timeoutShowTask(data.message));
//   }
// };

// export const clearSubcontarctor = () => ({
//   type: CLEAR_SUB,
// });
