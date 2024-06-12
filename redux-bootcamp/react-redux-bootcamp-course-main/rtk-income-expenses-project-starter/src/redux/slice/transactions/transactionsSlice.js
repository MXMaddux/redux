import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../../utils/baseURL";

const initialState = {
  transactions: [],
  transaction: {},
  loading: false,
  error: null,
  isAdded: false,
  isUpdated: false,
};

// create transaction
export const createTransactionAction = createAsyncThunk(
  "transaction/create",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    const { name, account, transactionType, amount, category, notes } = payload;
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
        `${baseURL}/transactions`,
        {
          name,
          transactionType,
          amount,
          category,
          notes,
          account: payload.id,
        },
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

// update transaction
export const updateTransactionAction = createAsyncThunk(
  "transaction/update",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    const { name, transactionType, amount, category, notes, id } = payload;
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
      const { data } = await axios.put(
        `${baseURL}/transactions/${id}`,
        {
          name,
          transactionType,
          amount,
          category,
          notes,
          id,
        },
        config
      );
      console.log(data);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

// fetch transaction
export const getTransactionAction = createAsyncThunk(
  "transaction/details",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    const { id } = payload;
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
      const { data } = await axios.get(`${baseURL}/transactions/${id}`, config);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    // Logout
    logoutUser(state) {
      state.userAuth.userInfo = null;
      localStorage.removeItem("userInfo");
    },
  },
  extraReducers: (builder) => {
    // Create Transaction
    builder.addCase(createTransactionAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createTransactionAction.fulfilled, (state, action) => {
      state.loading = false;
      state.isAdded = true;
      state.transaction = action.payload;
      //   state.accounts.push(action.payload);
    });
    builder.addCase(createTransactionAction.rejected, (state, action) => {
      state.loading = false;
      state.isAdded = false;
      state.transaction = null;
      state.error = action.payload;
    });
    // Update Transaction
    builder.addCase(updateTransactionAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateTransactionAction.fulfilled, (state, action) => {
      state.loading = false;
      state.isUpdated = true;
      state.transaction = action.payload;
      //   state.accounts.push(action.payload);
    });
    builder.addCase(updateTransactionAction.rejected, (state, action) => {
      state.loading = false;
      state.isUpdated = false;
      state.transaction = null;
      state.error = action.payload;
    });
    // Get Transaction
    builder.addCase(getTransactionAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getTransactionAction.fulfilled, (state, action) => {
      state.loading = false;
      state.transaction = action.payload;
    });
    builder.addCase(getTransactionAction.rejected, (state, action) => {
      state.loading = false;
      state.transaction = null;
      state.error = action.payload;
    });
  },
});

// Generate reducer
const transactionsReducer = transactionsSlice.reducer;

export default transactionsReducer;
