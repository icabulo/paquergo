import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  userFetchFromApi,
  updateRequestToApi,
  getUserWasteFromDB,
  createWasteInDB,
  updateWasteInDB,
  deleteWasteInDB,
  getUserPacaFromDB,
  createPacaInDB,
  updatePacaInDB,
  deletePacaInDB,
} from "../../../api/userAPI";
// import { userWasteList } from "../../mockData/myWasteList";
// import { userPacaList } from "../../mockData/myPacaList";

const initialState = {
  userId: "",
  myUsername: "",
  userFetchedData: [],
  isLoading: true,
  isAuthenticated: false,
  userType: "not selected",
  userImageUrl:
    "https://res.cloudinary.com/didek0hyg/image/upload/v1686776057/yd6cp2hymggt1bpmxegu.png",
  myWasteList: [],
  myPacaList: [],
  thunkValidation: "",
  myLocation: [4.653251013860561, -74.08372879028322],
  selectedAlertId: "",
  chatContacts: [],
  chatConversations: [],
};

// get data from API with thunk and a helper function fetchCocktails
export const getUserAsync = createAsyncThunk(
  "user/getDataFromDb",
  async (email) => {
    const data = await userFetchFromApi(email);
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

// WASTES
export const getUserWasteAsync = createAsyncThunk(
  "amigo/getMyWaste",
  async (reqBody = "", thunkAPI) => {
    const id = thunkAPI.getState().user.userId;
    const data = await getUserWasteFromDB(reqBody, id);
    return data;
  }
);

export const createWasteAsync = createAsyncThunk(
  "amigo/createWaste",
  async (reqBody, thunkAPI) => {
    const id = thunkAPI.getState().user.userId;
    const data = await createWasteInDB(reqBody, id);
    return data;
  }
);

export const updateWasteAsync = createAsyncThunk(
  "amigo/updateWaste",
  async (reqBody, thunkAPI) => {
    const id = thunkAPI.getState().user.userId;
    const data = await updateWasteInDB(reqBody, id);
    return data;
  }
);

export const deleteWasteAsync = createAsyncThunk(
  "amigo/deleteWaste",
  async (wasteId, thunkAPI) => {
    const userId = thunkAPI.getState().user.userId;

    const data = await deleteWasteInDB(wasteId, userId);
    return data;
  }
);

// PACAS
export const getUserPacaAsync = createAsyncThunk(
  "paquerx/getMyPaca",
  async (reqBody = "", thunkAPI) => {
    const id = thunkAPI.getState().user.userId;
    const data = await getUserPacaFromDB(reqBody, id);
    return data;
  }
);

export const createPacaAsync = createAsyncThunk(
  "paquerx/createPaca",
  async (reqBody, thunkAPI) => {
    const id = thunkAPI.getState().user.userId;
    const data = await createPacaInDB(reqBody, id);
    return data;
  }
);

export const updatePacaAsync = createAsyncThunk(
  "paquerx/updatePaca",
  async (reqBody, thunkAPI) => {
    const id = thunkAPI.getState().user.userId;
    const data = await updatePacaInDB(reqBody, id);
    return data;
  }
);

export const deletePacaAsync = createAsyncThunk(
  "paquerx/deletePaca",
  async (pacaId, thunkAPI) => {
    const userId = thunkAPI.getState().user.userId;

    const data = await deletePacaInDB(pacaId, userId);
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
    setSelectedAlertId: (state, action) => {
      state.selectedAlertId = action.payload;
    },
    setMyUsername: (state, action) => {
      state.myUsername = action.payload;
    },
    setUserType: (state, action) => {
      state.userType = action.payload;
    },
    setUserImageUrl: (state, action) => {
      state.userImageUrl = action.payload;
    },
    setMyLocation: (state, action) => {
      state.myLocation = action.payload;
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
    setThunkValidation: (state, action) => {
      state.thunkValidation = action.payload;
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
        if (userInfo.username) {
          state.myUsername = userInfo.username;
        }
        if (userInfo.userImage) {
          state.userImageUrl = userInfo.userImage;
        }
        state.isLoading = false;
        if (userInfo.mapLocation.length) {
          state.myLocation = userInfo.mapLocation;
        }
        if (userInfo.chat.conversations.length) {
          state.chatConversations = userInfo.chat.conversations;
        }
        if (userInfo.chat.contacts.length) {
          state.chatContacts = userInfo.chat.contacts;
        }
      })
      .addCase(getUserAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.thunkValidation = action.error.message;
      })
      .addCase(updateUserAsync.fulfilled, (state) => {
        // state.userType = action.payload.currentRole;
        state.thunkValidation = "fulfilled";
      })
      .addCase(updateUserAsync.rejected, (state, action) => {
        console.log("updateUserAsync rejected", action.error.message);
        state.thunkValidation = action.error.message;
      })
      .addCase(getUserWasteAsync.fulfilled, (state, action) => {
        const wasteInfo = action.payload;
        state.myWasteList = wasteInfo;
        // console.log("my waste list from DB", wasteInfo);
      })
      .addCase(createWasteAsync.fulfilled, (state, action) => {
        state.myWasteList.push(action.payload);
      })
      .addCase(createWasteAsync.rejected, (state, action) => {
        console.log("createWasteAsync rejected", action.error.message);
      })
      .addCase(updateWasteAsync.fulfilled, (state, action) => {
        state.myWasteList = action.payload;
      })
      .addCase(updateWasteAsync.rejected, (state, action) => {
        console.log("updateWasteAsync rejected", action.error.message);
      })
      .addCase(deleteWasteAsync.fulfilled, (state, action) => {
        state.myWasteList = action.payload;
      })
      .addCase(deleteWasteAsync.rejected, (state, action) => {
        console.log("deleteWasteAsync rejected", action.error.message);
      })
      .addCase(getUserPacaAsync.fulfilled, (state, action) => {
        const pacaInfo = action.payload;
        state.myPacaList = pacaInfo;
      })
      .addCase(createPacaAsync.fulfilled, (state, action) => {
        state.myPacaList.push(action.payload);
      })
      .addCase(createPacaAsync.rejected, (state, action) => {
        console.log("createPacaAsync rejected", action.error.message);
      })
      .addCase(updatePacaAsync.fulfilled, (state, action) => {
        state.myPacaList = action.payload;
      })
      .addCase(updatePacaAsync.rejected, (state, action) => {
        console.log("updatePacaAsync rejected", action.error.message);
      })
      .addCase(deletePacaAsync.fulfilled, (state, action) => {
        state.myPacaList = action.payload;
      })
      .addCase(deletePacaAsync.rejected, (state, action) => {
        console.log("deletePacaAsync rejected", action.error.message);
      });
  },
});

export const {
  setUserId,
  setMyUsername,
  setIsLoading,
  setIsAuthenticated,
  setUserType,
  setUserImageUrl,
  addToMyWastePost,
  addToMyPacaPost,
  setMyLocation,
  setThunkValidation,
  setSelectedAlertId,
} = userSlice.actions;
export default userSlice.reducer;
