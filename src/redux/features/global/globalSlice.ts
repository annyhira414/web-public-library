import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface globalState {
  testName: string;
}

const initialState: globalState = {
  testName: "Public Library Frontend",
};

const globalSlice = createSlice({
  name: "GlobalState",
  initialState,
  reducers: {},
});

export const {} = globalSlice.actions;

export default globalSlice.reducer;
