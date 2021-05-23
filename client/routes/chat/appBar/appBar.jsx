import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
// import SearchIcon from "@material-ui/icons/Search";
import MenuIcon from "@material-ui/icons/Menu";
import { TabView } from "./tabs";
// import Logo from "../../assets/icons/Logo.svg";
import { IconButton } from "@material-ui/core";
import SideDrawer from "./drawer";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  toolbar: {
    display: "flex",
    [theme.breakpoints.down("xs")]: {
      alignSelf: "center",
    },
  },

  button: {
    display: "none",

    [theme.breakpoints.up("sm")]: {
      display: "block",
      marginRight: theme.spacing(2),
    },
  },

  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },

  title: {
    flexGrow: 1,
  },
}));

export default function AppBarView({ groupType, setGroupType }) {
  const classes = useStyles();

  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };
  const onSearchClick = () => {
    console.log("search button clicked");
  };

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          {/* <img src={Logo} alt="" height={70} /> */}
          <Typography variant="h5" className={classes.title}>
            CO-convo-EP
          </Typography>
          {/* <IconButton
            edge="start"
            className={classes.button}
            color="inherit"
            aria-label="Search Page"
            onClick={onSearchClick}
          >
            <SearchIcon />
          </IconButton> */}
          <IconButton
            edge="start"
            className={classes.button}
            color="inherit"
            aria-label="Settings Page"
            onClick={toggleDrawer}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
        <div>
          <TabView groupType={groupType} setGroupType={setGroupType} />
        </div>
      </AppBar>
      <SideDrawer drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />
    </div>
  );
}
