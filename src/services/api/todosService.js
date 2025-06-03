import request from "../index";

class TodosServices {
  static TodosList = (params) => {
    return request.get("/todos");
  };
  static TodosDetail = (id) => {
    return request.get(`/todos/${id}`);
  };
  static TodosCreate = (params) => {
    return request.post("/todos", params);
  };
  static TodosUpdate = (params, id) => {
    return request.put(`/todos/${id}`, params);
  };
  static TodosDelete = (params, id) => {
    return request.delete(`/todos/${id}`, params);
  };
}
export default TodosServices;
