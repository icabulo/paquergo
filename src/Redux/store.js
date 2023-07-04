import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./features/user/userSlice";
import generalMapReducer from "./features/generalMap/generalMapSlice";
import modalWasteReducer from "./features/modalWaste/modalWasteSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    generalMap: generalMapReducer,
    modalWaste: modalWasteReducer,
  },
});
