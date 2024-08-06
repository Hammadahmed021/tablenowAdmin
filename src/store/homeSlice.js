import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getListDetails } from "../utils/Api";

export const fetchApiData = createAsyncThunk(
  "home/fetchApiData",
  async ({ url, params = {}, token }, { rejectWithValue }) => {
    try {
      const data = await getListDetails(url, params, token);
      return { url, data };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const homeSlice = createSlice({
  name: "home",
  initialState: {
    data: {}, // Correctly initialize data as an empty object
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchApiData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchApiData.fulfilled, (state, action) => {
        const { url, data } = action.payload;
        state.data[url] = { data }; // Ensure data is stored correctly
        state.loading = false;
      })
      .addCase(fetchApiData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default homeSlice.reducer;
