import { combineReducers } from "redux";

import { cookieReducer } from "./cookieReducer";
import { fleetReducer } from "./fleetReducer";
import { loginReducer } from "./userReducer";
import { subcontractorReducer } from "./subcontractorReducer";
import { spinnerReducer } from "./spinnerReducer";
import { taskReducer } from "./taskReducer";

export const rootReducer = combineReducers({
  cookie: cookieReducer,
  fleet: fleetReducer,
  subcontractor: subcontractorReducer,
  spinner: spinnerReducer,
  task: taskReducer,
  user: loginReducer,
});
