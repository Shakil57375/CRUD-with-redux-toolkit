import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
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
            state.isError = false;
            state.transactions = action.payload;
        })
        .addCase(fetchTransactions.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.error = action.error.message;
        })
        .addCase(createTransaction.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
        })
        .addCase(createTransaction.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.transactions.push(action.payload);
        })
        .addCase(createTransaction.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.error = action.error.message;
        })
        .addCase(changeTransaction.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
        })
        .addCase(changeTransaction.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            const indexToUpdate = state.transactions.findIndex(transaction => transaction.id === action.payload.id)
            state.transactions[indexToUpdate] = action.payload;
        })
        .addCase(changeTransaction.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.error = action.error.message;
        })
        .addCase(removeTransaction.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
        })
        .addCase(removeTransaction.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.transactions = state.transactions.filter(transaction => transaction.id !== action.payload)
        })
        .addCase(removeTransaction.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.error = action.error.message;
        })
        
    }
})

export default transactionSlice.reducer;