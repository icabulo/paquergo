// eslint-disable-next-line no-unused-vars
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { allAmigos } from "../../mockData/desechosDatabase";
// import { allPacas } from "../../mockData/pacasDatabase";
import {
  getAllPacasFromDB,
  getAllWastesFromDB,
} from "../../../api/mapAlertsAPI";

const initialState = {
  wasteList: [],
  pacasList: [],
};

export const getAllMarkersAsync = createAsyncThunk(
  "map/getAllMarkers",
  async (reqBody = "", thunkAPI) => {
    const id = thunkAPI.getState().user.userId; //with thunkAPI you can get the state from a different slice
    const WastesData = await getAllWastesFromDB(reqBody, id);
    const PacasData = await getAllPacasFromDB(reqBody, id);

    const markers = {
      WastesData,
      PacasData,
    };

    return markers;
  }
);

/* export const getAllPacasAsync = createAsyncThunk(
  "map/getAllPacas",
  async (reqBody = "", thunkAPI) => {
    const id = thunkAPI.getState().user.userId; //with thunkAPI you can get the state from a different slice
    const data = await getAllPacasFromDB(reqBody, id);
    return data;
  }
); */

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
      .addCase(getAllMarkersAsync.fulfilled, (state, action) => {
        state.wasteList = action.payload.WastesData;
        state.pacasList = action.payload.PacasData;

        // console.log("getAllMarkersAsync fulfilled", action.payload);
      })
      .addCase(getAllMarkersAsync.rejected, (state, action) => {
        console.log("getAllMarkersAsync rejected", action.error.message);
      });
    // .addCase(getAllPacasAsync.fulfilled, (state, action) => {
    //   state.pacasList = action.payload;
    //   // console.log("getAllPacasAsync fulfilled", action.payload);
    // })
    // .addCase(getAllPacasAsync.rejected, (state, action) => {
    //   console.log("getAllPacasAsync rejected", action.error.message);
    // });
  },
});

export const { addWastePost, addPacaPost } = generalMapSlice.actions;
export default generalMapSlice.reducer;
