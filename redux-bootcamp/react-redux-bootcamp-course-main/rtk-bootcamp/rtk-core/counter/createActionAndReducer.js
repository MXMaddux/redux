const { createAction, nanoid, configureStore } = require("@reduxjs/toolkit");
const logger = require("redux-logger").createLogger();
// Initial state
const initialState = {
  counter: 0,
};

// Create Action
const increment = createAction("INCREMENT");
const decrement = createAction("DECREMENT");
const reset = createAction("RESET");
// Customize createAction

const incrementBy = createAction("INCREMENT_BY", (amount, user) => {
  return {
    payload: {
      amount,
      user,
      id: nanoid(),
    },
  };
});

// Create Reducer
// 1. Builder callback notation

// Builder callback notation

// const counterSlice = createReducer(initialState, (builder) => {
//   // Increment
//   builder.addCase(increment, (state) => {
//     state.counter += 1;
//   });
//   //   Decrement
//   builder.addCase(decrement, (state) => {
//     state.counter -= 1;
//   });
//   //   Reset
//   builder.addCase(reset, (state) => {
//     state.counter = 0;
//   });

//   //   Increment By
//   builder.addCase(incrementBy, (state, action) => {
//     state.counter += action.payload.amount;
//   });
// });

// 2. map object notation

// Store
const store = configureStore({
  reducer: counterSlice,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

// dispatch
store.dispatch(increment());
store.dispatch(increment());
store.dispatch(increment());
store.dispatch(decrement());
store.dispatch(incrementBy(103));

console.log(store.getState());
