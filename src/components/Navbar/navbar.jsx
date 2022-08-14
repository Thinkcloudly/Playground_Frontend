import {
  AppBar,
  MenuItem,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Tooltip,
} from "@mui/material";
import thinkCloudlyLogo from "../../static/images/logo.jpg";
import "./navBar.css";
import { deepPurple } from "@mui/material/colors";
import AwsAmplifyCongnitoAuth from "../../utils/AwsAmplifyCognitoAuth";
import { useEffect, useState, useRef } from "react";

const settings = ["Dashboard", "Logout"];

const ResponsiveAppBar = () => {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    getUserName();
  }, []);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const getUserName = async () => {
    const amplifyAuth = new AwsAmplifyCongnitoAuth();
    const user = await amplifyAuth.getUserNameFromAmplify();
    setUserName(user);
  };

  return (
    <AppBar position="static" id="nav">
      <Container maxWidth="xl">
        <Toolbar disableGutters className="navBar-content">
          <img
            src={thinkCloudlyLogo}
            height="55px"
            //   width='80px'
            alt="ThinkCloudly Logo"
          />

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  sx={{ bgcolor: deepPurple[500] }}
                  alt="User-Name Avatar"
                >
                  {" "}
                  {userName?.slice(0, 1)?.toUpperCase()}{" "}
                </Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
