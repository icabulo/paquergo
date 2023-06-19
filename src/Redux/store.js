import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./features/user/userSlice";
import generalMapReducer from "./features/generalMap/generalMapSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    generalMap: generalMapReducer,
  },
});
