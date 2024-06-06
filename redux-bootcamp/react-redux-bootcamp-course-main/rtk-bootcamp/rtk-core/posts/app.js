const {
  createAsyncThunk,
  createSlice,
  configureStore,
} = require("@reduxjs/toolkit");
const axios = require("axios");

const API_URL = "https://jsonplaceholder.typicode.com/posts";

// Initial state
const initialState = {
  posts: [],
  loading: false,
  error: null,
};
// Create asyncThunk
const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const res = await axios.get(API_URL);
  return res.data;
});

// Slice
const postsSlice = createSlice({
  name: "posts",
  initialState,
  extraReducers: (builder) => {
    // Handle lifecycle, pending, fulfilled, rejected
    // Pending
    builder.addCase(fetchPosts.pending, (state) => {
      state.loading = true;
    });
    // Fulfilled
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.loading = false;
      state.posts = action.payload;
    });
    // Rejected
    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.posts = [];
      state.loading = false;
      state.error = action.payload;
    });
  },
});

// Generate reducer
const postsReducer = postsSlice.reducer;

// Store
const store = configureStore({
  reducer: postsReducer,
});

// Dispatch
store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch(fetchPosts());
