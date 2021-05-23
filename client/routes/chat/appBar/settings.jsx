import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import AccountIcon from "@material-ui/icons/AccountBox";
import ChatIcon from "@material-ui/icons/ChatBubble";
import ViewIcon from "@material-ui/icons/ViewAgenda";
import HelpIcon from "@material-ui/icons/Help";
import BackButton from "@material-ui/icons/ArrowBack";
import { Link } from "react-router-dom";
import { Button, IconButton } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { UserContext } from "#/Provider";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
  },
  title: {
    paddingLeft: 20,
  },
  listItem: {
    padding: theme.spacing(3),
  },
  nested: {
    paddingLeft: theme.spacing(12),
  },
  back: {
    color: "black",
  },
  logOut: {
    textAlign: "center",
  },
}));

export default function Settings() {
  const history = useHistory();
  const classes = useStyles();
  const [accountSettingsOpen, setAccountSettingsOpen] = useState(false);
  const [chatSettingsOpen, setChatSettingsOpen] = useState(false);
  const [viewSettingsOpen, setViewSettingsOpen] = useState(false);

  const [user, setUser] = React.useContext(UserContext);

  const handleAccountSettingsClick = () => {
    setAccountSettingsOpen(!accountSettingsOpen);
  };
  const handleChatSettingsClick = () => {
    setChatSettingsOpen(!chatSettingsOpen);
  };

  const handleViewSettingsClick = () => {
    setViewSettingsOpen(!viewSettingsOpen);
  };

  const onBackClick = () => {
    history.push("/chat");
  };

  // remove user from localStorage and go to homepage
  const onSignOut = React.useCallback(() => {
    setUser(null);
    history.push("/");
  }, [setUser, history]);

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper className={classes.paper} elevation={5}>
            <IconButton
              edge="start"
              className={classes.button}
              color="inherit"
              aria-label="Back to Home Page"
              onClick={onBackClick}
            >
              <BackButton />
            </IconButton>
            <strong className={classes.title}>Settings</strong>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper} elevation={5}>
            <h4>Username : {user && user.username}</h4>
            <p>Email : {user && user.email}</p>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper} elevation={3}>
            <List>
              <ListItem
                button
                className={classes.listItem}
                onClick={handleAccountSettingsClick}
              >
                <ListItemIcon>
                  <AccountIcon />
                </ListItemIcon>
                <ListItemText primary="Account Settings" />
                {accountSettingsOpen ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={accountSettingsOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItem button className={classes.nested}>
                    <ListItemText primary="Edit Account" />
                  </ListItem>
                  <ListItem button className={classes.nested}>
                    <ListItemText primary="Delete Account" />
                  </ListItem>
                </List>
              </Collapse>
              <ListItem
                button
                className={classes.listItem}
                onClick={handleChatSettingsClick}
              >
                <ListItemIcon>
                  <ChatIcon />
                </ListItemIcon>
                <ListItemText primary="Chat Settings" />
                {chatSettingsOpen ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={chatSettingsOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItem button className={classes.nested}>
                    <ListItemText primary="Export Chat History" />
                  </ListItem>
                  <ListItem button className={classes.nested}>
                    <ListItemText primary="Delete Chat History" />
                  </ListItem>
                </List>
              </Collapse>
              <ListItem
                button
                className={classes.listItem}
                onClick={() => {
                  history.push("/legal");
                }}
              >
                <ListItemIcon>
                  <HelpIcon />
                </ListItemIcon>
                <ListItemText primary="Terms and Conditions" />
              </ListItem>
            </List>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={`${classes.paper} ${classes.logOut}`} elevation={5}>
            <Button
              onClick={onSignOut}
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Out
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
