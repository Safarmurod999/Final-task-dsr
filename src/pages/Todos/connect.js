import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectTodosData } from "store/selectors/todos";
import { selectAuthData } from "store/selectors/auth";
import { deleteTodos, fetchTodos } from "store/slices/todosSlice";
import { toast } from "sonner";
import { useNavigate } from "react-router";

const useConnect = () => {
  const dispatch = useDispatch();
  const { role } = useSelector(selectAuthData);
  const todos = useSelector(selectTodosData);
  const navigate = useNavigate();
  const handleDelete = (createdBy, id) => {
    if (createdBy == "admin" && role == "user") {
      toast.error("You don't have access to delete this item", {
        position: "bottom-right",
        duration: 2000,
      });
    } else if (createdBy == role || role == "admin") {
      dispatch(deleteTodos({ params: {}, id })).then((res) => {
        if (res.error) {
          toast.error("Couldn't deleted", {
            position: "bottom-right",
            duration: 2000,
          });
        } else {
          toast.success("Successfully deleted", {
            position: "bottom-right",
            duration: 2000,
          });
        }
      });
    }
  };
  const handleNavigate = (createdBy, id) => {
    if (createdBy == "admin" && role == "user") {
      toast.error("You don't have access to update this item", {
        position: "bottom-right",
        duration: 2000,
      });
    } else if (createdBy == role || role == "admin") {
      navigate(`/todos/edit/${id}`);
    }
  };
  useEffect(() => {
    dispatch(fetchTodos({}));
  }, [dispatch]);

  return {
    todos,
    handleNavigate,
    handleDelete,
  };
};

export default useConnect;
