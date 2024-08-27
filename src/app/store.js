import { configureStore } from '@reduxjs/toolkit';
import historyReducer from '../Features/history/historySlice'

export const store = configureStore({
  reducer: {
    history: historyReducer,
  },
});
