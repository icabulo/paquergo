import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { userRequestToApi, updateRequestToApi } from "./userAPI";
import { userWasteList } from "../../mockData/myWasteList";
import { userPacaList } from "../../mockData/myPacaList";

const initialState = {
  userId: "",
  userFetchedData: [],
  isLoading: true,
  isAuthenticated: false,
  userType: "not selected",
  userImageUrl:
    "https://res.cloudinary.com/didek0hyg/image/upload/v1686776057/yd6cp2hymggt1bpmxegu.png",
  myWasteList: userWasteList,
  myPacaList: userPacaList,
  thunkRejectMessage: "",
};

// get data from API with thunk and a helper function fetchCocktails
export const getUserAsync = createAsyncThunk(
  "user/getDataFromDb",
  async (email) => {
    const data = await userRequestToApi(email);
    return data;
  }
);

export const updateUserAsync = createAsyncThunk(
  "user/updateUserInfoDB",
  async (reqBody, thunkAPI) => {
    const id = thunkAPI.getState().user.userId;
    const data = await updateRequestToApi(reqBody, id);
    return data;
  }
);

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
    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
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
        state.userId = userInfo._id.toString();
        state.isAuthenticated = true;
        state.userType = userInfo.currentRole;
        state.userFetchedData = userInfo;
        state.isLoading = false;
      })
      .addCase(getUserAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.thunkRejectMessage = action.error.message;
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.userType = action.payload.currentRole;
      })
      .addCase(updateUserAsync.rejected, (state, action) => {
        state.thunkRejectMessage = action.error.message;
      });
  },
});

export const {
  setUserId,
  setIsLoading,
  setIsAuthenticated,
  setUserType,
  setUserImageUrl,
  addToMyWastePost,
  addToMyPacaPost,
} = userSlice.actions;
export default userSlice.reducer;
