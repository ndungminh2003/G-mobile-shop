import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import accountService from "./accountService";

export const getCustomers = createAsyncThunk(
  "account/get-customers",
  async (thunkAPI) => {
    try {
      return await accountService.getCustomers();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getSalesperson = createAsyncThunk(
  "account/get-salesperson",
  async (thunkAPI) => {
    try {
      return await accountService.getSalesperson();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getAUser = createAsyncThunk(
  "account/get-user",
  async (id, thunkAPI) => {
    try {
      return await accountService.getAUser(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createAUser = createAsyncThunk(
  "account/create-user",
  async (user, thunkAPI) => {
    try {
      return await accountService.createAUser(user);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createUserInAdmin = createAsyncThunk(
  "account/admin-create-user",
  async (user, thunkAPI) => {
    try {
      return await accountService.createUserInAdmin(user);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateAUser = createAsyncThunk(
  "account/update-user",
  async (user, thunkAPI) => {
    try {
      console.log("user update data", user);
      return await accountService.updateAUser(user);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteAUser = createAsyncThunk(
  "account/delete-user",
  async (id, thunkAPI) => {
    try {
      return await accountService.deleteUser(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  customers: [],
  salesperson: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const resetState = createAction("Reset_all");

export const accountSlice = createSlice({
  name: "accounts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCustomers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCustomers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.customers = action.payload;
      })
      .addCase(getCustomers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getSalesperson.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSalesperson.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.salesperson = action.payload;
      })
      .addCase(getSalesperson.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getAUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.userDetail = action.payload;
      })
      .addCase(getAUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createAUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createAUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdUser = action.payload;
      })
      .addCase(createAUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createUserInAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createUserInAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdUser = action.payload;
      })
      .addCase(createUserInAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateAUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedUser = action.payload;
      })
      .addCase(deleteAUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(deleteAUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});
export default accountSlice.reducer;
