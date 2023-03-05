import { configureStore } from "@reduxjs/toolkit";

import counterReducer from "../features/counter/counterSlice";
import quickSearchSlice from "../features/quickSearch/quickSearchSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    quickSearch: quickSearchSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
