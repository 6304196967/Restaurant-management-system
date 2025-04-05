import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Box, 
  IconButton, 
  Avatar,
  Badge,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon
} from "@mui/material";
import { 
  Person, 
  Restaurant, 

  Home, 
  Info, 
  Receipt,
  CalendarMonth,
  Logout,
  Settings,
  AccountCircle
} from "@mui/icons-material";
import "../../styles/navbar.css";

function Navbar({ cartItemCount = 0 }) {
  const [profilePic, setProfilePic] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const open = Boolean(anchorEl);

  // Fetch user profile on component mount
  useEffect(() => {
    fetchUserProfile();
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
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

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("token");
    window.location.href = "/Restaurant-management-system/#/signin";
  };

  const navLinks = [
    { path: "/admin/home", label: "Home", icon: <Home /> },
    { path: "/admin/Mcategories", label: "Menu", icon: <Restaurant /> },
    { path: "/admin/orders", label: "Orders", icon: <Receipt /> },
    {path:"/admin/feedbacks", label: "Feedbacks", icon: <Info />},
    { path: "/admin/reservation", label: "Reservation", icon: <CalendarMonth /> },
  ];

  return (
    <AppBar 
      position="fixed" 
      className={`navbar ${scrolled ? 'scrolled' : ''}`}
      sx={{ 
        background: 'transparent',
        backdropFilter: 'blur(10px)',
        transition: 'all 0.3s ease',
      }}
    >
      <Toolbar className="toolbar">
        <Typography 
          variant="h4" 
          className="logo"
          sx={{
            background: 'linear-gradient(45deg, #FF8E53 30%, #FE6B8B 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 'bold',
            letterSpacing: '1px',
          }}
        >
          Royal Feast
        </Typography>
        
        <Box className="nav-links">
          {navLinks.map((link) => (
            <Link 
              key={link.path}
              to={link.path}
              className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
            >
              <span className="nav-icon">{link.icon}</span>
              <span className="nav-label">{link.label}</span>
              {link.path === "/admin/cart" && cartItemCount > 0 && (
                <span className="cart-badge">{cartItemCount}</span>
              )}
            </Link>
          ))}
        </Box>

        <Box className="profile-section">
          <IconButton 
            onClick={handleMenuOpen}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            {profilePic ? (
              <Avatar 
                src={profilePic} 
                sx={{ 
                  width: 40, 
                  height: 40,
                  border: '2px solid #FF8E53',
                  transition: 'transform 0.3s',
                  '&:hover': {
                    transform: 'scale(1.1)'
                  }
                }}
              />
            ) : (
              <AccountCircle sx={{ 
                fontSize: 40,
                color: '#FF8E53',
                transition: 'transform 0.3s',
                '&:hover': {
                  transform: 'scale(1.1)'
                }
              }} />
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
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                '& .MuiAvatar-root': {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                '&:before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem onClick={() => window.location.href = "/Restaurant-management-system/#/admin/profile"}>
              <Avatar src={profilePic} /> Profile
            </MenuItem>
            <MenuItem onClick={() => window.location.href = "/Restaurant-management-system/#/admin/settings"}>
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
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;