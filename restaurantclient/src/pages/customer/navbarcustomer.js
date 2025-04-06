import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon as MuiListItemIcon,
  useMediaQuery
} from "@mui/material";
import {
  Person,
  ShoppingCart,
  Restaurant,
  Home,
  Info,
  Receipt,
  CalendarMonth,
  Logout,
  Settings,
  AccountCircle,
  Menu as MenuIcon
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import "../../styles/cnavbar.css";

function Navbar({ cartItemCount = 0 }) {
  const [profilePic, setProfilePic] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const open = Boolean(anchorEl);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const navLinks = [
    { path: "/customer/home", label: "Home", icon: <Home /> },
    { path: "/customer/Mcategories", label: "Menu", icon: <Restaurant /> },
    { path: "/customer/cart", label: "Cart", icon: <ShoppingCart /> },
    { path: "/customer/about", label: "About", icon: <Info /> },
    { path: "/customer/myorders", label: "Orders", icon: <Receipt /> },
    { path: "/customer/reservation", label: "Reservation", icon: <CalendarMonth /> },
  ];

  useEffect(() => {
    fetchUserProfile();
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fetchUserProfile = async () => {
    const userEmail = localStorage.getItem("email");
    if (!userEmail) return;
    try {
      const response = await fetch("https://restaurant-management-backend-1.onrender.com/api/user/getdetails", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: userEmail }),
      });
      const data = await response.json();
      setProfilePic(response.ok && data.profilePic ? data.profilePic : "");
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const handleLogout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("token");
    window.location.href = "/Restaurant-management-system/#/signin";
  };

  const drawer = (
    <Box sx={{ width: 250 }} onClick={handleDrawerToggle}>
      <List>
        {navLinks.map((link) => (
          <ListItem button key={link.path} component={Link} to={link.path}>
            <MuiListItemIcon>{link.icon}</MuiListItemIcon>
            <ListItemText primary={link.label} />
          </ListItem>
        ))}
        <Divider />
        <ListItem button onClick={() => window.location.href = "/Restaurant-management-system/#/customer/profile"}>
          <MuiListItemIcon><Person /></MuiListItemIcon>
          <ListItemText primary="Profile" />
        </ListItem>
        <ListItem button onClick={() => window.location.href = "/Restaurant-management-system/#/customer/settings"}>
          <MuiListItemIcon><Settings /></MuiListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>
        <ListItem button onClick={handleLogout}>
          <MuiListItemIcon><Logout /></MuiListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        position="fixed"
        className={`navbar ${scrolled ? "scrolled" : ""}`}
        sx={{
          background: "transparent",
          backdropFilter: "blur(10px)",
          transition: "all 0.3s ease",
        }}
      >
        <Toolbar className="toolbar">
          <Typography
            variant="h4"
            className="logo"
            sx={{
              background: "linear-gradient(45deg, #FF8E53 30%, #FE6B8B 90%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontWeight: "bold",
              letterSpacing: "1px",
            }}
          >
            Royal Feast
          </Typography>

          {isMobile ? (
           <IconButton onClick={handleDrawerToggle}>
           <MenuIcon sx={{ color: "black" }} />
         </IconButton>
         
          ) : (
            <Box className="nav-links">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`nav-link ${location.pathname === link.path ? "active" : ""}`}
                >
                  <span className="nav-icon">{link.icon}</span>
                  <span className="nav-label">{link.label}</span>
                  {link.path === "/customer/cart" && cartItemCount > 0 && (
                    <span className="cart-badge">{cartItemCount}</span>
                  )}
                </Link>
              ))}
            </Box>
          )}

          {!isMobile && (
            <Box className="profile-section">
              <IconButton onClick={handleMenuOpen} size="small">
                {profilePic ? (
                  <Avatar src={profilePic} sx={{ width: 40, height: 40, border: "2px solid #FF8E53" }} />
                ) : (
                  <AccountCircle sx={{ fontSize: 40, color: "#FF8E53" }} />
                )}
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleMenuClose}
                onClick={handleMenuClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    mt: 1.5,
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    "&:before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <MenuItem onClick={() => window.location.href = "/Restaurant-management-system/#/customer/profile"}>
                  <Avatar src={profilePic} /> Profile
                </MenuItem>
                <MenuItem onClick={() => window.location.href = "/Restaurant-management-system/#/customer/settings"}>
                  <ListItemIcon>
                    <Settings fontSize="small" />
                  </ListItemIcon>
                  Settings
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleLogout}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
}

export default Navbar;
