import axios from "axios";
import { get } from "lodash";
import { BASE_URL } from "../data/const";
import { toast } from "sonner";

const request = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  params: {},
});
let store;

export const injectStore = (_store) => {
  store = _store;
};

request.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {    
    const status = get(error, "response.status");
    const errorMsg = get(error, "response.statusText", "");

    switch (status) {
      case 409:
        toast.error(errorMsg);
        return;
      case 401:
        toast.warning(errorMsg);
        window.location.href = "/login";
        return;
      case 400:
        toast.error(errorMsg);
        return;
      case 500:
        toast.error("Server error!");
        return;
      default:
        return error;
    }
  }
);

export default request;
