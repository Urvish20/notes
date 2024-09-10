import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  folders: [{ id: "default", folderName: "Default Folder", files: [] }],
  selectedFolderId: "default", 
  selectedFileId : null
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
        folder.files.push({ ...action.payload, fileData: "" });
      }
    },
    // addFileData: (state, action) => {
   
    //   const folder = state.folders.files.find((files) => files.id === state.selectedFileId);
    //   if (folder) {
    //     folder.files.data.push({ ...action.payload, data: [] });
    //   }
    // },

    addFileData: (state, action) => {
      const folder = state.folders.find(folder => folder.id === state.selectedFolderId);
      if (folder) {
        const file = folder.files.find(file => file.id === state.selectedFileId);
         file.fileData = action.payload
      }
    },
    

    selectFolder: (state, action) => {
      state.selectedFolderId = action.payload;
    },
    selectFile: (state, action) => {
      state.selectedFileId = action.payload;
    },
  },
});

export const { addFolder, addFile, addFileData,selectFolder,selectFile } = folderSlice.actions;
export default folderSlice.reducer;
