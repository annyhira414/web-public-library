import {createSlice} from "@reduxjs/toolkit";

interface counterState {
  value: number;
}

const initialState: counterState = {
  value: 0,
};

const counterSlice = createSlice({
  name: "CountNotifications",
  initialState,
  reducers: {
    refatchCountNotification: (state) => {
      state.value = Math.random();
    },
  },
});

export const {refatchCountNotification} = counterSlice.actions;

export default counterSlice.reducer;
