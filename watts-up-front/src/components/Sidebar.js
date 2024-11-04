import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../theme";
import { Button } from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import AddIcon from "@mui/icons-material/Add";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import profileImage from "../assets/images/tinyraccon.jpg";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.primary[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = ({ userRole }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    navigate("/");
  };

  const commonItems = (
    <>
      <Item
        title="Dashboard"
        to="/"
        icon={<HomeOutlinedIcon />}
        selected={selected}
        setSelected={setSelected}
      />
    </>
  );

  const adminItems = (
    <>
      <Typography
        variant="h6"
        color={colors.primary[300]}
        sx={{ m: "0 5px 20px" }}
      ></Typography>
      <Item
        title="Manage Team"
        to="/team"
        icon={<PeopleOutlinedIcon />}
        selected={selected}
        setSelected={setSelected}
      />
      <Item
        title="Invoices"
        to="/invoices"
        icon={<ReceiptOutlinedIcon />}
        selected={selected}
        setSelected={setSelected}
      />
      <Item
        title="Monitor Consumption"
        to="/monitor-consumption"
        icon={<BarChartOutlinedIcon />}
        selected={selected}
        setSelected={setSelected}
      />
      <Item
        title="Property Requests"
        to="/property-requests"
        icon={<ContactsOutlinedIcon />}
        selected={selected}
        setSelected={setSelected}
      />
      <Item
        title="Ownership Requests"
        to="/ownership-requests"
        icon={<HelpOutlineOutlinedIcon />}
        selected={selected}
        setSelected={setSelected}
      />
      <Item
        title="Define Pricing"
        to="/define-pricing"
        icon={<PieChartOutlineOutlinedIcon />}
        selected={selected}
        setSelected={setSelected}
      />
    </>
  );

  const userItems = (
    <>
      <Typography
        variant="h6"
        color={colors.primary[300]}
        sx={{ m: "0 " }}
      ></Typography>

      <Item
        title="New Property"
        to="/register-property"
        icon={<AddIcon />}
        selected={selected}
        setSelected={setSelected}
      />
      <Item
        title="Consumption"
        to="/consumption-overview"
        icon={<TimelineOutlinedIcon />}
        selected={selected}
        setSelected={setSelected}
      />
      <Item
        title="Bills"
        to="/pay-bills"
        icon={<ReceiptOutlinedIcon />}
        selected={selected}
        setSelected={setSelected}
      />
      <Item
        title="Profile"
        to="/profile"
        icon={<PersonOutlinedIcon />}
        selected={selected}
        setSelected={setSelected}
      />
    </>
  );

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[500]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item:hover": {
          color: `${colors.primary[200]} !important`,
        },
        "& .pro-menu-item.active": {
          color: `${colors.primary[300]} !important`,
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={
              isCollapsed ? (
                <MenuOutlinedIcon sx={{ color: colors.primary[100] }} />
              ) : undefined
            }
            style={{
              margin: "20px 0",
              color: colors.primary[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                ml="15px"
              >
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon sx={{ color: colors.primary[100] }} />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                mb="10px"
              >
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={profileImage}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="center" mb="10px">
                <Typography
                  variant="h2"
                  color={colors.primary[100]}
                  fontWeight="bold"
                >
                  Raccoon
                </Typography>
                <Typography variant="h5" color={colors.primary[100]}>
                  {userRole}
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            {commonItems}
            {userRole === "Admin" && adminItems}
            {userRole === "User" && userItems}

            <Item
              title="Logout"
              to="/"
              icon={<LogoutRoundedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
