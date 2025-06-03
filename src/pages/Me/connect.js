import { useDispatch, useSelector } from "react-redux";
import { fetchUserDetail } from "store/slices/authSlice";
import { selectAuthData } from "store/selectors/auth";
import { useEffect } from "react";
const useConnect = () => {
  const dispatch = useDispatch();
  const { name, role } = useSelector(selectAuthData);

  useEffect(() => {
    dispatch(fetchUserDetail());
  }, [dispatch]);

  return {
    name,
    role,
  };
};

export default useConnect;
