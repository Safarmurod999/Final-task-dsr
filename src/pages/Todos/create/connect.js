import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { useNavigate } from "react-router";
import { createTodos } from "store/slices/todosSlice";
import { toast } from "sonner";
import { selectAuthData } from "../../../store/selectors/auth";
const useConnect = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { role } = useSelector(selectAuthData);
  
  const onSubmit = (values) => {
    dispatch(createTodos(values)).then((res) => {
      if (res.error) {
        toast.error("Invalid credentials", {
          position: "bottom-right",
          duration: 2000,
        });
      } else {
        toast.success("Todo created", {
          position: "bottom-right",
          duration: 2000,
        });
        navigate("/todos");
      }
    });
  };

  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: {
      title: "",
      description: "",
      createdBy: role,
    },
    onSubmit: onSubmit,
    enableReinitialize: true,
  });

  return {
    values,
    handleChange,
    handleSubmit,
  };
};

export default useConnect;
