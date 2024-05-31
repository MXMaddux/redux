const { createStore, combineReducers } = require("redux");

// initial state
const initialState = {
  posts: [],
};

// users
const usersInitialState = {
  users: [],
};

// Actions (action, action creator)

// Action types
const ADD_POST = "ADD_POST";
const REMOVE_POST = "REMOVE_POST";
const ADD_USER = "ADD_USER";

// Add post creator
const addPostAction = (post) => {
  return {
    type: ADD_POST,
    payload: post,
  };
};

const addUserAction = (user) => {
  return {
    type: ADD_USER,
    payload: user,
  };
};

// Remove post
const removePostAction = (id) => {
  return {
    type: REMOVE_POST,
    id,
  };
};

// Reducer
const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      return {
        posts: [...state.posts, action.payload],
      };
    case REMOVE_POST:
      return {
        posts: state.posts.filter((post) => post.id !== action.id),
      };
    default:
      return state;
  }
};

// user reducer
const userReducer = (state = usersInitialState, action) => {
  switch (action.type) {
    case ADD_USER:
      return {
        users: [...state.users, action.payload],
      };

    default:
      return state;
  }
};

// root reducer
const rootReducer = combineReducers({
  posts: postReducer,
  users: userReducer,
});

// Store
const store = createStore(rootReducer);

// Subscribe
store.subscribe(() => {
  const data = store.getState();
  console.log("Posts: ", data.posts);
  console.log("Users: ", data.users);
});

// dispatch
// add post action
store.dispatch(addPostAction({ id: 1, title: "Fuck Yeah" }));
store.dispatch(addPostAction({ id: 2, title: "Fuck No" }));
// remove post
store.dispatch(removePostAction(1));

// add new user
store.dispatch(addUserAction({ name: "John", email: "john@mail.com" }));
