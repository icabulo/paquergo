import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { userRequestToApi } from "./userAPI";
import { userWasteList } from "../../mockData/myWasteList";
import { userPacaList } from "../../mockData/myPacaList";

const initialState = {
  userId: "",
  userFetchedData: [],
  isLoading: true,
  userType: "not selected",
  userImageUrl:
    "https://res.cloudinary.com/didek0hyg/image/upload/v1686776057/yd6cp2hymggt1bpmxegu.png",
  myWasteList: userWasteList,
  myPacaList: userPacaList,
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
    setUserType: (state, action) => {
      state.userType = action.payload;
    },
    setUserImageUrl: (state, action) => {
      state.userImageUrl = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    addToMyWastePost: (state, action) => {
      state.myWasteList.push(action.payload);
    },
    addToMyPacaPost: (state, action) => {
      state.myPacaList.push(action.payload);
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

export const {
  setUserId,
  setIsLoading,
  setUserType,
  setUserImageUrl,
  addToMyWastePost,
  addToMyPacaPost,
} = userSlice.actions;
export default userSlice.reducer;
