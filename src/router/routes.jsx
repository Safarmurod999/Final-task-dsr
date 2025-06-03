import { Navigate, Route, Routes } from "react-router";
import { adminRoutes } from "./data";
import {
  NotFound,
  Login,
} from "../pages/index";
import { Layout } from "../components/Layout/index"
import ProtectedRoute from "./ProtectedRoute";

const RouterApp = () => {

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/todos" replace />} />

        <Route
          element={<ProtectedRoute />}
        >
          {adminRoutes.map((route, index) => {
            const RouteComponent = route.component;
            return (
              <Route
                key={index}
                index={route.path == "/todos" && true}
                path={route.path}
                element={
                  <Layout>
                    <RouteComponent />
                  </Layout>
                }
              />
            );
          })}
        </Route>
        <Route path={"/login"} element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

    </>
  );
};

export default RouterApp;
