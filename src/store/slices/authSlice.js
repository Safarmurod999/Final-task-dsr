import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AuthServices from "services/api/authService";
import { get } from "lodash";

const initialState = {
  name: null,
  role: null,
  userData: null,
  loading: false,
  error: null,
};

export const logIn = createAsyncThunk(
  "auth/logIn",
  async (params, thunkAPI) => {
    try {
      const request = await AuthServices.Login(params);
      if (get(request, "status") != 200) {
        return thunkAPI.rejectWithValue(get(request, "message", ""));
      }

      const respond = await request.data;
      console.log(respond);
      return respond;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);
export const fetchUserDetail = createAsyncThunk(
  "todos/fetchUserDetail",
  async (id, thunkAPI) => {
    try {
      const request = await AuthServices.UserDetails(id);
      if (get(request, "status") != 200) {
        return thunkAPI.rejectWithValue(get(request, "message", ""));
      }
      const respond = await request.data;
      return respond;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authLogout: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(logIn.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(logIn.fulfilled, (state, action) => {
      state.loading = false;
      state.role = get(action, "payload.role", "");
      state.name = get(action, "payload.name", "");
    });
    builder.addCase(logIn.rejected, (state, action) => {
      state.isAuthenticated = false;
      state.loading = false;
      state.role = "";
      state.name = "";
      state.error = get(action, "error.message", "");
    });
    builder.addCase(fetchUserDetail.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUserDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.name = get(action, "payload.name", "");
      state.role = get(action, "payload.role", "");
    });
    builder.addCase(fetchUserDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = get(action, "error.message", "");
    });
  },
});

export const { authLogout } = authSlice.actions;
export default authSlice.reducer;
