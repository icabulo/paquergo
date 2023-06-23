// eslint-disable-next-line no-unused-vars
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { allAmigos } from "../../mockData/desechosDatabase";
import { allPacas } from "../../mockData/pacasDatabase";

const initialState = {
  wasteList: allAmigos,
  pacasList: allPacas,
};

const generalMapSlice = createSlice({
  name: "mapAlerts",
  initialState,
  reducers: {
    addWastePost: (state, action) => {
      state.wasteList.push(action.payload);
    },
    addPacaPost: (state, action) => {
      state.pacasList.push(action.payload);
    },
  },
});

export const { addWastePost, addPacaPost } = generalMapSlice.actions;
export default generalMapSlice.reducer;