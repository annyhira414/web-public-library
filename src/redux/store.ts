import { configureStore } from "@reduxjs/toolkit";
import { counterReducer, globalReducer } from "@/redux/features";
import bagReducer from "../redux/features/add-to-bag/addToBagSlice";
export function makeStore() {
  return configureStore({
    reducer: {
      global: globalReducer,
      bag: bagReducer,
      notificationCount: counterReducer,
    },

    devTools: process.env.NODE_ENV === "development",
  });
}

const store = makeStore();
export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
