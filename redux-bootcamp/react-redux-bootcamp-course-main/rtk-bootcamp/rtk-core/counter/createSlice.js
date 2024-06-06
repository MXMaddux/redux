const { createSlice, configureStore } = require("@reduxjs/toolkit");

const initialState = {
  counter: 0,
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.counter += 1;
    },
    decrement: (state) => {
      state.counter -= 1;
    },
    reset: (state) => {
      state.counter = 0;
    },
    incrementBy: (state, action) => {
      state.counter += action.payload;
    },
  },
});

// Generate actions
const { increment, decrement, reset, incrementBy } = counterSlice.actions;

//   Generate reducer
const counterReducer = counterSlice.reducer;

const store = configureStore({
  reducer: counterReducer,
});

// Dispatch
store.dispatch(increment());
store.dispatch(increment());
store.dispatch(increment());
store.dispatch(incrementBy(5));
console.log(store.getState());
