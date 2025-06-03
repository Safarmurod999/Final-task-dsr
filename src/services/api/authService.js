import request from "../index";

class AuthServices {
  static Login = (param) => {
    return request.post("/login", param);
  };
  static Register = (param) => {
    return request.post("/signup", param);
  };
  static UserDetails = () => {
    return request.get("/me");
  };
}
export default AuthServices;
