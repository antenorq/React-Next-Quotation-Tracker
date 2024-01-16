import fulllogo from "../assets/img/logowhite.png";
import halflogo from "../assets/img/logo-small-white.png";

import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";

//Context
import { AuthContext } from "../context/AuthContext";

//CSS
import "./SideBar.css";

const SideBar = ({ open }) => {
  const { user, logout } = useContext(AuthContext);

  const path = useLocation().pathname;

  return (
    <div className={"sidebar " + open}>
      {/*<!-- LOGO -->*/}
      <div className="site_logo">
        <img className="full-logo" src={fulllogo} />
        <img className="half-logo" src={halflogo} />
      </div>
      {/*<!--NAV LIST-->*/}
      <ul className="nav-list">
        <li>
          <Link to={"/"} className={path === "/" ? "active" : ""}>
            <i className="bx bxs-dashboard"></i>
            <span className="link_name">Overview</span>
          </Link>
          <span className="tooltip">Overview</span>
        </li>

        <li>
          <Link to={"/list_customer"} className={path === "/list_customer" || path === "/add_customer" ? "active" : ""}>
            <i className="bx bxs-user"></i>
            <span className="link_name">Customer</span>
          </Link>
          <span className="tooltip">Customer</span>
        </li>

        <li>
          <Link to={"/list_quotation"} className={path === "/list_quotation" || path === "/add_quotation" ? "active" : ""}>
            <i className="bx bxs-message-square-add"></i>
            <span className="link_name">Quotation</span>
          </Link>
          <span className="tooltip">Quotation</span>
        </li>

        {user.type === 1 && (
          <li>
            <Link to={"/list_user"} className={path === "/list_user" ? "active" : ""}>
              <i className="bx bxs-user-detail"></i>
              <span className="link_name">Admin Users</span>
            </Link>
            <span className="tooltip">Admin Users</span>
          </li>
        )}
        <li className="logout" onClick={logout}>
          <div className="profile_details">
            <div className="profile_content">
              <div className="link_name">Logout</div>
            </div>
          </div>
          <i className="bx bx-log-out" id="log_out"></i>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
