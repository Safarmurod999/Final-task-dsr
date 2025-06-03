import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import rootPersistConfig from "./persistConfig";
import {
  authSlice,
  todosSlice,
  usersSlice,
} from "./slices/index";

const reducers = combineReducers({
  auth: authSlice,
  todos: todosSlice,
  users: usersSlice,
});

const persistedReducers = persistReducer(rootPersistConfig, reducers);

export default persistedReducers;
