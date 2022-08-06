import { combineReducers } from "redux";
import gramReducer from "./gramReducer";

export default combineReducers({
  grams: gramReducer
});