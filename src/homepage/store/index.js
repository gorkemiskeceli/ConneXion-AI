import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './uiSlice.js';
import chatReducer from './chatSlice.js';
import authReducer from './authSlice.js';
import aiReducer from './aiSlice.js';

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    chat: chatReducer,
    auth: authReducer,
    ai: aiReducer,
  },
});
