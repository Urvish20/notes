import { configureStore } from '@reduxjs/toolkit';
import folderSlice from './slices/folderSlice';
import toggleSlice from './slices/toggleSlice';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const store = configureStore({
  reducer: {
    folders: folderSlice,
    toggle: toggleSlice,
  },
});
