const { configureStore, createStore } = require("@reduxjs/toolkit");

// initial state
const initialState = {
  count: 0,
};

// actions - action action creator
// increment
// decrement
// reset
// increaseByAmount

// increase action creator
const incrementAction = () => {
  return {
    type: "INCREMENT",
  };
};

// decrease action creator
const decrementAction = () => {
  return {
    type: "DECREMENT",
  };
};

// reset action creator
const resetAction = () => {
  return {
    type: "RESET",
  };
};

// increase by amount creator
const increaseByAmount = (anyAmount) => {
  return {
    type: "INCREASE_BY_AMOUNT",
    payload: anyAmount,
  };
};

// reducer
const counterReducer = (state = initialState, action) => {
  console.log(action);
  if (action.type === "INCREMENT") {
    return {
      ...state,
      count: state.count + 1,
    };
  }
  if (action.type === "DECREMENT") {
    return {
      ...state,
      count: state.count - 1,
    };
  }
  if (action.type === "RESET") {
    return {
      ...state,
      count: 0,
    };
  }
  if (action.type === "INCREASE_BY_AMOUNT") {
    return {
      ...state,
      count: state.count + action.payload,
    };
  }
};

// store
const store = createStore(counterReducer);
console.log(`Store: ${store}`);

// subscribe to store
store.subscribe(() => {
  const data = store.getState();
  console.log(data);
});
// dispatch action
store.dispatch(incrementAction());
store.dispatch(incrementAction());
store.dispatch(incrementAction());
store.dispatch(incrementAction());

store.dispatch(decrementAction());
store.dispatch(increaseByAmount(10));
