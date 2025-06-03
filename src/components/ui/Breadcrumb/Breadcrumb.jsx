import { IoArrowBackOutline } from "react-icons/io5";
import { Link, useLocation } from "react-router";

const Breadcrumb = ({ title = "", backlink = "" }) => {
  const { pathname } = useLocation();

  const paths = pathname.split("/").filter((path) => path !== "");
  const transformedPaths = paths.map((path, index) => {
    return paths.slice(0, index + 1).join("/");
  });
  return (
    <div>
      <div className="breadcrumb">
        <ul className="breadcrumb-list">
          {transformedPaths.map((path, index) => {
            return (
              <li key={index} className="breadcrumb-item">
                <Link aria-label="breadcrumb" to={`/${path}`} className="text-prime">
                  {paths[index]}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="breadcrumb-backlink">
        <div className="dashboard-title  mb-[20px]">{title}</div>
        {backlink && (
          <Link aria-label="back-btn" className="breadcrumb-btn" to={backlink}>
            <IoArrowBackOutline /> <span>Back</span>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Breadcrumb;
