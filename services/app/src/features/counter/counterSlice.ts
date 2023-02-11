import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CounterState {
  value: number;
}

const initialState: CounterState = {
  value: 10,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    incremented: (state) => {
      state.value++;
    },
    decremented: (state) => {
      state.value--;
    },
    reset: (state) => {
      state.value = 0;
    },
    added: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

export const { incremented, decremented, reset, added } = counterSlice.actions;
export default counterSlice.reducer;
