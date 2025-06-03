import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { updateTodos, fetchTodosDetail } from "store/slices/todosSlice";
import { selectTodosData } from "store/selectors/todos";
import { toast } from "sonner";

const useConnect = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { todoData } = useSelector(selectTodosData);
  const navigate = useNavigate();
  const onSubmit = (values) => {
    dispatch(updateTodos({ params: values, id })).then((res) => {
      if (res.error) {
        toast.error("Invalid credentials", {
          position: "bottom-right",
          duration: 2000,
        });
      } else {
        toast.success("Todo edited", {
          position: "bottom-right",
          duration: 2000,
        });
        // navigate("/todos");
      }
    });
  };
  useEffect(() => {
    dispatch(fetchTodosDetail(id));
  }, [dispatch, id]);
  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: todoData,
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
