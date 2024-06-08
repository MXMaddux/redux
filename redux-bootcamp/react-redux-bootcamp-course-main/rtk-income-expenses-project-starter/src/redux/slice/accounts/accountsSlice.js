import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../../utils/baseURL";
// const baseURL =
//   "https://income-expenses-tracker-web-dev.onrender.com/api/v1/accounts";

const initialState = {
  account: {},
  accounts: [],
  loading: false,
  error: null,
  success: false,
  isUpdated: false,
};

// Action to create a new account/project
export const createAccountAction = createAsyncThunk(
  "account/create",
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
      const { data } = await axios.post(
        `${baseURL}/accounts`,
        {
          name: payload.name,
          accountType: payload.accountType,
          notes: payload.notes,
          initialBalance: payload.initialBalance,
        },
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

// Get single account
export const getSingleAccountAction = createAsyncThunk(
  "account/get-details",
  async (id, { rejectWithValue, getState, dispatch }) => {
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
      const { data } = await axios.get(`${baseURL}/accounts/${id}`, config);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

// Create Slice
const accountsSlice = createSlice({
  name: "accounts",
  initialState,
  reducers: {
    // Logout
    logoutUser(state) {
      state.userAuth.userInfo = null;
      localStorage.removeItem("userInfo");
    },
  },
  extraReducers: (builder) => {
    // Create Account
    builder.addCase(createAccountAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createAccountAction.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.account = action.payload;
      //   state.accounts.push(action.payload);
    });
    builder.addCase(createAccountAction.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.account = null;
      state.error = action.payload;
    });
    // fetch single account
    builder.addCase(getSingleAccountAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getSingleAccountAction.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.account = action.payload;
    });
    builder.addCase(getSingleAccountAction.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.account = null;
      state.error = action.payload;
    });
  },
});

// Generate reducer
const accountsReducer = accountsSlice.reducer;

export default accountsReducer;
