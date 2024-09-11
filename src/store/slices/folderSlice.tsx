import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface File {
  id: number;
  fileName: string;
  fileData: string;
}

interface Folder {
  id: number;
  folderName: string;
  files: File[];
}

interface FolderState {
  folders: Folder[];
  selectedFolderId: number;
  selectedFileId: number | null;
}

const initialState: FolderState = {
  folders: [{ id: 1, folderName: "Default Folder", files: [] }],
  selectedFolderId: 1,
  selectedFileId: null,
};

const folderSlice = createSlice({
  name: "folders",
  initialState,
  reducers: {
    addFolder: (state, action: PayloadAction<Omit<Folder, 'files'>>) => {
      state.folders.push({ ...action.payload, files: [] });
    },
    addFile: (state, action: PayloadAction<File>) => {
      const folder = state.folders.find(
        (folder) => folder.id === state.selectedFolderId
      );
      if (folder) {
        folder.files.push({ ...action.payload, fileData: "" });
      }
    },
    addFileData: (state, action: PayloadAction<{ fileId: number; fileData: string }>) => {
      const folder = state.folders.find(
        (folder) => folder.id === state.selectedFolderId
      );
      if (folder) {
        const file = folder.files.find(
          (file) => file.id === state.selectedFileId
        );
        if (file) {
          file.fileData = action.payload.fileData;
        }
      }
    },
    selectFolder: (state, action: PayloadAction<number>) => {
      state.selectedFolderId = action.payload;
    },
    selectFile: (state, action: PayloadAction<number | null>) => {
      state.selectedFileId = action.payload;
    },
  },
});

export const { addFolder, addFile, addFileData, selectFolder, selectFile } = folderSlice.actions;
export default folderSlice.reducer;
