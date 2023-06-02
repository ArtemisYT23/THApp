import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { userReducer } from "./userReducer";
import { employeeReducer } from "./employeeReducer";
import { checkReducer } from "./checkReducer";
import { saReducer } from "./saReducer";
import { homeReducer } from "./homeReducer";
import ReportReducer from "./ReportDataReducer";

const rootReducer = combineReducers({
  user: userReducer,
  check: checkReducer,
  sa: saReducer,
  employee: employeeReducer,
  home: homeReducer,
  reportState: ReportReducer,
});

export default function generateStore() {
  const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
  );
  return store;
}
