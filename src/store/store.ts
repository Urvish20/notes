import { configureStore } from '@reduxjs/toolkit'
import folderSlice from "./slices/folderSlice"

export const store = configureStore({
  reducer: {
    folders : folderSlice,
  }
})