import React, { useEffect, useState } from "react";
import { message } from "antd";
import { getUserInfo } from "../apicalls/users";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/userSlice.js";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const { user } = useSelector((state) => state.users);
  const [menu, setMenu] = useState([]);
  const dispatch = useDispatch();
  const naviGate = useNavigate();
  const userMenu = [
    {
      title: "Home",
      paths: ["/"],
      onClick: () => naviGate("/"),
    },
    {
      title: "Reports",
      paths: ["/user/reports"],
      onClick: () => naviGate("/user/reports"),
    },
    {
      title: "Profile",
      paths: ["/profile"],
      onClick: () => naviGate("/profile"),
    },
    {
      title: "Logout",
      paths: ["/logout"],
      onClick: () => {
        localStorage.removeItem("token");
        naviGate("/login");
      },
    },
  ];

  const adminMenu = [
    {
      title: "Home",
      paths: ["/", "/user/write-exam"],
      onClick: () => naviGate("/"),
    },
    {
      title: "Exams",
      paths: ["/admin/exams", "/admin/exams/add"],
      onClick: () => naviGate("/admin/exams"),
    },
    {
      title: "Reports",
      paths: ["/admin/reports"],
      onClick: () => naviGate("/admin/reports"),
    },
    {
      title: "Profile",
      paths: ["/profile"],
      onClick: () => naviGate("/profile"),
    },
    {
      title: "Logout",
      paths: ["/logout"],
      onClick: () => {
        localStorage.removeItem("token");
        naviGate("/login");
      },
    },
  ];

  const getUserData = async () => {
    try {
      const response = await getUserInfo();
      if (response.success) {
        message.success(response.message);
        dispatch(setUser(response.data));
        if (response.data.isAdmin) {
          setMenu(adminMenu);
        } else {
          setMenu(userMenu);
        }
      } else {
        message.error(response.message);
      }
    } catch (error) {
      naviGate("/login");
      message.error(error.message);
    }
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getUserData();
    } else {
      naviGate("/login");
    }
  }, []);
  const activeRoute = window.location.pathname;
  return (
    <div className="layout">
      <div className="flex gap-2 w-full h-full h-100">
        <div className="sidebar" id="sidebar">
          {menu.map((item, index) => {
            return (
              <div
                className={`menu-item ${
                  activeRoute === item.paths[0] && "active-menu-item"
                }`}
                key={index}
                onClick={item.onClick}
                id="menudiv"
              >
                <span className="text-white">{item.title}</span>
              </div>
            );
          })}
        </div>
        <div className="body" style={{ width: "100%" }}>
          <div className="header flex-justify-between" id="header">
            <h1 className="text-2xl item-center" id="heading">
              Barasat Academic Association
            </h1>
            <marquee behavior="" direction="" style={{ color: "red" }}>
              Online Admission Going on
            </marquee>
            <div className="header-content">
              <div className="card1">
                <h2>Contact us for your Next Step</h2>
                <p>Phone : +91-9073587432 /+91-9073345862 /+91-9073099301</p>
                <p>
                <a href="https://wa.me/+917439120030" target="_blank">
        <i
          class="ri-whatsapp-line"
          style={{
            width: "5%",
            height: "auto",
            display: "block",
            padding: "1rem",
            margin: "1rem",
            position: "fixed",
            top: "1rem",
            right: "0.5rem",
            textAlign: "right",
            zIndex: 1,
            color:"green",
            fontSize:"1rem"
          }}
        ></i>
      </a>
                  <span id="span1">
                    (swith DESKTOP MODE for better experience)
                  </span>
                </p>
              </div>
              <div class="user-info flex gap-1 items-center">
                <h1 class="text-xl text-white" id="username">
                  username: {user?.name}
                </h1>
                <span id="role">Role: {user?.isAdmin ? "Admin" : "User"}</span>
              </div>
            </div>
          </div>
          <div className="content">{children}</div>
        </div>
      </div>
     
    </div>
  );
}

export default ProtectedRoute;
