import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import TodosServices from "services/api/todosService";
import { get } from "lodash";

const initialState = {
  todoData: null,
  todosList: {
    data: [],
    currentPage: 1,
    totalPages: 1,
  },
  loading: false,
  error: null,

  filter: {
    page: 1,
    limit: 10,
  },
};

export const fetchTodos = createAsyncThunk(
  "todos/fetchTodos",
  async (params, thunkAPI) => {
    try {
      const request = await TodosServices.TodosList(params);
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
export const fetchTodosDetail = createAsyncThunk(
  "todos/fetchTodosDetail",
  async (id, thunkAPI) => {
    try {
      const request = await TodosServices.TodosDetail(id);
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
export const createTodos = createAsyncThunk(
  "todos/createClient",
  async (params, thunkAPI) => {
    try {
      const request = await TodosServices.TodosCreate(params);
      if (get(request, "status") != 201) {
        return thunkAPI.rejectWithValue(get(request, "message", ""));
      }
      const respond = await request.data;
      return respond;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);
export const updateTodos = createAsyncThunk(
  "todos/updateClient",
  async ({ params, id }, thunkAPI) => {
    try {
      const request = await TodosServices.TodosUpdate(params, id);
      if (get(request, "status") != 204) {
        return thunkAPI.rejectWithValue(get(request, "message", ""));
      }
      const respond = await request.data;
      return respond;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);
export const deleteTodos = createAsyncThunk(
  "todos/deleteTodos",
  async ({ params, id }, thunkAPI) => {
    try {
      const request = await TodosServices.TodosDelete(params, id);
      if (get(request, "status") != 204) {
        return thunkAPI.rejectWithValue(get(request, "message", ""));
      }

      const respond = await request.data;
      return respond;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);
const todosSlice = createSlice({
  name: "todos",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.loading = false;
      state.todosList = {
        data: get(action, "payload", []),
      };
    });
    builder.addCase(fetchTodos.rejected, (state, action) => {
      state.loading = false;
      state.error = get(action, "error.message", "");
    });
    builder.addCase(fetchTodosDetail.pending, (state) => {
      state.loading = true;
      state.todoData = null;
    });
    builder.addCase(fetchTodosDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.todoData = get(action, "payload", "");
    });
    builder.addCase(fetchTodosDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = get(action, "error.message", "");
    });
    builder.addCase(createTodos.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createTodos.fulfilled, (state, action) => {
      state.loading = false;
      state.todosList = {
        ...state.todosList,
        data: [...state.todosList.data, action.payload],
      };
    });
    builder.addCase(createTodos.rejected, (state, action) => {
      state.loading = false;
      state.error = get(action, "error.message", "");
    });
    builder.addCase(updateTodos.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateTodos.fulfilled, (state, action) => {
      const { id, params } = action.meta.arg;

      state.loading = false;
      if (params) {
        state.todosList = {
          ...state.todosList,
          data: state.todosList.data.map((todo) =>
            todo.id === id ? params : todo
          ),
        };
      }
    });
    builder.addCase(updateTodos.rejected, (state, action) => {
      state.loading = false;
      state.error = get(action, "error.message", "");
    });
    builder.addCase(deleteTodos.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteTodos.fulfilled, (state, action) => {
      const { id } = action.meta.arg;
      state.loading = false;
      state.todosList = {
        ...state.todosList,
        data: state.todosList.data.filter((todo) => todo.id != id),
      };
    });
    builder.addCase(deleteTodos.rejected, (state, action) => {
      state.loading = false;
      state.error = get(action, "error.message", "");
    });
  },
});

export default todosSlice.reducer;
