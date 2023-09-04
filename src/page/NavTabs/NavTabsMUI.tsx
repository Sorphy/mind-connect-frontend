import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import HomeIcon from "@mui/icons-material/Home";
import GroupIcon from "@mui/icons-material/Group";
import PostIcon from "@mui/icons-material/PostAdd";
import ChatIcon from "@mui/icons-material/Chat";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Person3Icon from "@mui/icons-material/Person3";
import LogoutIcon from "@mui/icons-material/Logout";
import Avatar from "@mui/material/Avatar";
import { Link, useNavigate } from "react-router-dom";
import "./NavTabsMUI.css";
import bell from "./Bell.png";
import HomePage from "../HomePage/HomePage";
import { Post } from "../PostPage/Post";
import { ChatPage } from "../ChatPage/ChatPage";
import { useEffect } from "react";
import Group from "../Group/Group";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  profilePhoto: string;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 0 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function NavTabs() {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();
  const [user, setUser] = React.useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:4000/post/userId`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          // Assuming data.posts is the array of posts in the response
          const firstPost = data.posts[0]; // Access the first post for simplicity

          // Assuming the User object is available within the first post
          const user = firstPost.User;

          setUser(user);
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, []);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function getInitials(name: string): string {
    const names = name.split(" ");
    return names.map((name) => name.charAt(0).toUpperCase()).join("");
  }

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
    handleClose();
  };

  return (
    <Box sx={{ width: "100%" }} style={{background:"white"}}>
      <Box>
        <header >
          <div className="header-top">
            <div className="logoDiv">
              <Link to={"/"} style={{textDecoration:"none"}}>
              <h1 className="logo">
              MindConnect
              </h1>
              <hr />
              </Link>
            </div>
            <div className="search">
              <div className="search-div">
                <label>
                  <input
                    type="text"
                    placeholder="search"
                    className="form-control"
                  />
                  <img src={bell} width={15} alt="" />
                </label>
              </div>
            </div>
          </div>
        </header>
      </Box>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          paddingTop: 2,
          marginTop: "0px",
        }}
      >
        <Grid container justifyContent="space-between">
          <Grid item>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
              sx={{ marginLeft: "120px" }}
            >
              <Tab
                label={
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <HomeIcon sx={{ marginRight: "8px" }} />
                    Home
                  </Box>
                }
                {...a11yProps(0)}
                sx={{ marginRight: "50px", marginBottom: "16px" }}
              />
              <Tab
                label={
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <GroupIcon sx={{ marginRight: "8px" }} />
                    Groups
                  </Box>
                }
                {...a11yProps(1)}
                sx={{ marginRight: "50px", marginBottom: "16px" }}
              />
              <Tab
                label={
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <PostIcon sx={{ marginRight: "8px" }} />
                    Posts
                  </Box>
                }
                {...a11yProps(2)}
                sx={{ marginRight: "50px", marginBottom: "16px" }}
              />
              <Tab
                label={
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <ChatIcon sx={{ marginRight: "8px" }} />
                    Chat
                  </Box>
                }
                {...a11yProps(3)}
                sx={{ marginRight: "50px", marginBottom: "16px" }}
              />
            </Tabs>
          </Grid>
          <Grid item sx={{ marginRight: "100px", fontSize: "18px" }}>
            <div>
              <Button
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                sx={{ fontSize: "17px" }}
              >
                {user ? (
                  <>
                    <Avatar
                      src={user?.profilePhoto || ""}
                      alt={`${user?.firstName} ${user?.lastName}`}
                      sx={{ bgcolor: "#3f51b5", marginRight: "8px" }}
                    >
                      {getInitials(`${user?.firstName} ${user?.lastName}`)}
                    </Avatar>
                    {`${user.firstName} ${user.lastName}`}
                  </>
                ) : (
                  "Loading..."
                )}
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <Link to="/profile" style={{ textDecoration: "none" }}>
                  <MenuItem onClick={handleClose}>
                    <Person3Icon sx={{ marginRight: "8px" }} />
                    Profile
                  </MenuItem>
                </Link>
                <MenuItem onClick={handleLogout}>
                  <LogoutIcon sx={{ marginRight: "8px" }} />
                  Logout
                </MenuItem>
              </Menu>
            </div>
          </Grid>
        </Grid>
      </Box>
      <div>
      <TabPanel value={value} index={0}>
        <HomePage />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Group />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Post />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <ChatPage />
      </TabPanel>
      </div>
    </Box>
  );
}
