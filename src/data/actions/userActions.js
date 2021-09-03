import request from "../../helpers/request";
import {
  cookieSet,
  cookieDel,
  addSpinner,
  getAllEvents,
  removeSpinner,
  timeoutShowTask,
} from "./index";
export const USER_ADD = "USER_ADD";
export const USER_DEL = "USER_DEL";
export const USER_LOGIN = "USER_LOGIN";

export const addUser = (userData) => async (dispatch) => {
  dispatch(addSpinner());
  const { data, status } = await request.post("users/add", userData);
  if (status === 200) {
    dispatch(removeSpinner());
    dispatch(timeoutShowTask(`Użytkownik ${userData.login} dodany`));
    dispatch({
      type: USER_ADD,
      isUserAdd: true,
    });
  } else {
    dispatch(removeSpinner());
    dispatch(timeoutShowTask(data.message));
  }
};
export const userLogin = (loginData) => async (dispatch) => {
  dispatch(addSpinner());
  const { data, status } = await request.post("users", loginData);
  if (status === 200) {
    dispatch(removeSpinner());
    dispatch(getAllEvents());
    dispatch({
      type: USER_LOGIN,
      payload: data,
    });
    dispatch(cookieSet());
    localStorage.setItem("sessionId", `${data.user.loginId}`);
  } else {
    dispatch(removeSpinner());
    dispatch(timeoutShowTask(data.message));
  }
};
export const addLogout = () => (dispatch) => {
  dispatch(cookieDel());
  localStorage.removeItem("sessionId");
  dispatch({
    type: USER_DEL,
  });
};
