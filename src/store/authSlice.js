import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Login as ApiLogin } from "../utils/Api";
import { getIdToken, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../service/firebase";

const initialState = {
  status: false,
  userData: null,
  loading: false,
  error: null,
};

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      const { email, password, fname } = userData;
     

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log(user, 'user');
      
      const adminToken = await getIdToken(user);

      // console.log("User Credential:", userCredential);

      const signupData = {
        email,
        fname,
      };

      const response = await ApiLogin({ email, password });
      // console.log("API Login Response:", response);

      return {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        adminToken,
        ...response,
      };
    } catch (error) {
      console.error(
        "Firebase Authentication Error:",
        error.code,
        error.message
      );
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.status = true;
      state.userData = action.payload.userData; // Set userData from action payload
    },
    logout: (state) => {
      state.status = false;
      state.userData = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = true;
        state.userData = action.payload;
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
