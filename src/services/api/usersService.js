import request from "../index";

class UsersServices {
  static UsersList = (params) => {
    return request.get("/users", { params });
  };
}
export default UsersServices;
