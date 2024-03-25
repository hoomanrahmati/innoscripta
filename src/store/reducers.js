import { combineReducers } from "@reduxjs/toolkit";
import newsSlice from "./newsSlice";

const rootReducer = combineReducers({
  news: newsSlice,
});

export default rootReducer;
