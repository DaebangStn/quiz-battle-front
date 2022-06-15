import { combineReducers } from "redux";
import user from "./userReducer";
import page from "./pageReducer";

const rootReducer = combineReducers({
  user,
  page,
});

export default rootReducer;
