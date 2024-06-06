import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { thunk } from "redux-thunk";
import { postsReducer } from "../reducers/postReducer";

//combine all middlewares
const middlewares = [thunk];
const middlewareEnhancers = applyMiddleware(...middlewares);
const store = createStore(
  postsReducer,
  composeWithDevTools(middlewareEnhancers)
);

export default store;
