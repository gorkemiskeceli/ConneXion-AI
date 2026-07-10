import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './uiSlice.js';
import chatReducer from './chatSlice.js';
import authReducer from './authSlice.js';
import aiReducer from './aiSlice.js';
import supportReducer from './supportSlice.js';
import { api } from '../../services/api.js';

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    chat: chatReducer,
    auth: authReducer,
    ai: aiReducer,
    support: supportReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

