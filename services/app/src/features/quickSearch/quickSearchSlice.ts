import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface QuickSearchState {
  active: boolean;
}

const initialState: QuickSearchState = {
  active: false,
};

const quickSearchSlice = createSlice({
  name: "quicksearch",
  initialState,
  reducers: {
    toggle: (state) => {
      state.active = !state.active;
    },
    activated: (state) => {
      state.active = true;
    },
    deactivated: (state) => {
      state.active = false;
    },
    set: (state, action: PayloadAction<boolean>) => {
      state.active = action.payload;
    },
  },
});

export const { toggle, activated, deactivated, set } = quickSearchSlice.actions;
export default quickSearchSlice.reducer;
