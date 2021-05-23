import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import HomeIcon from "@material-ui/icons/Home";
import ProfileIcon from "@material-ui/icons/Person";
import HelpIcon from "@material-ui/icons/Help";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  list: {
    width: "20em",
    marginTop: theme.spacing(14),
  },
  drawer: {
    flexShrink: 0,
  },
  avatar: {
    backgroundColor: "green",
  },
}));

const SideDrawer = ({ drawerOpen, setDrawerOpen }) => {
  const history = useHistory();
  const closeDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const classes = useStyles();

  const onHomeClick = () => {
    history.push("/");
    // window.location.reload(false);
  };
  const onProfileClick = () => {
    history.push("/settings");
    // window.location.reload(false);
  };

  const onHelpClick = () => {
    history.push("/help");
  };

  return (
    <React.Fragment>
      <Drawer
        anchor={"right"}
        open={drawerOpen}
        onClose={closeDrawer}
        className={classes.drawer}
      >
        <List className={classes.list}>
          <ListItem button onClick={onHomeClick}>
            <ListItemAvatar>
              <Avatar className={classes.avatar}>
                <HomeIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button onClick={onProfileClick}>
            <ListItemAvatar>
              <Avatar className={classes.avatar}>
                <ProfileIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Profile" />
          </ListItem>
          <ListItem button onClick={onHelpClick}>
            <ListItemAvatar>
              <Avatar className={classes.avatar}>
                <HelpIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Help" />
          </ListItem>
        </List>
      </Drawer>
    </React.Fragment>
  );
};

export default SideDrawer;
