import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  folders: [{ id: "default", folderName: "Default Folder", files: [] }],
  selectedFolderId: "default", 
};

const folderSlice = createSlice({
  name: "folders",
  initialState,
  reducers: {
    addFolder: (state, action) => {
      
      state.folders.push({ ...action.payload, files: [] });
    },
    addFile: (state, action) => {
   
      const folder = state.folders.find((folder) => folder.id === state.selectedFolderId);
      if (folder) {
        folder.files.push(action.payload);
      }
    },
    selectFolder: (state, action) => {
      state.selectedFolderId = action.payload;
    },
  },
});

export const { addFolder, addFile, selectFolder } = folderSlice.actions;
export default folderSlice.reducer;
