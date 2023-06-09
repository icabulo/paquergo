import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { userRequestToApi } from "./userAPI";

const initialState = {
  userId: "",
  userFetchedData: [],
  isLoading: true,
};

// get data from API with thunk and a helper function fetchCocktails
export const getUserAsync = createAsyncThunk("user/getDataFromDb", async () => {
  const data = await userRequestToApi();
  return data;
});

const userSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserAsync.fulfilled, (state, action) => {
        const userInfo = action.payload;
        state.isLoading = false;
        state.userFetchedData = userInfo;
      });
  },
});

export const { setUserId } = userSlice.actions;
export default userSlice.reducer;
