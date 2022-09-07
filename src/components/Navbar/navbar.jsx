import { AppBar, Box, Toolbar, Container } from "@mui/material";
import thinkCloudlyLogo from "../../static/images/logo.jpg";
import "./navBar.css";
import { Link } from "react-router-dom";

const navItems = ["Home", "Blogs", "Courses", "Quiz", "Contact Us"];
const navLinks = {
  home: "https://thinkcloudly.com/",
  blogs: "https://thinkcloudly.com/blogs/",
  courses: "https://thinkcloudly.com/explore-courses/",
  quiz: "https://thinkcloudly.com/quiz/",
  contactUs: "https://thinkcloudly.com/contact-us/",
  bookDemo: "https://thinkcloudly.com/book-a-demo/",
};

const ResponsiveAppBar = () => {

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

  const moveToThinkCloudlyPage = () => {
    const aElem = document.createElement('a');
    aElem.href = 'https://thinkcloudly.com/';
    aElem.click();
  }

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
          <div className="btn-container">
            <Box>
              {navItems.map((item) => (
                <a key={item} className="btn items" href={getLink(item)}>
                  {item}
                </a>
              ))}
              <Link to='/' style={{ marginRight: '20px' }} className="btn items">Labs</Link>
            </Box>
            <a className="demo items" href={getLink('bookDemo')}>Book a Demo</a>
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
