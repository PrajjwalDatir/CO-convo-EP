import { makeStyles, Paper } from "@material-ui/core";
import BackButton from "@material-ui/icons/ArrowBack";
import { useHistory } from "react-router-dom";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "90vw",
    height: "80vh",
    margin: "auto",
    marginTop: "5vh",
    padding: theme.spacing(4, 6),
    borderRadius: "0.5em",
    overflow: "auto",
  },
  paper: {
    padding: theme.spacing(2),
    marginTop: "5vh",
  },
}));

const HelpPage = () => {
  const history = useHistory();
  const classes = useStyles();
  const onBackClick = () => {
    history.push("/chat");
  };
  return (
    <React.Fragment>
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
        <strong className={classes.title}>Help</strong>
      </Paper>
      <Paper elevation={5} className={classes.root}>
        <h1>User Guide</h1>
        <br />
        <h2>CO-convo-EP is a chat app for colleges</h2>
        <br />
        <h3>How do I register?</h3>
        <br />
        <ul>
          <li>We use your college mail id for your registration</li>
          <li>On home page click on sign up button</li>
          <li>You will be redirected to sign up page</li>
          <li>Fill out all the details in the form and click on sign up</li>
          <li>
            If you entered all the details correctly then you will be taken to a
            page notifying about successful registration from there you can
            proceed to login
          </li>
        </ul>
        <br />
        <h3>How do I Log In?</h3>
        <br />
        <ul>
          <li>Go to the login page</li>
          <li>Enter your username and password and click on login button</li>
          <li>
            If you entered credentials correctly then you will be redirected to
            home page
          </li>
          <li>
            For incorrect credentials you will be asked to enter the correct
            credentials
          </li>
        </ul>
        <br />
        <h3>How do I Chat with others?</h3>
        <br />
        <ul>
          <li>
            After logging into the app you will be presented with a list of
            groups that you are part of and your contacts
          </li>
          <li>Click on any one of the group</li>
          <li>
            The chat window will open for that group where you could see
            previous messages if any
          </li>
          <li>
            At the bottom of the chat window you will find a text box type the
            message you want to send in the text box and hit enter to send your
            message
          </li>
        </ul>
        <br />
        <h3>What is tree view and how can i use it?</h3>
        <br />
        <ul>
          <li>On the home you will find a floating action button</li>
          <li>
            If you click on that you will see a folder tree like structure of
            groups
          </li>
          <li>Tree view is a feature which will increase your productivity</li>
          <li>It contains nested list of official groups</li>
          <li>
            You can quickly navigate to any official group by using the tree
            view
          </li>
        </ul>
        <br />
        <h3>Some other features</h3>
        <br />
        <ul>
          <li>
            You can use the drawer by clicking on the menu icon on the top right
            side of the screen
          </li>
          <li>You will get many different options there</li>
          <li>Go to profile page to manage your account and chats</li>
          <li>
            You can log out of the app by clicking on log out button at the
            bottom of profile page
          </li>
        </ul>
      </Paper>
    </React.Fragment>
  );
};

export default HelpPage;
