import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";
import { selectAuthData } from "../store/selectors/auth";
import { fetchUserDetail } from "../store/slices/authSlice";
import ScrollToTop from "./ScrollToTop";
import { useEffect } from "react";
const ProtectedRoute = () => {
    const { role, name } = useSelector(selectAuthData);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchUserDetail({}))
    }, [dispatch])
    return (
        <ScrollToTop>
            {
                role && name ? <Outlet /> : <Navigate to="/login" />
            }
        </ScrollToTop>
    )
};

export default ProtectedRoute;