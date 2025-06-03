import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import UsersServices from "services/api/usersService";
import { get } from "lodash";

const initialState = {
  usersList: {
    data: [],
  },
  loading: false,
  error: null,
};

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (params, thunkAPI) => {
    try {
      const request = await UsersServices.UsersList(params);
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
const usersSlice = createSlice({
  name: "users",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.usersList = {
        data: get(action, "payload", []),
      };
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.loading = false;      
      state.error = get(action, "error.message", "");
    });
  },
});

export default usersSlice.reducer;
