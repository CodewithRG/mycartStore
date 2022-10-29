import React, { Fragment, useState } from "react";
import "./userOptions.css";
import { SpeedDial, SpeedDialAction } from "@material-ui/lab";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import ExitToOpenIcon from "@material-ui/icons/ExitToApp";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import ListAltIcon from "@material-ui/icons/ListAlt";
import HomeIcon from "@material-ui/icons/Home";
import Backdrop from "@material-ui/core/Backdrop";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { logout } from "../../../actions/userAction";
import { useDispatch } from "react-redux";

const UserOptions = ({ user }) => {
  const [open, setOpen] = useState(false);
  const alert = useAlert();
  const dispatch = useDispatch();

  const options = [
    { icon: <HomeIcon />, name: "Home", func: Home },
    { icon: <ListAltIcon />, name: "Orders", func: orders },
    { icon: <PersonIcon />, name: "profile", func: account },
    { icon: <ShoppingCartIcon />, name: "Cart", func: shopping },
    { icon: <ExitToOpenIcon />, name: "Logout", func: logoutUser },
  ];

  if (user.role === "admin") {
    options.unshift({
      icon: <DashboardIcon />,
      name: "Dashboard",
      func: Dashboard,
    });
  }

  const Navigate = useNavigate();

  function Home() {
    Navigate("/");
  }
  function Dashboard() {
    Navigate("/admin/dashboard");
  }
  function orders() {
    Navigate("/orders/me");
  }

  function account() {
    Navigate("/account");
  }

  function shopping() {
    Navigate("/cart");
  }

  function logoutUser() {
    dispatch(logout());
    alert.success("logout successfull");
    Navigate("/user");
  }
  return (
    <Fragment>
      {open && <Backdrop open={true} style={{ zIndex: "10" }} />}
      {/* <Backdrop open={true}  style={{zIndex:'10'}} /> */}
      <SpeedDial
        direction="down"
        ariaLabel="SpeedDial tooltip example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        className="SpeedDial"
        style={{ zIndex: "11" }}
        icon={
          <img
            src={user.avtar.url ? user.avtar.url : "/logo192.png"}
            alt="profile"
            className="profile"
          />
        }
      >
        {options.map((item) => (
          <SpeedDialAction
            key={item.name}
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
            tooltipOpen={window.innerWidth<=600 ? true : false}
          />
        ))}
      </SpeedDial>
    </Fragment>
  );
};

export default UserOptions;
