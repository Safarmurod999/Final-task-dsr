import { useFormik } from "formik";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { logIn } from "store/slices/authSlice";

export const useConnect = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const onSubmit = (values) => {
      dispatch(logIn(values)).then((res) => {          
        if (!res.error) {
          toast.success("Login successfully");
          navigate("/todos");
        } else {
          toast.error("Wrong username or password");
        }
      });
  };

  const {
    values,
    handleChange,
    handleBlur,
    touched,
    errors,
    setFieldValue,
    setFieldTouched,
    handleSubmit,
  } = useFormik({
    initialValues: {
      login: "",
      password: "",
    },
    onSubmit,
  });  
  return {
    values,
    navigate,
    handleChange,
    handleBlur,
    touched,
    errors,
    setFieldValue,
    setFieldTouched,
    handleSubmit,
  };
};
