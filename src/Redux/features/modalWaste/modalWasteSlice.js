import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modalEditWasteOpen: false,
};

const modalWasteSlice = createSlice({
  name: "modalWaste",
  initialState,
  reducers: {
    setEditWasteModal: (state, action) => {
      state.modalEditWasteOpen = action.payload;
    },
  },
});

export const { setEditWasteModal } = modalWasteSlice.actions;
export default modalWasteSlice.reducer;
