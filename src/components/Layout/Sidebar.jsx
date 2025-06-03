import { useEffect, useState } from "react";
import { IoPersonOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router";
import { IoIosStats } from "react-icons/io";
import { FaUsers } from "react-icons/fa";
import { selectAuthData } from "store/selectors/auth"
const adminRoutes = [
  {
    id: 1,
    name: "Todos",
    path: "/todos",
    icon: <IoIosStats />,
  },
  {
    id: 2,
    name: "Me",
    path: "/me",
    icon: <IoPersonOutline />,
  }
];

const Sidebar = ({ toggleSidebar, setToggleSidebar }) => {
  const { pathname } = useLocation();
  const [activeRoute, setActiveRoute] = useState(pathname || 0);
  const { role } = useSelector(selectAuthData);
  useEffect(() => {
    setActiveRoute(pathname);
  }, [pathname]);
  return (
    <aside
      className={`sidebar
      // ${toggleSidebar ? "toggle-sidebar" : ""}
      `}
    >
      <div className="relative">
        <div className="sidebar__logo">
          <Link aria-label="logo" to="/admin/todos" className="text-white">
            Todo List
          </Link>
        </div>

      </div>

      <div className="nav">
        {adminRoutes.map((item) => {
          return (
            <Link
              aria-label="sidebar-link"
              key={item.id}
              className={`nav-item ${activeRoute === item.path ? "active" : ""
                }`}
              to={item.path}
              onClick={() => setActiveRoute(item.path)}
            >
              <span className="icon">{item.icon}</span>
              <span className="nav-item-name">{item.name}</span>
            </Link>
          );
        })}
        {
          role == "admin" && <Link
            aria-label="sidebar-link"
            key={"users"}
            className={`nav-item ${activeRoute === "/users" ? "active" : ""
              }`}
            to={"/users"}
            onClick={() => setActiveRoute("/users")}
          >
            <span className="icon"><FaUsers /></span>
            <span className="nav-item-name">Users</span>
          </Link>
        }
      </div>
    </aside>
  );
};

export default Sidebar;
