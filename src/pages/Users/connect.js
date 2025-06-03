import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUsersData } from "store/selectors/users";
import { fetchUsers } from "store/slices/usersSlice";
import { useNavigate } from "react-router";

const useConnect = () => {
  const users = useSelector(selectUsersData);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUsers({}));
  }, [dispatch]);

  return {
    users,
    navigate,
  };
};

export default useConnect;
