import {
  addCookie,
  deleteCoockie,
  checkCookie,
} from "../../helpers/cookieSession";

export const COOKIE_SET = "COOKIE_SET";
export const COOKIE_DELETE = "COOKIE_DELETE";

export const cookieSet = () => async (dispatch) => {
  addCookie();
  dispatch({
    type: COOKIE_SET,
    isCookie: true,
  });
};
export const cookieCheck = () => async (dispatch) => {
  if (!checkCookie()) {
    return;
  } else {
    dispatch({
      type: COOKIE_SET,
      isCookie: true,
    });
  }
};
export const cookieDel = () => async (dispatch) => {
  deleteCoockie();
  dispatch({
    type: COOKIE_DELETE,
    isCookie: false,
  });
};
