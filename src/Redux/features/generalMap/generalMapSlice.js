// eslint-disable-next-line no-unused-vars
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { allAmigos } from "../../mockData/desechosDatabase";
import { allPacas } from "../../mockData/pacasDatabase";
import { getAllWastesFromDB } from "../../../api/mapAlertsAPI";

const initialState = {
  wasteList: allAmigos,
  pacasList: allPacas,
};

export const getAllWastesAsync = createAsyncThunk(
  "map/getAllWastes",
  async (reqBody = "", thunkAPI) => {
    const id = thunkAPI.getState().user.userId; //with thunkAPI you can get the state from a different slice
    const data = await getAllWastesFromDB(reqBody, id);
    return data;
  }
);

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
  extraReducers: (builder) => {
    builder
      .addCase(getAllWastesAsync.fulfilled, (state, action) => {
        state.wasteList = action.payload;
        // console.log("getAllWastesAsync fulfilled", action.payload);
      })
      .addCase(getAllWastesAsync.rejected, (state, action) => {
        console.log("getAllWastesAsync rejected", action.error.message);
      });
  },
});

export const { addWastePost, addPacaPost } = generalMapSlice.actions;
export default generalMapSlice.reducer;
