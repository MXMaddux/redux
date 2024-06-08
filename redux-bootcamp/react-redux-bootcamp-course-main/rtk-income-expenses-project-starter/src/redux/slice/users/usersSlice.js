import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../../utils/baseURL";

// Initial state
const initialState = {
  users: [],
  user: {},
  profile: {},
  loading: false,
  error: null,
  userAuth: {
    loading: false,
    error: null,
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },
};

// Register User Action
export const registerUserAction = createAsyncThunk(
  "user/register",
  async ({ fullname, email, password }, { rejectWithValue }) => {
    try {
      // Header
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const res = await axios.post(
        `${baseURL}/users/register`,
        {
          fullname,
          email,
          password,
        },
        config
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Login User Action
export const loginUserAction = createAsyncThunk(
  "user/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      // Header
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const res = await axios.post(
        `${baseURL}/users/login`,
        {
          email,
          password,
        },
        config
      );

      // Save user to local storage
      localStorage.setItem("userInfo", JSON.stringify(res.data));

      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Logout User Action
export const logoutUserAction = createAsyncThunk(
  "user/logout",
  // Remove user from storage
  async () => {
    localStorage.removeItem("userInfo");
    return null;
  }
);

// Get Profile Action
export const getProfileAction = createAsyncThunk(
  "users/getProfile",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      // Get the token
      const token = getState()?.users?.userAuth?.userInfo?.token;
      // Pass token to header
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      // Make request
      const { data } = await axios.get(`${baseURL}/users/profile`, config);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

// Users Slice
const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    // Logout
    logoutUser(state) {
      state.userAuth.userInfo = null;
      localStorage.removeItem("userInfo");
    },
  },
  extraReducers: (builder) => {
    // Register
    builder.addCase(registerUserAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(registerUserAction.fulfilled, (state, action) => {
      state.loading = false;
      state.userAuth.userInfo = action.payload;
    });
    builder.addCase(registerUserAction.rejected, (state, action) => {
      state.loading = false;
      state.userAuth.error = action.payload;
    });
    // Login
    builder.addCase(loginUserAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginUserAction.fulfilled, (state, action) => {
      state.loading = false;
      state.userAuth.userInfo = action.payload;
    });
    builder.addCase(loginUserAction.rejected, (state, action) => {
      state.loading = false;
      state.userAuth.error = action.payload;
    });
    builder.addCase(logoutUserAction.fulfilled, (state) => {
      state.userAuth.userInfo = null;
    });
    builder.addCase(getProfileAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getProfileAction.fulfilled, (state, action) => {
      state.loading = false;
      state.profile = action.payload;
    });
    builder.addCase(getProfileAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.profile = "";
    });
  },
});

export const { logoutUser } = usersSlice.actions;

// Generate reducer
const usersReducer = usersSlice.reducer;

export default usersReducer;
