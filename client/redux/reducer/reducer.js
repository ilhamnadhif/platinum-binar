import { combineReducers } from "redux";
import globalReducer from "./globalReducer";
import userReducer from "./userReducer";
import gameReducer from "./gameReducer";

const reducer = combineReducers({
  globalReducer,
  userReducer,
  gameReducer,
});

export default reducer;
