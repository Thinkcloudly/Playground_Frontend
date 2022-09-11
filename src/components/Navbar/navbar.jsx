import {
  AppBar,
  Box,
  Toolbar,
  Container,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemButton,
  Drawer,
  IconButton,
} from "@mui/material";
import thinkCloudlyLogo from "../../static/images/logo.jpg";
import "./navBar.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";

const navItems = ["Home", "Blogs", "Courses", "Quiz", "Contact Us"];
const navLinks = {
  home: "https://thinkcloudly.com/",
  blogs: "https://thinkcloudly.com/blogs/",
  courses: "https://thinkcloudly.com/explore-courses/",
  quiz: "https://thinkcloudly.com/quiz/",
  contactUs: "https://thinkcloudly.com/contact-us/",
  bookDemo: "https://thinkcloudly.com/book-a-demo/",
};

const ResponsiveAppBar = (props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const drawerWidth = `100%`;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const getLink = (itemName) => {
    const { home, blogs, courses, quiz, contactUs, bookDemo } = navLinks;

    switch (itemName) {
      case navItems[0]:
        return home;
      case navItems[1]:
        return blogs;
      case navItems[2]:
        return courses;
      case navItems[3]:
        return quiz;
      case navItems[4]:
        return contactUs;
      default:
        return bookDemo;
    }
  };

  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{ textAlign: "center", backgroundColor: "white" }}
    >
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <a
                key={item}
                className="btn items"
                style={{ textAlign: "center", color: "#333333" }}
                href={getLink(item)}
              >
                {item}
              </a>
            </ListItemButton>
            <Divider />
          </ListItem>
        ))}
        <ListItem key={"lab"} disablePadding>
          <ListItemButton>
            <Link to="/" className="btn items">
              Labs
            </Link>
          </ListItemButton>
        </ListItem>
        <ListItem key={"lab"} disablePadding>
          <ListItemButton>
            <a className="drawerDemo items" href={getLink("bookDemo")}>
              Book a Demo
            </a>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  const moveToThinkCloudlyPage = () => {
    const aElem = document.createElement("a");
    aElem.href = "https://thinkcloudly.com/";
    aElem.click();
  };

  return (
    <AppBar position="static" id="nav">
      <Container maxWidth="xl">
        <Toolbar disableGutters className="navBar-content">
          <img
            onClick={moveToThinkCloudlyPage}
            src={thinkCloudlyLogo}
            height="55px"
            style={{ cursor: "pointer" }}
            //   width='80px'
            alt="ThinkCloudly Logo"
          />
          <Box className="btn-container" id="nav-options">
            <Box>
              {navItems.map((item) => (
                <a key={item} className="btn items" href={getLink(item)}>
                  {item}
                </a>
              ))}
              <Link
                to="/"
                style={{ marginRight: "20px" }}
                className="btn items"
              >
                Labs
              </Link>
            </Box>
            <a className="demo items" href={getLink("bookDemo")}>
              Book a Demo
            </a>
          </Box>
          <Box component="nav">
            <Drawer
              anchor="top"
              container={container}
              // variant="persistent"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
              sx={{
                "& .MuiDrawer-paper": {
                  boxSizing: "border-box",
                  width: drawerWidth,
                },
              }}
            >
              {drawer}
            </Drawer>
          </Box>
          <IconButton
            id="drawer"
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, color: "black" }}
          >
            <MenuIcon />
            <Typography variant="h6" sx={{ ml: 1, color: "#555555" }}>
              Menu
            </Typography>
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
