import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addTransactions,
  deleteTransaction,
  editTransaction,
  getTransactions,
} from "./transactionAPI";

const initialState = {
  transactions: [],
  isLoading: false,
  isError: false,
  error: "",
};


// async thank 
export const fetchTransactions = createAsyncThunk(
  "/transaction/fetchTransactions",
  async () => {
    const transactions = await getTransactions();
    return transactions;
  }
);

export const createTransaction = createAsyncThunk(
  "/transaction/createTransactions",
  async (data) => {
    const transaction = await addTransactions(data);
    return transaction;
  }
);

export const changeTransaction = createAsyncThunk(
  "/transaction/changeTransactions",
  async ({ id, data }) => {
    const transaction = await editTransaction(id, data);
    return transaction;
  }
);

export const removeTransaction = createAsyncThunk(
  "/transaction/removeTransactions",
  async (id) => {
    const transaction = await deleteTransaction(id);
    return transaction;
  }
);

// create slice

const transactionSlice = createSlice({
    name : "transaction",
    initialState,
    extraReducers : (builder) =>{
        builder
        .addCase(fetchTransactions.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
        })
        .addCase(fetchTransactions.fulfilled, (state, action) => {
            state.isLoading = false;
            state.transactions = action.payload;
        })
        .addCase(fetchTransactions.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.error = action.error.message;
        })
    }
})