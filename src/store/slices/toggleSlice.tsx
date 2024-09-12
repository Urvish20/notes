import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ToggleState {
  addFolderToggle: boolean;
  addFileToggle: boolean;
  addNoteToggle: boolean;
  hideTopSection: boolean;
}

const initialState: ToggleState = {
  addFolderToggle: false,
  addFileToggle: false,
  addNoteToggle: false,
  hideTopSection: false,
};

const toggleSlice = createSlice({
  name: "toggle",
  initialState,
  reducers: {
    setAddFolderToggle: (state, action: PayloadAction<boolean>) => {
      state.addFolderToggle = action.payload;
    },
    setAddFileToggle: (state, action: PayloadAction<boolean>) => {
      state.addFileToggle = action.payload;
    },
    setAddNoteToggle: (state, action: PayloadAction<boolean>) => {
      state.addNoteToggle = action.payload;
    },
    setHideTopSection: (state, action: PayloadAction<boolean>) => {
      state.hideTopSection = action.payload;
    },
    
  },
});

export const { setAddFolderToggle, setAddFileToggle, setAddNoteToggle, setHideTopSection } = toggleSlice.actions;
export default toggleSlice.reducer;
