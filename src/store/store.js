import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import { api } from "../services/api";

/**
 * Redux store.
 * Currently holds only the RTK Query api slice (server state). Feature UI state
 * lives in component/hook state; add regular slices here if you need shared
 * client state later.
 */
export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefault) => getDefault().concat(api.middleware),
});

// Enables refetchOnFocus / refetchOnReconnect behavior.
setupListeners(store.dispatch);
