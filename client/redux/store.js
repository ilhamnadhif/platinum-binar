import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import reducer from "./reducer/reducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["globalReducer"]
};
const persistedReducer = persistReducer(persistConfig, reducer);
export const store = createStore(persistedReducer, applyMiddleware(thunk));
export const persistor = persistStore(store)


