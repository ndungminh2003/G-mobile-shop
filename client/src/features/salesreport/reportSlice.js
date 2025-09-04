import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import reportService from "./reportService";

export const getReports = createAsyncThunk(
  "report/get-reports",
  async (thunkAPI) => {
    try {
      return await reportService.getReports();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteAReport = createAsyncThunk(
  "report/delete-report",
  async (id, thunkAPI) => {
    try {
      return await reportService.deleteReport(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getAReport = createAsyncThunk(
  "report/get-report",
  async (id, thunkAPI) => {
    try {
      return await reportService.getReport(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createAReport = createAsyncThunk(
  "report/create-report",
  async (report, thunkAPI) => {
    try {
      return await reportService.createReport(report);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateAReport = createAsyncThunk(
  "report/update-report",
  async (report, thunkAPI) => {
    try {
      return await reportService.updateReport(report);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");

const initialState = {
  reports: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};
export const reportSlice = createSlice({
  name: "reports",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getReports.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getReports.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.reports = action.payload;
      })
      .addCase(getReports.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getAReport.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAReport.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.reportDetails = action.payload;
      })
      .addCase(getAReport.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createAReport.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createAReport.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdReport = action.payload;
      })
      .addCase(createAReport.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteAReport.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAReport.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(deleteAReport.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateAReport.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAReport.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedReport = action.payload;
      })
      .addCase(updateAReport.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});
export default reportSlice.reducer;
