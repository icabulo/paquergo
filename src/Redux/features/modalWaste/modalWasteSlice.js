import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modalEditWasteOpen: false,
  modalEditPacaOpen: false,
};

const modalWasteSlice = createSlice({
  name: "modalWaste",
  initialState,
  reducers: {
    setEditWasteModal: (state, action) => {
      state.modalEditWasteOpen = action.payload;
    },
    setEditPacaModal: (state, action) => {
      state.modalEditPacaOpen = action.payload;
    },
  },
});

export const { setEditWasteModal, setEditPacaModal } = modalWasteSlice.actions;
export default modalWasteSlice.reducer;
