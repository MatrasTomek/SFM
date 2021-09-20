import { combineReducers } from "redux";

import { cookieReducer } from "./cookieReducer";
import { currencyReducer } from "./currencyReducer";
import { eventReducer } from "./eventReducer";
import { loginReducer } from "./userReducer";
import { subcontractorReducer } from "./subcontractorReducer";
import { spinnerReducer } from "./spinnerReducer";
import { taskReducer } from "./taskReducer";

export const rootReducer = combineReducers({
  cookie: cookieReducer,
  currency: currencyReducer,
  event: eventReducer,
  subcontractor: subcontractorReducer,
  spinner: spinnerReducer,
  task: taskReducer,
  user: loginReducer,
});
