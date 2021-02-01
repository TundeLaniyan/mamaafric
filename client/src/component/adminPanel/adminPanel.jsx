import React from "react";
import { logOut } from "../../services/adminService";
import { Link } from "react-router-dom";
import "./adminPanel.scss";

const AdminPanel = () => {
  const handleLogout = async () => {
    const response = await logOut();
    if (response) window.location = "/";
  };
  return (
    <div className="admin-panel">
      <div className="admin-panel__text">Admin panel</div>
      <Link to="/admin-panel/items" className="btn">
        seeItem
      </Link>
      <Link to="/admin-panel/item/0" className="btn">
        addItem
      </Link>
      <div className="btn btn--logout" onClick={handleLogout}>
        Logout
      </div>
    </div>
  );
};

export default AdminPanel;
